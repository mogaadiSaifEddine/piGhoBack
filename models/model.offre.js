const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const offerSchema = new Schema(
  {
    name: { required: true, type: String, trim: true },
    description: { required: true, type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true,
    },
    publishedDate: { type: Date, default: new Date() },
    appliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    requirements: [{ required: true, type: String }],
    valid: { type: Boolean, default: true },
    acceptedAppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    category: {
      type: String,
      required: true,
      enum: ["internship", "partTime", "fullTime"],
    },
    mode: { type: String, required: true, enum: ["local", "remote"] },
  },
  { timestamps: true }
);

const Offers = mongoose.model("offer", offerSchema, "offer");
module.exports = Offers;
