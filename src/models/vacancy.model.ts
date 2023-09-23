import { Schema, model, Types } from "mongoose";

const VacancySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Types.ObjectId,
    required: true,
  },
  createdByName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
  deletedBy: {
    type: Types.ObjectId,
    default: null,
  },
  deletedByName: {
    type: String,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

const VacancyModel = model("vacancies", VacancySchema);

export default VacancyModel;
