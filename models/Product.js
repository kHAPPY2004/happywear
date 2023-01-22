// getting-started.js
const mongoose = require("mongoose");
// import mongoose, { connect } from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    availableQty: { type: String },
  },
  { timestamps: true }
);
// mongoose.models = {};
// export default mongoose.model("Product", ProductSchema);
export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
