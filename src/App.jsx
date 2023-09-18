import "./App.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import ProtectedAuth from "./components/ProtectedAuth.jsx"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PasswordReset from "./pages/PasswordReset"
import ResetPassword from "./pages/ResetPassword"
import Unauthorized from "./pages/Unauthorized"
import Page404 from "./pages/Page404"
import AdminDashboard from "./pages/AdminDashboard"
import TeacherDashboard from "./pages/TeacherDashboard"
import StudentDashboard from "./pages/StudentDashboard"
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* public routes */}
        {/* <Route element={<ProtectedAuth routeProtected={false} />}> */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget_password" element={<PasswordReset />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        {/* </Route> */}

        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />

        {/* catch all */}
        <Route path="*" element={<Page404 />} />
        {/* </Route> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default App
