import React from "react";
import Image from "next/image";
import Link from "next/link";
import Product from "@/models/Product";
import mongoose from "mongoose";
import { ImSad } from "react-icons/im";

const Stickers = ({ products }) => {
  // console.log(products)
  return (
    <section className="text-gray-600 body-font overflow-clip">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-6">
           {Object.keys(products).length===0 && <div className="text-lg md:text-2xl lg:text-3xl flex text-center mx-auto justify-center py-8 md:pt-14 px-4 md:h-60 font-bold text-red-500">
              Sorry <ImSad className="mx-2 mt-1 " />All Stickers are currently out of stock ...
            </div>} 
          {Object.keys(products).map((item) => {
            return (
              <Link
                key={products[item]._id}
                href={`/product/${products[item].slug}`}
                legacyBehavior
              >
                <div className="lg:w-1/4 md:w-1/3 w-1/2 p-4 hover:shadow-slate-400 hover:shadow-xl shadow-sm cursor-pointer">
                  <a className="block relative rounded overflow-hidden bg-white">
                    <Image
                      alt="ecommerce"
                      className="object-cover mx-auto object-top h-60 md:h-96 block"
                      src={products[item].img}
                      width={300}
                      height={400}
                    />
                  </a>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {products[item].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">₹{products[item].price}</p>
                    <div className="mt-1">
                      {products[item].size.includes('S') && <span className="border border-gray-400 px-1 mx-1">S</span>}
                      {products[item].size.includes('M') && <span className="border border-gray-400 px-1 mx-1">M</span>}
                      {products[item].size.includes('L') && <span className="border border-gray-400 px-1 mx-1">L</span>}
                      {products[item].size.includes('XL') && <span className="border border-gray-400 px-1 mx-1">XL</span>}
                      {products[item].size.includes('XXL') && <span className="border border-gray-400 px-1 mx-1">XXL</span>}
                      </div>
                    <div className="mt-1">
                      {products[item].color.includes('Red') && <button className="border-2 border-gray-300 bg-red-700 rounded-full lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3 focus:outline-none"></button>}
                      {products[item].color.includes('Blue') && <button className="border-2 border-gray-300 bg-blue-700 rounded-full lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3 focus:outline-none"></button>}
                      {products[item].color.includes('Black') && <button className="border-2 border-gray-300 bg-black rounded-full lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3 focus:outline-none"></button>}
                      {products[item].color.includes('Pink') && <button className="border-2 border-gray-300 bg-pink-700 rounded-full lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3 focus:outline-none"></button>}
                      {products[item].color.includes('Green') && <button className="border-2 border-green-300 bg-red-700 rounded-full lg:w-5 lg:h-5 md:w-4 md:h-4 w-3 h-3 focus:outline-none"></button>}
                      </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URL);
  }
  let products = await Product.find({category:'Stickers'});
  let sticker = {};
  for (let item of products) {
    if (item.title in sticker) {
      if (
        !sticker[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        sticker[item.title].color.push(item.color);
      }
      if (
        !sticker[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        sticker[item.title].size.push(item.size);
      }
    } else {
      sticker[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        sticker[item.title].color = [item.color];
        sticker[item.title].size = [item.size];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(sticker)) }, // will be passed to the page component as props
  };
}
export default Stickers;
