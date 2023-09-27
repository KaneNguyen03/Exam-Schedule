import React, { useEffect } from "react"
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom"
// hocs
import useAuth from "../hooks/useAuth"
import { makeRoles } from "../utils/common"

const ProtectedAuth = ({ allowedRoles, routeProtected = true }) => {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  if (!routeProtected) {
    return !user ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    )
  }
  if (allowedRoles.includes(user?.roleId)) {
    return <Outlet />
  } else if (user?.roleId && !allowedRoles.includes(user?.roleId)) {
    return <Navigate to="/" state={{ from: location }} replace />
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}

export default ProtectedAuth
