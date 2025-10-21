import express from "express";
import { Booking } from "../models/Booking.js";
import { authMiddleware } from "../middleware/auth.js";

export const BookingRouter = express.Router();

BookingRouter.post("/add-booking", async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      emailAddress,
      date,
      startTime,
      finishTime,
      message,
      phoneNumber,
      address,
    } = req.body;

    firstName = firstName?.trim();
    lastName = lastName?.trim();
    emailAddress = emailAddress?.trim();
    message = message?.trim();

    // Test for empties
    if (
      !firstName ||
      !lastName ||
      !emailAddress ||
      !date ||
      !startTime ||
      !finishTime ||
      !phoneNumber ||
      !address
    ) {
      return res.json({ status: "FAILED", message: "Empty input field" });
    }

    // regex to test if name contains anything other than letters, reject it
    if (!/^[a-zA-Z\s]*$/.test(firstName) || !/^[a-zA-Z\s]*$/.test(lastName)) {
      return res.json({ status: "FAILED", message: "Invalid Name Entered" });
    }

    if (!/^[a-zA-Z\s]*$/.test(message)) {
      return res.json({ status: "FAILED", message: "Invalid message Entered" });
    }

    if (!/^[a-zA-Z\s]*$/.test(address)) {
      return res.json({ status: "FAILED", message: "Invalid address Entered" });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailAddress)) {
      return res.json({ status: "FAILED", message: "Invalid Email Entered" });
    }

    const newBooking = new Booking({
      firstName,
      lastName,
      emailAddress,
      date: new Date(date),
      startTime,
      finishTime,
      address,
      phoneNumber,
      message,
      approved: false,
      paid: false,
      invoiceSent: false,
    });
    const savedBooking = await newBooking.save();

    res.json({
      status: "SUCCESS",
      message: "New booking successfully created",
      data: savedBooking,
    });
  } catch (error) {
    console.error(error);
    res.json({
      status: "FAILED",
      message: "An error occurred creating the booking",
    });
  }
});

BookingRouter.get("/bookings/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.json({
        status: "FAILED",
        message: "Booking with this id does not exists",
      });
    }

    res.json({ message: "Found booking", data: booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Error retrieving booking",
    });
  }
});

BookingRouter.delete("/bookings/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({
        status: "FAILED",
        message: "Booking with this id does not exist",
      });
    }

    res.json({
      status: "SUCCESS",
      message: "Booking deleted successfully",
      data: deletedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Error deleting booking",
    });
  }
});

BookingRouter.put("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      req.body, // fields to update
      { new: true } // return updated document
    );

    if (!updatedBooking) {
      return res.status(404).json({
        status: "FAILED",
        message: "Booking not found",
      });
    }

    res.json({
      status: "SUCCESS",
      message: "Booking updated successfully",
      data: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Error updating booking",
    });
  }
});

BookingRouter.get("/all-bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({
      status: "SUCCESS",
      message: "Bookings retrieved successfully",
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Error retrieving bookings",
    });
  }
});

BookingRouter.get("/bookings-by-month", async (req, res) => {
  try {
    const { year, month } = req.query;
    const filter = {};

    if (year && month) {
      const start = new Date(year, month - 1, 1); // e.g. 2025-10-01
      const end = new Date(year, month, 1); // e.g. 2025-11-01
      filter.date = { $gte: start, $lt: end };
    }

    const bookings = await Booking.find(filter).sort({ date: 1 });

    res.json({
      status: "SUCCESS",
      data: bookings,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "FAILED", message: "Error retrieving bookings" });
  }
});
