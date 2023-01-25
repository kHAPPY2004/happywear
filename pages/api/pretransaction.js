const https = require("https");
const PaytmChecksum = require("paytmchecksum");
import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
const handler = async (req, res) => {
  console.log("cccccc");
  if (req.method == "POST") {
    let order = new Order({
      email: req.body.email,
      orderId: req.body.oid,
      address: req.body.address,
      amount: req.body.subTotal,
      products: req.body.cart,
    });
    await order.save();

    console.log("wwww");
    var paytmParams = {};
    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      webSiteName: "Happywear",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MKEY
    );
    /* head parameters */
    paytmParams.head = {
      /* put generated checksum value here */
      signature: checksum,
    };

    /* prepare JSON string for request */
    var post_data = JSON.stringify(paytmParams);

    const requestAsync = async () => {
      console.log("aaaaaa");
      return new Promise((resolve, reject) => {
        var options = {
          /* for Staging */
          // hostname: "securegw-stage.paytm.in",

          /* for Production */
          hostname: "securegw.paytm.in",

          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };
        console.log("sssss");
        // Set up the request
        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            console.log("Response: ", response);
            resolve(JSON.parse(response).body);
          });
        });

        // post the data
        post_req.write(post_data);
        post_req.end();
      });
    };
    let myr = await requestAsync();
    res.status(200).json(myr);
    console.log("dddd");
  }
};
export default connectDb(handler);
