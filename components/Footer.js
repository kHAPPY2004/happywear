import React from "react";
import Image from "next/image";
import Link from "next/link";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/fontawesome.min.css"
/>;

const Footer = () => {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white items-center w-full">
          <footer className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
              <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                <Link href={"/"}>
                  <Image
                    src="/logo.webp"
                    alt=""
                    height={500}
                    width={500}
                    className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
                  />
                </Link>
                <p className="mt-2 px-4 text-sm text-gray-500">
                  Air plant banjo lyft occupy retro adaptogen indego
                </p>
              </div>
              <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                  <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                    CATEGORIES
                  </h2>
                  <nav className="list-none mb-10">
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        First Link
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        Second Link
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        Third Link
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        Fourth Link
                      </a>
                    </li>
                  </nav>
                </div>
                <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                  <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                    CATEGORIES
                  </h2>
                  <nav className="list-none mb-10">
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        First Link
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        Second Link
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        Third Link
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        Fourth Link
                      </a>
                    </li>
                  </nav>
                </div>
                <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                  <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                    CATEGORIES
                  </h2>
                  <nav className="list-none mb-10">
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        First Link
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        Second Link
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        Third Link
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        Fourth Link
                      </a>
                    </li>
                  </nav>
                </div>
                <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                  <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                    CATEGORIES
                  </h2>
                  <nav className="list-none mb-10">
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        First Link
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        Second Link
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        Third Link
                      </a>
                    </li>
                    <li>
                      <a className="text-gray-600 hover:text-gray-800">
                        Fourth Link
                      </a>
                    </li>
                  </nav>
                </div>
              </div>
            </div>
            <hr className="mt-2 md:overflow-hidden" />
            <div className="bg-gray-100 flex flex-wrap flex-row sm:flex-col">
              <div className="flex flex-col justify-center items-center mt-3 space-y-2 md:mx-[50px] md:flex-row md:justify-between">
                <p className="text-md font-semibold text-gray-800 md:text-lg md:text-gray-500/90">
                  {" "}
                  Join Our Newsletter{" "}
                </p>
                <div className="md:text-lg">
                  {" "}
                  <input
                    className="bg-gray-200/70 border drop-shadow-sm shadow-gray-700 rounded-md placeholder-slate-400 px-2 py-1 focus:outline-none focus:border-cyan-600"
                    type="email"
                    placeholder="E-mail Address"
                  />{" "}
                  <button className="p-1 m-1 rounded-md text-white bg-blue-500 hover:text-blue-500 hover:bg-white hover:font-semibold hover:trandform ease-in-out duration-300">
                    Subscribe{" "}
                  </button>{" "}
                </div>
                <div className="text-center text-lg md:space-x-1">
                  {" "}
                  <a
                    className="w-9 h-10 pt-1 m-2 md:ml-2 md:mr-0 inline-block border-1 rounded-lg text-white bg-blue-500 hover:bg-white hover:text-blue-500"
                    href="https://twitter.com/ASassociates041"
                    target={"_blank"}
                  >
                    <li className="fa fa-twitter"></li>
                  </a>{" "}
                  <a
                    className="w-9 h-10 pt-1 m-2 inline-block border-1 rounded-lg text-white bg-orange-500 hover:bg-white hover:text-orange-500"
                    href="https://www.instagram.com/asassociates0412/"
                    target={"_blank"}
                  >
                    <li className="fa fa-lg fa-instagram"></li>
                  </a>{" "}
                  <a
                    className="w-9 h-10 pt-1 m-2 inline-block border-1 rounded-lg text-white bg-red-500 hover:bg-white hover:text-red-500"
                    href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
                    target={"_blank"}
                  >
                    <li className="fa fa-linkedin"></li>
                  </a>{" "}
                  <a
                    className="w-9 h-10 pt-[5px] m-2 inline-block border-1 rounded-lg text-white bg-purple-500 hover:bg-white hover:text-purple-500"
                    href="https://t.me/happykamboj001"
                    target={"_blank"}
                  >
                    <li className="fa fa-lg fa-telegram"></li>
                  </a>{" "}
                  <a
                    className="w-9 h-10 pt-[5px] m-2 inline-block border-1 rounded-lg text-white bg-cyan-500 hover:bg-white hover:text-cyan-500"
                    href="https://www.facebook.com/people/AS-Associates/100088730226561/?is_tour_completed=true"
                    target={"_blank"}
                  >
                    <li className="fa fa-facebook"></li>
                  </a>{" "}
                </div>
              </div>
              <div className="px-5 py-4 flex justify-end flex-col sm:flex-row">
                <p className="text-gray-500 text-sm text-center sm:text-left">
                  Copyright © 2022 All right reserved by —
                  <a
                    href="/"
                    target="_blank"
                    className="text-yellow-400 font-extrabold px-2 text-base cursor-pointer"
                  >
                    Codeswear.com
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://use.fontawesome.com/03f8a0ebd4.js"></script>{" "}
    </>
  );
};

export default Footer;
