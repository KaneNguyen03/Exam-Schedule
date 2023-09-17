
const Login = () => {
  return (
    <div>
    {/* <img src={bg1} className="w-full "></img> */}
      <div className=" mt-40 mb-40 mr-64 ml-64  flex justify-center items-center flex-col text-center ">
        <h1 className=" text-lg  transition  ">Login</h1>
        <form className="">
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
  );
};

export default Login;
