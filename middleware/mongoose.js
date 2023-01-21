import mongoose from "mongoose";
// mongoose.set('strictQuery', true);
const connectDb = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  await mongoose.connect(process.env.MONGO_URL);
  return handler(req, res);
};
export default connectDb;
