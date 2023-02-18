import Forgot from "@/models/forgot";
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
import Jsonwebtoken from "jsonwebtoken";
import CryptoJS from "crypto-js";
export default async function handler(req, res) {
  //Check if the user exit in the database
  if (req.body.sendMail) {
    //send email to user
    let token = `sfddsf7ydfsdfhje4389a7b833`;
    let forgot = new Forgot({
      email: req.body.email,
      token: token,
    });
    let email = `We have send you this email in response to your request to reset password on codeswear.com
  To reset your password,Please follow the link below:

  <a href=&{https://codeswear.com/forgot?token=${token}}>Click here to reset your password<a/>

  <br/><br/>

  We recommended that you keep your password secure and not share with anyone. If you feel your password has been compromised,
  you can change it by going to your "My Account" section and change your password.
  
  `;
  } else {
    //Rest user password
    if (req.method == "POST") {
      let token = req.body.token;
      let user = Jsonwebtoken.verify(token, process.env.JWT_SECRET);
      console.log(user);
      let dbuser = await User.findOne({ email: user.email });
      const bytes = CryptoJS.AES.decrypt(
        dbuser.password,
        process.env.AES_SECRET
      );
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
  }
  res.status(200).json({ success: true });
}
