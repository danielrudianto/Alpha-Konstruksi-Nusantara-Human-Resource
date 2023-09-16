import { model, Schema } from "mongoose";

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
});

const TestModel = model("tests", TestSchema);
export default TestModel;
