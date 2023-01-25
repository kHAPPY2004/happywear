import React from "react";
import { useState } from "react";
import { FaRegSurprise } from "react-icons/fa";
import { RiShoppingBagFill } from "react-icons/ri";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Head from "next/head";
import Script from "next/script";

const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [pin, setPin] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [disabled, setDisabled] = useState(true);
  const handleChange = async (e) => {
    console.log("handle");
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "tel") {
      setTel(e.target.value);
    } else if (e.target.name == "city") {
      setCity(e.target.value);
    } else if (e.target.name == "state") {
      setState(e.target.value);
    } else if (e.target.name == "pin") {
      setPin(e.target.value);
    }

    console.log(name, email, address, tel, pin, city, state);
    if (
      name.length > 3 &&
      email.length > 3 &&
      address.length > 3 &&
      tel.length > 3 &&
      pin.length > 3 &&
      city.length > 3 &&
      state.length > 3
    ) {
      setDisabled(false);
      console.log("lund");
    } else {
      setDisabled(true);
      console.log("akhiii");
    }
  };
  const initiatePayment = async () => {
    console.log("yyyyy");
    let oid = Math.floor(Math.random() * Date.now());
    // Get a transaction token
    const data = { cart, subTotal, oid, email: email, name, address, tel, pin };
    console.log("llllll");
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("zzzzz", a);
    let txnRes = await a.json();
    let txnToken = txnRes.txnToken;
    console.log("oid", oid);
    console.log("txnToken", txnToken);
    console.log("txnRes", txnRes);
    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid /* update order id */,
        token: txnToken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: subTotal /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };

    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
    console.log("asdasd");
  };
  return (
    <section className="container m-auto">
      {/* Adding paytm gateway */}
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-sc ale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        crossorigin="anonymous"
      />
      <h1 className="flex justify-center items-center font-bold text-xl">
        Checkout
      </h1>
      <h2 className="font-bold text-xl">1. Delivery Details </h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              onChange={handleChange}
              value={name}
              type="text"
              id="name"
              name="name"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              onChange={handleChange}
              value={email}
              type="email"
              id="email"
              name="email"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            onChange={handleChange}
            value={address}
            name="address"
            id="address"
            cols="30"
            rows="2"
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="tel" className="leading-7 text-sm text-gray-600">
              Phone Number
            </label>
            <input
              onChange={handleChange}
              value={tel}
              type="tel"
              minLength="10"
              maxLength="10"
              pattern="^[1-9]{1}[0-9]{9}$"
              id="tel"
              name="tel"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              City
            </label>
            <input
              onChange={handleChange}
              value={city}
              type="text"
              id="city"
              name="city"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <select
              onChange={handleChange}
              value={state}
              name="state"
              className="w-full h-10 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="state"
              required
            >
              <option selected disabled value={""}>
                Choose...
              </option>
              <option>Andhra Pradesh</option>
              <option>Arunachal Pradesh</option>
              <option>Assam</option>
              <option>Bihar</option>
              <option>Chhattisgarh</option>
              <option>Goa</option>
              <option>Gujarat</option>
              <option>Haryana</option>
              <option>Himachal Pradesh</option>
              <option>Jharkhand</option>
              <option>Karnataka</option>
              <option>Kerala</option>
              <option>Madhya Pradesh</option>
              <option>Maharashtra</option>
              <option>Manipur</option>
              <option>Meghalaya</option>
              <option>Mizoram</option>
              <option>Nagaland</option>
              <option>Odisha</option>
              <option>Punjab</option>
              <option>Rajasthan</option>
              <option>Sikkim</option>
              <option>Tamil Nadu</option>
              <option>Telangana</option>
              <option>Tripura</option>
              <option>Uttar Pradesh</option>
              <option>Uttarakhand</option>
              <option>West Bengal</option>
            </select>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pin" className="leading-7 text-sm text-gray-600">
              Pincode
            </label>
            <input
              onChange={handleChange}
              value={pin}
              type="tel"
              minLength="6"
              maxLength="6"
              pattern=" [1-9]"
              id="pin"
              name="pin"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
      </div>
      <h2 className="font-bold text-xl">2. Review Cart Items & Pay </h2>
      <div className="container bg-slate-500">
        <ol className="list-disc ml-4 mr-2 font-serif font-semibold ">
          {Object.keys(cart).length == 0 && (
            <div className="text-2xl flex text-center justify-center mt-5 font-bold text-red-500">
              Oh! <FaRegSurprise className="mx-2 mt-1 " /> Your Cart is Empty...
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="flex">
                  <div className="bg-red-500 w-2/3">
                    {cart[k].name}({cart[k].size}/{cart[k].varient})
                  </div>
                  <div className="bg-green-500 w-1/3 flex items-center justify-center text-lg">
                    <AiOutlineMinusCircle
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].name,
                          cart[k].size,
                          cart[k].varient,
                          cart[k].price
                        );
                      }}
                      className="cursor-pointer"
                    />
                    <span className="mx-2">{cart[k].qty}</span>
                    <AiOutlinePlusCircle
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].name,
                          cart[k].size,
                          cart[k].varient,
                          cart[k].price
                        );
                      }}
                      className="cursor-pointer"
                    />{" "}
                  </div>
                </div>
              </li>
            );
            <hr />;
          })}
        </ol>
        <div className="subTotal">Total : ₹{subTotal}</div>
      </div>
      <button
        disabled={disabled}
        // onChange={handleChange}
        onClick={initiatePayment}
        className="flex text-white bg-green-700 border-0 py-2 pl-3 pr-4 my-5 focus:outline-none hover:bg-green-800 rounded"
      >
        <RiShoppingBagFill className="mx-1 text-lg" />
        <div>Pay ₹{subTotal}</div>
      </button>
    </section>
  );
};

export default Checkout;
