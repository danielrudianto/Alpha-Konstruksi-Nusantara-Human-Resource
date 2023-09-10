import { model, Schema } from "mongoose";

const TestAnswerSchema = new Schema({
  answer: {
    type: String,
  },
});

const TestSchema = new Schema({
  token: {
    type: String,
    required: true,
    ref: "tokens.token",
    unique: true,
  },
  result: {
    type: Number,
    required: true,
  },
  answer: {
    type: [TestAnswerSchema],
  },
});

const TestModel = model("tests", TestSchema);
export default TestModel;
