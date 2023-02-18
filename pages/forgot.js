import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [npassword, setNPassword] = useState("");
  const [confirmnpassword, setConfirmNPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [disabledd, setDisabledd] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);
  useEffect(() => {
    if (email.length > 8) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email]);
  useEffect(() => {
    if (npassword > 3 && confirmnpassword > 3) {
      setDisabledd(false);
    } else {
      setDisabledd(true);
    }
  }, [npassword, confirmnpassword]);

  const resetPassword = async () => {
    if (npassword == confirmnpassword) {
      let data = {
        npassword,
        sendMail: false,
      };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("zzzzz:", a);
      let res = await a.json();
      if (res.success) {
        console.log("Password has been changed... ");
      } else {
        console.log("Unknown error has been occured....");
      }
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
    setNPassword("");
    setConfirmNPassword("");
  };
  const getEmail = async () => {
    let data = {
      email,
      sendMail: true,
    };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("zzzzz:", a);
    let res = await a.json();
    if (res.success) {
      console.log("Email has been send... ");
    } else {
      console.log("Unknown error has been occured....");
    }
  };

  const handleChange = async (e) => {
    if (e.target.name == "npassword") {
      setNPassword(e.target.value);
    }
    if (e.target.name == "confirmnpassword") {
      setConfirmNPassword(e.target.value);
    }
    if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  };

  return (
    <section className="text-gray-600">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-10 h-8 mr-2"
            src="/codeswearcircle.png"
            alt="logo"
          />
          codeswear.com
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            {!router.query.token && (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={handleChange}
                    value={email}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <button
                  disabled={disabled}
                  onClick={getEmail}
                  type="submit"
                  className="w-full disabled:bg-gray-400 text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Get E-Mail
                </button>
              </>
            )}
            {router.query.token && (
              <>
                <div>
                  <label
                    htmlFor="npassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    value={npassword}
                    onChange={handleChange}
                    type="password"
                    name="npassword"
                    id="npassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmnpassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm New Password
                  </label>
                  <input
                    onChange={handleChange}
                    value={confirmnpassword}
                    type="password"
                    name="confirmnpassword"
                    id="confirmnpassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                {npassword !== confirmnpassword && (
                  <span className="text-red-600 text-sm">
                    Password don't match
                  </span>
                )}
                {npassword && npassword === confirmnpassword && (
                  <span className="text-green-600 text-sm">
                    Password matched
                  </span>
                )}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="newsletter"
                      aria-describedby="newsletter"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-gray-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="newsletter"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        className="font-medium text-gray-600 hover:underline dark:text-gray-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  onClick={resetPassword}
                  disabled={disabledd}
                  type="submit"
                  className="w-full text-white  disabled:bg-gray-400 bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  Reset password
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Forgot;
