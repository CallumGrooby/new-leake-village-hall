import React, { useRef, useState } from "react";
import { Calendar } from "../components/booking-calendar/Calendar";
import axios from "axios";
import { ArrowRightIcon } from "../assets/icons/Icons";
import { AnimatePresence, motion } from "motion/react";

const API_BASE_URL = "http://localhost:5000/api/booking";

export const Bookings = () => {
  const dateFormRef = useRef();
  const contactFormRef = useRef();

  const [isFormShowing, setIsFormShowing] = useState(false);
  const [dateError, setDateError] = useState(null);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    // Handle contact form submission logic here
    const dateFormData = new FormData(dateFormRef.current);
    const dateData = Object.fromEntries(dateFormData.entries());
    console.log(dateData);

    const contactFormData = new FormData(contactFormRef.current);
    const contactData = Object.fromEntries(contactFormData.entries());
    console.log(contactData);

    const bookingPayload = {
      firstName: contactData["first-name"],
      lastName: contactData["last-name"],
      emailAddress: contactData["email"],
      date: dateData["date"],
      startTime: dateData["start-time"],
      finishTime: dateData["finish-time"],
      phoneNumber: contactData["phone"],
      address: contactData["address"],
      message:
        "Booking request from " +
        contactData["first-name"] +
        " " +
        contactData["last-name"],
    };

    console.log("Submitting booking:", bookingPayload);

    // Submit booking data to the server
    axios
      .post(`${API_BASE_URL}/add-booking`, bookingPayload)
      .then((response) => {
        console.log("Booking created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
      });
  };

  const handleDateSubmit = () => {
    const formData = new FormData(dateFormRef.current);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    // Check if finish time is after start time
    const startTime = data["start-time"];
    const finishTime = data["finish-time"];
    if (finishTime <= startTime) {
      setDateError("Finish time must be after start time.");
      setIsFormShowing(false);
      return;
    }

    // Check if the date is not in the past
    const selectedDate = new Date(data["date"]);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setDateError("Date must be today or in the future.");
      setIsFormShowing(false);
      return;
    }

    // Check the data base for existing bookings
    // This is a placeholder for actual database check logic
    const existingBookings = [
      // Example existing booking
      { date: "2025-10-22", startTime: "10:00", finishTime: "12:00" },
    ];
    const conflict = existingBookings.some((booking) => {
      return (
        booking.date === data["date"] &&
        booking.startTime < finishTime &&
        booking.finishTime > startTime
      );
    });

    if (conflict) {
      setDateError("Booking conflicts with an existing reservation.");
      setIsFormShowing(false);
      return;
    }

    // If all validations pass
    setDateError(null);
    setIsFormShowing(true);
    alert("Form submitted successfully!");
  };

  return (
    <section className="flex md:flex-row flex-col max-w-[1920px] w-full mx-auto grow gap-8 h-full my-12">
      <article className="basis-1/4 pt-16 bg-primary-200 text-background px-8">
        <h2 className="text-xl text-accent font-light font-mulish">
          EMNL Village Hall.
        </h2>
        <h1 className="text-4xl mb-8 font-bold leading-tight">
          Reservation Page
        </h1>

        <DateForm formRef={dateFormRef} handleSubmit={handleDateSubmit} />
        {dateError && <p className="text-red-500">{dateError}</p>}

        <ContactForm
          isFormShowing={isFormShowing}
          formRef={contactFormRef}
          handleSubmit={handleContactSubmit}
        />
      </article>

      <Calendar />
    </section>
  );
};

const DateForm = ({ formRef, handleSubmit }) => {
  const onChange = () => {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const start = formData.get("start-time");
    const finish = formData.get("finish-time");
    const date = formData.get("date");

    // Check if all fields are filled
    if (start && finish && date) {
      // Optional: small delay to prevent double-triggering
      setTimeout(() => handleSubmit({ formData }), 100);
    }
  };

  return (
    <form
      ref={formRef}
      onChange={onChange}
      onSubmit={(e) => {
        e.preventDefault(); // prevent reload
        const formData = new FormData(e.target);
        handleSubmit({ formData });
      }}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-row gap-2">
        <div className="flex flex-col basis-1/2">
          <label htmlFor="start-time" className="form-label">
            Start Time
          </label>
          <input
            type="time"
            id="start-time"
            name="start-time"
            required
            className=" form-input"
          />
        </div>

        <div className="flex flex-col basis-1/2">
          <label htmlFor="finish-time" className="form-label">
            Finish Time
          </label>
          <input
            type="time"
            id="finish-time"
            name="finish-time"
            required
            className=" form-input"
          />
        </div>
      </div>

      <div className="flex flex-col grow">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          required
          className=" form-input"
        />
      </div>
    </form>
  );
};

const ContactForm = ({ formRef, handleSubmit, isFormShowing }) => {
  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={"flex flex-col gap-4 mt-4 " + (isFormShowing ? "" : "hidden")}
    >
      <div className="flex flex-row gap-2">
        <div className="flex flex-col basis-1/2">
          <label htmlFor="first-name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            autoComplete="given-name"
            className=" form-input"
            required
          />
        </div>

        <div className="flex flex-col basis-1/2">
          <label htmlFor="last-name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            autoComplete="family-name"
            className=" form-input"
            required
          />
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <div className="flex flex-col basis-1/2">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            className=" form-input"
          />
        </div>

        <div className="flex flex-col basis-1/2">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            className=" form-input"
            required
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          type="address"
          id="address"
          name="address"
          className=" form-input"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="event-type" className="form-label">
          Event Type
        </label>
        <select name="event-type" id="event-type" className="form-input  ">
          <option value="wedding">Wedding</option>
          <option value="corporate">Corporate</option>
          <option value="birthday">Birthday</option>
          <option value="other">Other</option>
        </select>
      </div>

      <span>
        <label className="form-label">Facilities</label>
        <span className="flex flex-row gap-4">
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="facility1">Main Hall</label>
            <input
              type="checkbox"
              id="facility1"
              name="facility1"
              value="Main Hall"
              className="check-box"
            />
          </div>

          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="facility2">Kitchen</label>
            <input
              type="checkbox"
              id="facility2"
              name="facility2"
              value="Kitchen"
              className="check-box"
            />
          </div>

          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="facility3">Bar Area</label>
            <input
              type="checkbox"
              id="facility3"
              name="facility3"
              value="Bar Area"
              className="check-box"
            />
          </div>
        </span>
      </span>

      <motion.button
        type="submit"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
        className="call-to-action-button !w-fit mt-4"
      >
        <span className="text-lg">review booking</span>
        <ArrowRightIcon size={36} className={""} />
      </motion.button>
    </form>
  );
};
