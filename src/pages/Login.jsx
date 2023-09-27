// hooks
import useAuth from "../hooks/useAuth"

import { useState } from "react"

import userApi from "../apis/user"

const Login = () => {
  const { loading, user } = useAuth()
  console.log("🚀 Kha ne ~ file: Login.jsx:10 ~ useAuth:", useAuth())
  console.log("🚀 Kha ne ~ file: Login.jsx:10 ~ user:", user)
  console.log("🚀 Kha ne ~ file: Login.jsx:10 ~ loading:", loading)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [inputError, setInputError] = useState({
    email: false,
    password: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    userApi.signIn(email.trim().toLowerCase(), password.trim())
  }
  const onHandleKeydown = (e) => {
    if (e.which === 32 && e.target.selectionStart === 0) {
      return false
    }
  }

  return (
    <div>
      {/* <img src={bg1} className="w-full "></img> */}
      <div className=" mt-40 mb-40 mr-64 ml-64  flex justify-center items-center flex-col text-center ">
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

        <form onSubmit={handleSubmit} className="px-10 pt-4 pb-4 mb-4">
          <p className="my-5 text-3xl font-bold">Sign in to your account</p>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
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
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
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
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              Sign In
            </button>

            <a
              className="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
              href="/forget_password"
            >
              Forgot Password?
            </a>
          </div>
        </form>

        <div className="px-6 sm:px-0 max-w-sm mt-3">
          <button
            type="button"
            className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-light/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign up with Google<div></div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
