const Login = () => {
  return (
    <div className="flex justify-center items-center flex-col text-center ">
      <h1 className="text-lg  transition  ">Login</h1>
      <form className="">
        <div className="relative text-start ">
          <label className="">Email Adress</label>
          <input
            type="email"
            className="block w-full px-4 py-2 text-sm rounded-xl"
          ></input>

          <label className="">Password</label>
          <input
            type="password"
            className="block w-full px-4 py-2 text-sm rounded-xl"
          />
        </div>

        <button type="button" className="">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
