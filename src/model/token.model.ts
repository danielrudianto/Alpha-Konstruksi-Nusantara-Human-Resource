import { model, Schema } from "mongoose";

const TokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    minlength: 36,
    maxlength: 36,
  },
  candidateName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "expired", "pristine"],
    default: "pristine",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
  },
  createdByName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  testID: {
    type: Schema.Types.ObjectId,
    ref: "tests",
  },
  expiryDate: {
    type: Date,
    default: Date.now,
  },
});

const TokenModel = model("tokens", TokenSchema);

export default TokenModel;
