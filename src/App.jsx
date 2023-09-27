import "./App.css";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Unauthorized from "./pages/Unauthorized";
import Page404 from "./pages/Page404";
import AdminDashboard from "./pages/Admin";
import TeacherDashboard from "./pages/Teacher";
import StudentDashboard from "./pages/Student";
import Room from "./pages/Room";
import CourseDashboard from "./pages/Course";
import ExamscheduleDashboard from "./pages/ExamSchedule";
import MajorDashboard from "./pages/Major";
import SemesterDashboard from "./pages/Semester";
import ExamslotDashboard from "./pages/ExamSlot";
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
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* </Route> */}
        
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/room" element={<Room />} />
        <Route path="/proctoring" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/course" element={<CourseDashboard />} />
        <Route path="/examschedule" element={<ExamscheduleDashboard />} />
        <Route path="/major" element={<MajorDashboard />} />
        <Route path="/semester" element={<SemesterDashboard />} />
        <Route path="/examslot" element={<ExamslotDashboard />} />

        {/* catch all */}
        <Route path="*" element={<Page404/>}/>
        {/* </Route> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
