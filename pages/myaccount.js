import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [pin, setPin] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [npassword, setNPassword] = useState("");
  const [confirmnpassword, setConfirmNPassword] = useState("");
  const [user, setUser] = useState({ value: null });
  const [disabled, setDisabled] = useState(true);
  const handleChange = async (e) => {
    console.log("handle");
    console.log(user, email);
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "tel") {
      setTel(e.target.value);
    } else if (e.target.name == "pin") {
      setPin(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "npassword") {
      setNPassword(e.target.value);
    } else if (e.target.name == "confirmnpassword") {
      setConfirmNPassword(e.target.value);
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
  const router = useRouter();
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
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"));
    if (myuser && myuser.token) {
      setUser(myuser);
      setEmail(myuser.email);
      fetchData(myuser.token);
    }
    if (!myuser) {
      router.push("/");
    }
  }, []);

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
  };
  const handleUserSubmit = async () => {
    let data = { token: user.token, address, name, pin, tel };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("zzzzz", a);
    let res = await a.json();
    console.log(res);
    if (res.success) {
      toast.success("Sucessfully Updated...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handlePasswordSubmit = async () => {
    let res;
    if (npassword == confirmnpassword) {
      let data = { token: user.token, password, npassword, confirmnpassword };
      let a = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("zzzzz", a);
      res = await a.json();
      console.log("reso:-", res);
    } else {
      res = { success: false };
    }
    console.log("gfds:-", res.success);
    if (res.success) {
      toast.success("Sucessfully Updated Password...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("Please enter correct Password...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setPassword("");
    setNPassword("");
    setConfirmNPassword("");
  };
  return (
    <>
      <section className="container m-auto">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <h1 className="flex justify-center items-center font-bold text-2xl my-5 md:mt-10">
          Update Your Account
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
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email(Can't be updated..)
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
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-600"
            >
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
        <button
          disabled={disabled}
          onClick={handleUserSubmit}
          className="flex text-white disabled:bg-green-400 bg-green-700 border-0 py-2 pl-3 pr-4 mt-3 mb-6 mx-2 focus:outline-none hover:bg-green-800 rounded"
        >
          submit
        </button>
        <h2 className="font-bold text-xl">2. Update password </h2>
        <div className="mx-auto flex my-2">
          <div className="px-2 w-1/3">
            <div className="mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Old Password
              </label>
              <input
                onChange={handleChange}
                value={password}
                type="password"
                id="password"
                name="password"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/3">
            <div className="mb-4">
              <label
                htmlFor="npassword"
                className="leading-7 text-sm text-gray-600"
              >
                New Password
              </label>
              <input
                onChange={handleChange}
                value={npassword}
                type="password"
                id="npassword"
                name="npassword"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/3">
            <div className="mb-4">
              <label
                htmlFor="confirmnpassword"
                className="leading-7 text-sm text-gray-600"
              >
                Confirm New Password
              </label>
              <input
                onChange={handleChange}
                value={confirmnpassword}
                type="password"
                id="confirmnpassword"
                name="confirmnpassword"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <button
          disabled={disabled}
          onClick={handlePasswordSubmit}
          className="flex text-white disabled:bg-green-400 bg-green-700 border-0 py-2 pl-3 pr-4 mb-6 mx-2 focus:outline-none hover:bg-green-800 rounded"
        >
          submit
        </button>
      </section>
    </>
  );
};

export default MyAccount;
