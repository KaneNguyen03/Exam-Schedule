import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom"
// hocs
import useAuth from "../hooks/useAuth"
// import { makeRoles } from '../utils/common'

const ProtectedAuth = ({ allowedRoles, routeProtected = true }) => {
  const { user } = useAuth()
  const location = useLocation()
  // const navigate = useNavigate()
  // useEffect(() => {
  //   if (location.pathname === '/') {
  //     if (![...makeRoles([1, 2])].includes(user?.user?.role)) {
  //       navigate('/inspections')
  //     }
  //   }
  //   if (location.pathname.includes('/settings') && !location.pathname.includes('settings/repair-recommended')) {
  //     if ([...makeRoles([6, 7, 10])].includes(user?.user?.role)) {
  //       navigate('/settings/reasons-for-defect')
  //     }
  //   }
  // }, [location.pathname, user, navigate])

  // const handleRedirectByRole = (role) => {
  //   if (role === "Admin") {
  //     return <Navigate to="/admin" state={{ from: location }} replace />;
  //   } else if (role === "User") {
  //     return <Navigate to="/" state={{ from: location }} replace />;
  //   }
  // };

  if (!routeProtected) {
    return !user ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    )
  }
  // if (allowedRoles.includes(user?.user?.role)) {
  //   return <Outlet />
  // } else if (user?.user?.role && !allowedRoles.includes(user?.user?.role)) {
  //   return <Navigate to="/" state={{ from: location }} replace />
  // } else {
  //   return <Navigate to="/login" state={{ from: location }} replace />
  // }
}

export default ProtectedAuth
