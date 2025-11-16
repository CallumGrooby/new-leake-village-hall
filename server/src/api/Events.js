import express from "express";
import { Event } from "../models/Event.js";
import { authMiddleware } from "../middleware/auth.js";

export const EventRouter = express.Router();

EventRouter.post("/add-event", async (req, res) => {
  try {
    let {
      name,
      description,
      date,
      startTime,
      finishTime,
      facebookLink,
      copyInfo,
    } = req.body;
    name = name?.trim();
    description = description?.trim();
    date = date?.trim();

    // Test for empties
    if (!name || !description || !date || !startTime || !finishTime) {
      {
        return res.json({ status: "FAILED", message: "Empty input field" });
      }
    }

    const newEvent = new Event({
      name,
      description,
      startTime,
      finishTime,
      date,
      facebookLink,
      copyInfo,
    });

    const savedEvent = await newEvent.save();

    res.json({
      status: "SUCCESS",
      message: "New booking successfully created",
      data: savedEvent,
    });
  } catch (err) {
    console.error(err);
    res.json({
      status: "FAILED",
      message: "An error occurred creating the event",
    });
  }
});

EventRouter.get("/all-events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json({
      status: "SUCCESS",
      message: "Bookings retrieved successfully",
      data: events,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "FAILED",
      message: "Error retrieving bookings",
    });
  }
});

EventRouter.get("/events-by-month", async (req, res) => {
  try {
    const { year, month } = req.query;
    const filter = {};

    if (year && month) {
      const start = new Date(year, month - 1, 1); // e.g. 2025-10-01
      const end = new Date(year, month, 1); // e.g. 2025-11-01
      filter.date = { $gte: start, $lt: end };
    }

    const events = await Event.find(filter).sort({ date: 1 });

    res.json({
      status: "SUCCESS",
      data: events,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "FAILED", message: "Error retrieving events" });
  }
});
