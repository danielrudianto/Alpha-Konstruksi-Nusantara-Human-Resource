import { model, Schema } from "mongoose";

const MetaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  token: {
    type: String,
    required: true,
    ref: "tokens",
  },
});

const MetaModel = model("metas", MetaSchema);

export default MetaModel;
