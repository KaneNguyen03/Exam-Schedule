
// hooks
import useAuth from "../hooks/useAuth";

import { useState } from "react";

import userApi from "../apis/user";

const Register = () => {
  const { loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState({
    email: false,
    password: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await userApi.signIn(
      email.trim().toLowerCase(),
      password.trim()
    );
    console.log("🚀 Kha ne ~ file: Login.jsx:20 ~ response:", response);
  };
  const onHandleKeydown = (e) => {
    if (e.which === 32 && e.target.selectionStart === 0) {
      return false;
    }
  };

  return (
    <div>
      {/* <img src={bg1} className="w-full "></img> */}
      <div className="my-5 md:my-40 flex justify-center items-center flex-col text-center ">
        {/* <form className="">
          <div className="relative text-start bg-lightgray ">
            <label className="">Email Address</label>
            <input
              type="email"
              className="block w-full px-4 py-2 text-sm rounded-xl border border-gray "
              placeholder=" @gmail.com"
            ></input>

            <label className="">Password</label>
            <input
              type="password"
              className="block w-full px-4 py-2 text-sm rounded-xl border border-gray"
            />
          </div>
          <div className="ml-32 text-sm hover:dark:text-blue-700">
            <a href="../forget_password">Forget Password</a>
          </div>

          <button
            type="button"
            className="bg-slate-300 rounded-2xl w-24 h-8 mt-7 "
          >
            <a href="./dashboard">Login </a>
          </button>
        </form> */}

        <form
          onSubmit={handleSubmit}
          className="px-10 pt-4 pb-4 mb-4 box-border border-4 shadow-2xl shadow-slate-600 rounded-3xl md:w-96"
        >
          <p className="my-5 text-3xl font-bold">Register </p>
          <div className="mb-4">
            <label
              className="flex mb-2 text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              User name
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={email}
              onChange={(e) =>
                setEmail(e.currentTarget.value.trimStart().toLowerCase())
              }
              onKeyDown={(e) => onHandleKeydown(e)}
            />
            {inputError.email && (
              <p className="text-xs italic text-red-500">
                Please input a valid username
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="flex mb-2 text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="Email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.currentTarget.value.trimStart().toLowerCase())
              }
              onKeyDown={(e) => onHandleKeydown(e)}
            />
            {inputError.email && (
              <p className="text-xs italic text-red-500">
                Please input a valid username
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="flex mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center w-full px-3 py-2 bg-white leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="h-full w-full border-0 outline-none"
                name="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
            {inputError.email && (
              <p className="text-xs italic text-red-500">
                Please input a valid password
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="flex mb-2 text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <div className="flex items-center w-full px-3 py-2 bg-white leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="h-full w-full border-0 outline-none"
                name="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>
            {inputError.email && (
              <p className="text-xs italic text-red-500">
                Please input a valid password
              </p>
            )}
          </div>
          <div className=" items-center">
            <button
              className="px-3 py-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              Sign Up
            </button>

           
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Register;
