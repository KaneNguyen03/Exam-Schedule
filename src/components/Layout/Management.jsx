import { Outlet } from "react-router-dom"
import Layout from "./Layout"

const Management = () => {
  return (
    <div className="min-h-screen bg-white">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  )
}

export default Management
