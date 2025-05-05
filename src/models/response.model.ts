import { model, Schema } from "mongoose";

const FileResponseSchema = new Schema({
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

const ResponseSchema = new Schema({
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
    type: [FileResponseSchema],
    default: [],
  },
  score: {
    type: Number,
    default: 0,
    required: true,
  },
  checkedAt: {
    type: Date,
    default: null,
  },
});

const ResponseModel = model("responses", ResponseSchema);
export default ResponseModel;
