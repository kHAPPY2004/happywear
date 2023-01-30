import React from "react";
import { useState, useEffect } from "react";
import { FaRegSurprise } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiShoppingBagFill } from "react-icons/ri";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Head from "next/head";
import Script from "next/script";

const Checkout = ({ cart, clearCart, addToCart, removeFromCart, subTotal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [pin, setPin] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({ value: null });

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser && myuser.token) {
      setUser(myuser);
      setEmail(myuser.email);
      fetchData(myuser.token);
    }
  }, []);

  const getPincode = async (pin) => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson).includes(pin)) {
      setState(pinJson[pin][1]);
      setDistrict(pinJson[pin][0]);
    } else {
      setState("");
      setDistrict("");
    }
  };
  useEffect(() => {
    if (
      name.length > 3 &&
      email.length > 3 &&
      address.length > 3 &&
      tel.length > 3 &&
      pin.length > 3
    ) {
      setDisabled(false);
      console.log("lllllll");
    } else {
      setDisabled(true);
      console.log("akhiii");
    }
  }, [name, email, address, tel, pin]);

  const fetchData = async (token) => {
    let data = { token: token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("zzzzz", a);
    let res = await a.json();
    console.log("res:-", res);
    setName(res.name);
    setAddress(res.address);
    setPin(res.pin);
    setTel(res.tel);
    getPincode(res.pin);
  };

  const handleChange = async (e) => {
    console.log("handle");
    console.log(user, email);
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "tel") {
      setTel(e.target.value);
    } else if (e.target.name == "pin") {
      setPin(e.target.value);
      if (e.target.value.length == 6) {
        getPincode(e.target.value);
      } else {
        setState("");
        setDistrict("");
      }
    }

    console.log(
      name,
      typeof name,
      email,
      address,
      tel,
      typeof tel,
      pin,
      typeof tel,
      district,
      typeof district,
      state,
      typeof state
    );
  };
  const initiatePayment = async () => {
    console.log("yyyyy");
    let oid = Math.floor(Math.random() * Date.now());
    // Get a transaction token
    const data = {
      cart,
      subTotal,
      oid,
      email: email,
      name,
      address,
      tel,
      pin,
      district,
      state,
    };
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
    if (txnRes.sucess) {
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
    } else {
      console.log(txnRes.error);
      if (txnRes.cartClear) {
        clearCart();
      }
      toast.error(txnRes.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <section className="container m-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
      <h1 className="flex justify-center items-center font-bold text-xl my-5 md:mt-10">
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
            {user && user.token ? (
              <input
                readOnly
                value={user.email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            ) : (
              <input
                onChange={handleChange}
                value={email}
                type="email"
                id="email"
                name="email"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            )}
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
            <label
              htmlFor="district"
              className="leading-7 text-sm text-gray-600"
            >
              District
            </label>
            <input
              onChange={handleChange}
              value={district}
              type="text"
              id="district"
              name="district"
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
            <input
              onChange={handleChange}
              value={state}
              type="text"
              id="state"
              name="state"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {/* <select
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
            </select> */}
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
              type="pin"
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
        onClick={initiatePayment}
        className="flex text-white disabled:bg-green-400 bg-green-700 border-0 py-2 pl-3 pr-4 my-5 focus:outline-none hover:bg-green-800 rounded"
      >
        <RiShoppingBagFill className="mx-1 text-lg" />
        <div>Pay ₹{subTotal}</div>
      </button>
    </section>
  );
};

export default Checkout;
