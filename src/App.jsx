import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PasswordReset } from "./pages/PasswordReset";
import { ResetPassword } from "./pages/ResetPassword";
import { Unauthorized } from "./pages/Unauthorized";
// import { Page404 } from "./pages/Page404";
function App() {
  return (
    <div className="App">
      {/* public routes */}
      {/* <Routes element={<ProtectedAuth routeProtected={false} />}> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/forget_password" element={<PasswordReset />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} /> */}
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

      {/* catch all */}
      {/* <Route path="*" element={<Page404 />} /> */}
      {/* </Route> */}
    </div>
  );
}

export default App;
