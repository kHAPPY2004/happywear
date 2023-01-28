// getting-started.js
// import mongoose, { connect } from "mongoose";
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    transactionid: { type: String, default: "" },
    orderId: { type: String, required: true },
    paymentInfo: { type: String, default: "" },
    products: { type: Object, required: true },
    tel: { type: String, required: true },
    pin: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    amount: { type: Number, required: true },
    Status: { type: String, default: "Initiated", required: true },
    deliveryStatus: { type: String, default: "unshipped", required: true },
  },
  { timestamps: true }
);
// mongoose.models = {};
// export default mongoose.model("Order", OrderSchema);
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
