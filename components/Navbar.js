import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { BsCartCheckFill } from "react-icons/bs";
import { FaRegSurprise } from "react-icons/fa";
import {
  AiOutlineShoppingCart,
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { useRef } from "react";

const Navbar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (!ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const ref = useRef();
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-2xl mb-1 sticky top-0 bg-gray-400 z-10">
      <div className="logo mx-5">
        <Link href={"/"}>
          <Image
            src="/logo.webp"
            alt="asd"
            width={"300"}
            height={"300"}
            priority
          ></Image>
        </Link>
      </div>
      <div className="nav">
        <ul className="flex space-x-14 font-bold md:text-md">
          <Link href={"/tshirts"}>
            <li>Tshirts</li>
          </Link>
          <Link href={"/hoodies"}>
            <li>Hoodies</li>
          </Link>
          <Link href={"/stickers"}>
            <li>Stickers</li>
          </Link>
          <Link href={"/mugs"}>
            <li>Mugs</li>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-4 top-4 cursor-pointer flex">
        <Link href={'/login'}><MdAccountCircle className=" text-xl md:text-3xl mx-3" /></Link>
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className=" text-xl md:text-3xl"
        />
      </div>
      {/* Cart is start */}
      <div
        ref={ref}
        className={`sideCart px-2 absolute top-0 right-0 bg-slate-400 w-full h-fit md:w-3/5 lg:w-2/5 transform transition-transform ${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold my-5 mx-2">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-2 right-4 cursor-pointer"
        >
          <IoCloseSharp className="text-2xl font-extrabold mt-2" />
        </span>
        <hr />
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
          })}
        </ol>
        {/* <hr /> */}
        <div className="subTotal">Subtotal : ₹{subTotal}</div>
        <div className="flex space-x-5">
          <Link href={"/checkout"}>
            <button className="flex text-white bg-green-900 border-0 py-2 pl-3 pr-4 my-5 focus:outline-none hover:bg-green-800 rounded">
              <BsCartCheckFill className="mx-1 text-lg" />
              checkout
            </button>
          </Link>
          <button
            onClick={clearCart}
            className="flex text-white bg-green-900 border-0 py-2 px-4 my-5 focus:outline-none hover:bg-green-800  rounded"
          >
            clear cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;