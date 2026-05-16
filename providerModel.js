const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    // provider's full name
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    // must be unique across all providers
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    // e.g. 'Web Dev', 'Plumbing', 'Design'
    skillCategory: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    // provider's base of operations
    address: {
      type: String,
      required: true,
    },

    // defaults to false until manually verified
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Provider", providerSchema);
