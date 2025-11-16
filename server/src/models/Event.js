import mongoose from "mongoose";
const { Schema } = mongoose;

const EventSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  finishTime: { type: String, required: true },

  facebookLink: { type: String, required: false },
  copyInfo: { type: String, required: false },
});

export const Event = mongoose.model("Event", EventSchema);
