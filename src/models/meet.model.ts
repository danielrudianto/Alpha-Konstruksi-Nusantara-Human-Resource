import { model, Schema, Types } from "mongoose";

const MeetSchema = new Schema({
  roomID: {
    type: String,
    required: true,
    unique: true,
  },
  createdBy: {
    type: Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const MeetModel = model("meets", MeetSchema);

export default MeetModel;
