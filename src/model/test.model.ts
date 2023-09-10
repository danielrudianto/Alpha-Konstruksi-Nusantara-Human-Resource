import { Schema, model } from "mongoose";

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  point: {
    type: Number,
    required: true,
    min: 5,
    max: 25,
  },
});

const TestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  questions: [QuestionSchema],
  createdByName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
  isDelete: {
    type: Boolean,
    required: true,
    default: false,
  },
  deletedBy: {
    type: Schema.Types.ObjectId,
    required: false,
    default: null,
  },
  deletedByName: {
    type: String,
    required: false,
    default: null,
  },
  deletedAt: {
    type: Date,
    required: false,
    default: null,
  },
});

const TestModel = model("tests", TestSchema);
export default TestModel;
