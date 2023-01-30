// getting-started.js
// import mongoose, { connect } from "mongoose";
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, default: "" },
    pin: { type: String, default: "" },
    tel: { type: String, default: "" },
    password: { type: String, required: true },
    confirmpassword: { type: String, required: true },
  },
  { timestamps: true }
);
// mongoose.models = {};
// export default mongoose.model("User", UserSchema);
export default mongoose.models.User || mongoose.model("User", UserSchema);
