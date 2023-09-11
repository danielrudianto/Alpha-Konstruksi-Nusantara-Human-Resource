import { model, Schema } from "mongoose";

const TokenStatusSchema = new Schema({
  status: {
    type: String,
    enum: [
      "published",
      "logged in",
      "meta submitted",
      "cv submitted",
      "test submitted",
    ],
    default: "published",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiredAt: {
    type: Date,
    // Default 2 days from now
    default: Date.now() + 2 * 24 * 60 * 60 * 1000,
  },
  status: {
    type: [TokenStatusSchema],
    default: [],
  },
  currentStatus: {
    type: String,
    enum: [
      "published",
      "logged in",
      "meta submitted",
      "cv submitted",
      "test submitted",
    ],
  },
  testName: {
    type: String,
    required: true,
  },
});

const TokenModel = model("tokens", TokenSchema);
export default TokenModel;
