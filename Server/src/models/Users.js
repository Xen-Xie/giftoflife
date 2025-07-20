import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
  },

  password: {
    type: String,
    required: true,
    // Password must have at least 8 characters, one uppercase, one number, and one special character
    match: [
      /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Password must be at least 8 characters and include an uppercase letter, number, and special character",
    ],
  },

  bloodGroup: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },

  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{11}$/, "Please use a valid 11-digit phone number"],
  },

  address: new Schema(
    {
      division: { type: String, required: true },
      district: { type: String, required: true },
    },
    { _id: false }
  ),

  lastDonated: {
    type: [Date], // array of dates
    default: [],
  },

  age: {
    type: Number,
    required: true,
    min: [18, "You must be at least 18 years old to donate"],
    max: [65, "You must be under 65 years old to donate"],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
