import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PasswordReset from "./pages/PasswordReset";
import ResetPassword from "./pages/ResetPassword";
import Unauthorized from "./pages/Unauthorized";
import Page404 from "./pages/Page404";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
function App() {
  return (
    <div className="App">
      {/* public routes */}
      {/* <Routes element={<ProtectedAuth routeProtected={false} />}> */}
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget_password" element={<PasswordReset />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
     
     
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />

        {/* catch all */}
        <Route path="*" element={<Page404 />} />
        {/* </Route> */}
      </Routes>

      {/* we want to protect these routes */}
      {/* <Route element={<ProtectedAuth allowedRoles={[...makeRoles([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])]} />}>
        <Route path="/" element={<HomeManagement />}>
          <Route path="/profile" element={<ProfileMember />} />
          <Route
            index
            element={
              makeRoles([5, 6, 7, 8, 9, 10, 11, 12]).includes(user?.user?.role) ? (
                <ListBuilding />
              ) : (
                <CompanyManagement />
              )
            }
          />
        </Route>
      </Route> */}
      <Footer />
    </div>
  );
}

export default App;
