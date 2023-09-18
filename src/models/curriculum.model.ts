import { model, Schema } from "mongoose";

const CurriculumSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
    ref: "tokens.token",
  },
});

const CurriculumModel = model("curriculums", CurriculumSchema);
export default CurriculumModel;
