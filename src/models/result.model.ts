import { model, Schema, Types } from "mongoose";

const resultSchema = new Schema({
  testID: {
    type: Types.ObjectId,
    required: true,
    ref: "tests._id",
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const resultModel = model("results", resultSchema);

export default resultModel;
