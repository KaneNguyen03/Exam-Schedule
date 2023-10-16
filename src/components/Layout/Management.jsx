import { Outlet } from "react-router-dom"
import Layout from "./Layout"
import { ToastContainer } from "react-toastify"

const Management = () => {
  return (
    <div className=" bg-white">
      <Layout>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        <Outlet />
      </Layout>
    </div>
  )
}

export default Management
