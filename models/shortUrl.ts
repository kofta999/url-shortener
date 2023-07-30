import { Schema, model } from "mongoose";
import { generate } from "shortid";

const shortUrlSchema = new Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: generate
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
})

export default model("ShortUrl", shortUrlSchema)