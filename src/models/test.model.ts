import { model, Schema } from "mongoose";

const FileTestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
    min: 0,
  },
  data: {
    type: String,
    required: true,
  },
});

const TestSchema = new Schema({
  token: {
    type: String,
    required: true,
    ref: "tokens.token",
  },
  questionID: {
    type: String,
  },
  answer: {
    type: String,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  files: {
    type: [FileTestSchema],
    default: [],
  },
});

const TestModel = model("tests", TestSchema);
export default TestModel;
