import { time } from "motion/react";
import React, { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  CalendarIcon,
  CopyIcon,
  FacebookIcon,
} from "../assets/icons/Icons";
import { motion } from "framer-motion";
import { useBookingsOnMonth } from "../components/booking-calendar/GetBookingsOnMonth";
import { GetEventsForMonth } from "../components/getEventsForMonth";

const API_BASE_URL = "http://localhost:5000/api/booking";

// const events = [
//   {
//     name: "Coffee morning",
//     description:
//       "Join us for our annual Christmas Bingo an evening of festive fun, friendly competition, and holiday cheer with great prizes to be won!",
//     date: "Every Monday",
//     time: "10:00 AM - 12:00 PM",
//     facebookLink: "https://www.facebook.com/events/123456789",
//     copyInfo: "Location: Village Hall, Main Street, New Leake",
//   },
//   {
//     name: "Christmas Bingo",
//     description:
//       "Join us for our annual Christmas Bingo an evening of festive fun, friendly competition, and holiday cheer with great prizes to be won!",
//     date: "December 15, 2023",
//     time: "7:00 PM - 9:00 PM",
//     facebookLink: "",
//     copyInfo: "",
//   },
//   {
//     name: "Bingo Night",
//     description: "Join us for a night of fun and games with our Bingo Night!",
//     date: " Every Friday",
//     time: "7:00 PM - 9:00 PM",
//     facebookLink: "",
//     copyInfo: "",
//   },
//   {
//     name: "Jumble Sale",
//     description:
//       "Join us for our annual charity jumble sale, where you can find amazing bargains and support a great cause!",
//     date: " March 10, 2024",
//     time: "10:00 AM - 12:00 PM",
//     facebookLink: "",
//     copyInfo: "",
//   },
//   {
//     name: "Coffee morning",
//     description: "  Come join us for our coffee morning every monday",
//     date: " Every Monday",
//     time: " 10:00 AM - 12:00 PM",
//     facebookLink: "",
//     copyInfo: "",
//   },
// ];

export const Events = () => {
  return (
    <section className="">
      <section className="text-center pb-12 pt-12 md:pt-20 bg-primary-200 text-background px-4 mx-auto">
        <h1 className="text-4xl font-bold uppercase">Upcoming Events</h1>
        <p className="text-lg mt-8 mb-6">
          Explore what's coming up at the hall! Every event you attend
          contributes directly to keeping our village hall thriving.
        </p>
      </section>

      <EventsList />
    </section>
  );
};

const EventsList = () => {
  // #region Date Selector State
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const setYearSafe = (y) => {
    if (y < 2000) return 2000;
    else if (y > 2100) return 2100;
    else return y;
  };

  const setMonthSafe = (m) => {
    if (m < 1) return 1;
    else if (m > 12) return 12;
    else return m;
  };

  const [year, setYear] = useState(setYearSafe(currentYear));
  const [month, setMonth] = useState(setMonthSafe(currentMonth)); // example: January 2025
  //#endregion

  // Returns the booking for the month with any errors error or loading states
  const { data: events, loading, error } = GetEventsForMonth({ month, year });

  if (loading)
    return (
      <p className="text-2xl text-center uppercase font-bold text-primary-200 min-h-[720px]">
        Loading Events
      </p>
    );
  if (error)
    return (
      <p className="text-2xl text-center uppercase font-bold text-primary-200 min-h-[720px]">
        Error Loading Events
      </p>
    );

  // Sort events by the date showing the most recent one first
  const sortedEvents = events.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <>
      <section>
        <DateSelector
          year={year}
          month={month}
          setYear={setYear}
          setMonth={setMonth}
        />
      </section>
      <div className="mt-8 min-h-[648px]">
        {sortedEvents.length <= 0 && (
          <p className=" text-2xl text-center uppercase font-bold text-primary-200 ">
            There is current no events planed for this day
            <br />
            Check Back on alater date
          </p>
        )}
        {sortedEvents.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
    </>
  );
};

const DateSelector = (props) => {
  const { year, month, setYear, setMonth } = props;

  function goPrevMonth() {
    if (month === 1) {
      setYear((y) => y - 1);
      setMonth(12);
    } else {
      setMonth((m) => m - 1);
    }
  }
  function goNextMonth() {
    if (month === 12) {
      setYear((y) => y + 1);
      setMonth(1);
    } else {
      setMonth((m) => m + 1);
    }
  }
  function getMonthName(monthNumber) {
    return new Date(2000, monthNumber - 1, 1).toLocaleString("en-GB", {
      month: "long",
    });
  }

  return (
    <section className="container mx-auto flex flex-col items-center">
      <section className="flex flex-col gap-3 items-center  mt-8 mb-4">
        <h2 className="text-lg font-mulish font-bold uppercase  text-primary-200">
          Select A Month
        </h2>

        <span className="text-text text-center text-lg font-mulish uppercase">
          {getMonthName(month)}, {year}
        </span>
      </section>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={goPrevMonth}
          className="inline-flex items-center border border-primary-200 px-3 py-1.5 text-base text-text
                 hover:bg-primary-200 active:bg-background focus:outline-none focus:ring-2 focus:ring-background cursor-pointer hover:text-accent"
          aria-label="Previous month"
          title="Previous month"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12.293 15.707a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 1 1 1.414 1.414L8.414 10l3.879 3.879a1 1 0 0 1 0 1.414z" />
          </svg>
        </button>

        <button
          type="button"
          onClick={goNextMonth}
          className="inline-flex items-center border border-primary-200 px-3 py-1.5 text-base text-text
                 hover:bg-primary-200 active:bg-background focus:outline-none focus:ring-2 focus:ring-background cursor-pointer hover:text-accent"
          aria-label="Next month"
          title="Next month"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M7.707 4.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 1 1-1.414-1.414L11.586 10 7.707 6.121a1 1 0 0 1 0-1.828z" />
          </svg>
        </button>
      </div>
    </section>
  );
};

const EventCard = ({ event }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("en-GB", {
      weekday: "long", // Monday
      day: "numeric", // 21
      month: "long", // November
      year: "numeric", // 2025
    });
  };

  return (
    <article className="flex flex-col md:flex-row text-mulish bg-background p-6 rounded-lg gap-6 border-secondary border mb-6 shadow-sm max-w-[1440px] mx-auto">
      <section className="basis-2/3 flex flex-col gap-2">
        <h2 className="text-[32px] uppercase text-primary-200 font-semibold">
          {event.name}
        </h2>
        <p className="text-text">{event.description}</p>

        <div>
          <span className="hidden md:inline-flex gap-2 items-center mb-2">
            <CalendarIcon size={24} className={"text-primary-200"} />
            <h3 className="text-sm text-text">Event Time and Date</h3>
          </span>

          <div className="flex flex-col sm:flex-row justify-between text-text font-mulish font-bold text-base sm:text-lg">
            <span>
              {formatDate(new Date(event.date).toISOString().split("T")[0])}
            </span>
            <span>
              {event.startTime} - {event.finishTime}
            </span>
          </div>
        </div>
      </section>

      <section className="basis-1/3 flex flex-col gap-4 justify-between">
        <motion.button
          className="
          w-full text-lg
          flex justify-between gap-8  px-4 py-3 uppercase transition-colors duration-500 ease-in-out
            cursor-pointer bg-primary-200 text-background 
            hover:bg-primary-100 hover:text-accent self-center md:self-start items-center"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeIn", delay: 0.5 }}
        >
          <span className="">Add To Calendar</span>
          <ArrowRightIcon size={32} className="text-current" />
        </motion.button>

        <div>
          <h3 className="text-text text-lg font-mulish font-semibold">
            Share With Friends
          </h3>
          <div className="flex flex-row gap-4">
            <ShareIcon
              icon={<FacebookIcon size={32} />}
              link="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL"
              alt="Share on Facebook"
            />
            <ShareIcon
              icon={<CopyIcon size={32} />}
              link="https://twitter.com/intent/tweet?url=YOUR_URL"
              alt="Share on Twitter"
            />
          </div>
        </div>
      </section>
    </article>
  );
};

const ShareIcon = ({ icon, link, alt }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      alt={alt}
      className="bg-primary-200 text-accent size-10 flex flex-col items-center justify-center rounded-full hover:bg-primary-100 hover:text-background transition-colors duration-300    "
    >
      {icon}
    </a>
  );
};
