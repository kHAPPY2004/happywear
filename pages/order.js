import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import Order from "@/models/Order";
import mongoose from "mongoose";
import { useEffect } from "react";

const MyOrder = ({ order, clearCart }) => {
  const router = useRouter();
  const [date, setDate] = useState();
  useEffect(() => {
    const d = new Date(order.createdAt);
    setDate(d);
    if (router.query.clearCart == 1) {
      clearCart();
    }
  }, []);

  console.log(order);
  // console.log(order.products);
  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-3/5 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                codeswear.com
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                Order Id : #{order.orderId}
              </h1>
              <p className="leading-relaxed ">
                Your order has been successfully placed.
              </p>
              <p className="leading-relaxed ">
                Order placed on : {date && date.toLocaleString()}
              </p>
              <p className=" leading-relaxed mb-4">
                Your payment status is : {order.Status}
              </p>
              <div className="flex text-center justify-center w-full border-b-2 py-2 border-gray-700 font-bold">
                <a className="flex border-gray-300 w-3/5 text-lg">
                  Item Description
                </a>
                <a className="flex border-gray-300 w-1/5 text-center justify-center text-lg">
                  Quantity
                </a>
                <a className="flex border-gray-300 w-1/5 text-center justify-center text-lg">
                  Item Total
                </a>
              </div>
              {Object.keys(order.products).map((key) => {
                return (
                  <div
                    key={key}
                    className="flex w-full border-t  border-gray-700 py-3"
                  >
                    <span className="text-gray-500 w-3/5 text-start justify-center">
                      {order.products[key].name}({order.products[key].size}/
                      {order.products[key].varient})
                    </span>
                    <span className="mx-auto w-1/5  text-center justify-center text-gray-900">
                      {order.products[key].qty}
                    </span>
                    <span className="mx-auto w-1/5  text-center justify-center text-gray-900">
                      ₹{order.products[key].price} X {order.products[key].qty} =
                      ₹{order.products[key].price * order.products[key].qty}
                    </span>
                  </div>
                );
              })}

              <div className="flex pt-5 border-t border-black">
                <span className="title-font font-medium text-2xl text-gray-900">
                  SubTotal: ₹{order.amount}
                </span>
                <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                  Track Order
                </button>
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-2/5 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="https://dummyimage.com/400x400"
            />
          </div>
        </div>
      </section>
    </>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }
  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    }, // will be passed to the page component as props
  };
}
export default MyOrder;
