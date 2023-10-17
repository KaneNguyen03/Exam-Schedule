// hooks
import useAuth from "../hooks/useAuth"

import { useState } from "react"
import Footer from "../components/Layout/Footer"
import Header from "../components/Layout/Header"

import LoadingAnimated from "../assets/loading_new.gif"

const Login = () => {
  const { loading, signIn } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [inputError, setInputError] = useState({
    email: false,
    password: false,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await signIn(email.trim().toLowerCase(), password.trim())
  }

  const onHandleKeydown = (e) => {
    if (e.which === 32 && e.target.selectionStart === 0) {
      return false
    }
  }

  return (
    <div>
      <Header />
      {/* <img src={bg1} className="w-full "></img> */}
      <div className="my-5 md:my-40 flex justify-center items-center flex-col text-center ">
        {loading && (
          <div className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-20 z-[1000]">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%]">
                <img
                  src={LoadingAnimated}
                  className="w-40 h-40"
                  alt="Loading"
                />
              </div>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="px-10 pt-4 pb-4 mb-4 box-border border-4 shadow-2xl shadow-slate-600 rounded-3xl md:w-96"
        >
          <p className="my-5 text-3xl font-bold">Sign in </p>
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
          <div className="mb-8">
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
          <div className=" items-center justify-between">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Login
