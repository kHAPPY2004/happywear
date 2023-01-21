import React from "react";
import { FaRegSurprise } from "react-icons/fa";
import { RiShoppingBagFill } from "react-icons/ri";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  return (
    <div className="container m-auto">
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
              name="state"
              className="w-full h-10 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              id="state"
              required
            >
              <option selected disabled value="">
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
                  <div className="bg-red-500 w-2/3">{cart[k].name}({cart[k].size}/{cart[k].varient})</div>
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
      <button className="flex text-white bg-green-400 border-0 py-2 pl-3 pr-4 my-5 focus:outline-none hover:bg-green-800 rounded">
        <RiShoppingBagFill className="mx-1 text-lg" />
        <div>Pay ₹{subTotal}</div>
      </button>
    </div>
  );
};

export default Checkout;
