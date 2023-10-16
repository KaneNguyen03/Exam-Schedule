import React from "react";
import { ToastContainer } from "react-toastify";

const Layout = (props) => {
  return (
    <div className="bg-white">

      {props?.children}
    </div>
  );
};

export default Layout;
