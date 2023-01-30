import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import Jsonwebtoken from "jsonwebtoken";
import CryptoJS from "crypto-js";
const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = Jsonwebtoken.verify(token, process.env.JWT_SECRET);
    console.log(user);
    let dbuser = await User.findOne({ email: user.email });
    const bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    console.log(decryptedData);
    if (
      decryptedData == req.body.password &&
      req.body.npassword == req.body.confirmnpassword
    ) {
      await User.findOneAndUpdate(
        { email: user.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.npassword,
            process.env.AES_SECRET
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
      return;
    }
    res.status(200).json({ success: false });
    return;
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDb(handler);
