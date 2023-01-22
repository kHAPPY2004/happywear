// getting-started.js
// import mongoose, { connect } from "mongoose";
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    product: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    Status: { type: String, default: "Pending", required: true },
  },
  { timestamps: true }
);
// mongoose.models = {};
// export default mongoose.model("Order", OrderSchema);
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
