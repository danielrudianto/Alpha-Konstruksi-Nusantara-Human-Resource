import { model, Schema } from "mongoose";

const ScheduleSchema = new Schema({
  token: {
    type: String,
    required: true,
    ref: "tokens.token",
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const ScheduleModel = model("schedules", ScheduleSchema);

export default ScheduleModel;
