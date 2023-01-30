import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import Jsonwebtoken from "jsonwebtoken";
const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = Jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log(user);
    let dbuser = await User.findOne({ email: user.email });
    console.log(dbuser);
    const { name, email, address, pin, tel } = dbuser;
    console.log(name, email, address, pin, tel);

    res.status(200).json({ name, email, address, pin, tel });
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDb(handler);
