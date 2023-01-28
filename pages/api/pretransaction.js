const https = require("https");
const PaytmChecksum = require("paytmchecksum");
import Order from "@/models/Order";
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import pincodes from "../../pincodes.json";
const handler = async (req, res) => {
  if (req.method == "POST") {
    // Check if the pincode is serviceable
    if (!Object.keys(pincodes).includes(req.body.pin)) {
      res.status(200).json({
        sucess: false,
        error: "Your pincode is not serviceable ..",
        cartClear: false,
      });
      return;
    }

    // Check if the cart is tempered with
    let product,
      sumTotal = 0;
    let cart = req.body.cart;
    if (req.body.subTotal < 1) {
      res.status(200).json({
        sucess: false,
        error: "Please build your cart and try again..",
      });
      return;
    }
    for (let item in cart) {
      console.log(item);
      sumTotal += cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });

      // check cart if the cart items are out of stoke...
      if (product.availableQty < cart[item].qty) {
        res.status(200).json({
          sucess: false,
          error:
            "Some items in your cart went out of stoke...Please try again..",
          cartClear: true,
        });
        return;
      }
      if (product.price != cart[item].price) {
        res.status(200).json({
          sucess: false,
          error:
            "ERROR ! Some items in your cart have been changed. Please try again....",
          cartClear: true,
        });
        return;
      }
    }
    if (sumTotal !== req.body.subTotal) {
      res.status(200).json({
        sucess: false,
        error:
          "ERROR ! Some items in your cart have been changed. Please try again....",
        cartClear: true,
      });
      return;
    }
    console.log("cccccc");

    // Check if the details are pending....
    if (req.body.tel.length !== 10 || !Number.isInteger(Number(req.body.tel))) {
      res.status(200).json({
        sucess: false,
        error: "Please enter your 10 digit phone number...",
        cartClear: false,
      });
      return;
    }
    if (req.body.pin.length !== 6 || !Number.isInteger(Number(req.body.pin))) {
      res.status(200).json({
        sucess: false,
        error: "Please enter your 6 digit pincode...",
        cartClear: false,
      });
      return;
    }

    //Initiate an order corressponding to this order id...
    let order = new Order({
      name: req.body.name,
      email: req.body.email,
      tel: req.body.tel,
      pin: req.body.pin,
      district: req.body.district,
      state: req.body.state,
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
            let ress = JSON.parse(response).body;
            ress.sucess = true;
            ress.cartClear = false;

            resolve(ress);
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
