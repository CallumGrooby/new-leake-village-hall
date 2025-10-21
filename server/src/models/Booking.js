import mongoose from "mongoose";
const { Schema } = mongoose;

// Create a boiler plate for the information inside of the database, each element is defined as a type

const BookingSchema = new Schema({
  // name: String,
  // emailAddress: String,
  // date: Date,
  // time: String,
  // message: String,
  // approved: Boolean,
  // paid: Boolean,
  // invoiceSent: Boolean,

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: String },
  address: { type: String },

  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  finishTime: { type: String, required: true },

  message: { type: String },

  approved: { type: Boolean, default: false },
  paid: { type: Boolean, default: false },
  invoiceSent: { type: Boolean, default: false },
});

export const Booking = mongoose.model("Booking", BookingSchema);
