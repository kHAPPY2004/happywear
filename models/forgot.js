// getting-started.js
// import mongoose, { connect } from "mongoose";
const mongoose = require("mongoose");

const ForgotSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true },
  },
  { timestamps: true }
);
// mongoose.models = {};
// export default mongoose.model("User", ForgotSchema);
export default mongoose.models.User || mongoose.model("Forgot", ForgotSchema);
