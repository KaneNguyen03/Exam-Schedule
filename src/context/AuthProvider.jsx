import { createContext, useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
// import { toast } from "react-toastify"

import {
  // REFRESH_TOKEN_KEY,
  TOKEN_KEY,
  // USER_ID,
  REFRESH_TOKEN_ID,
} from "../apis/config"
import userApi from "../apis/user"
import authApi from "../apis/auth"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [signInSuccess, setSignInSuccess] = useState(false)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)
  const location = useLocation()

  useEffect(() => {
    if (error) setError(null)
  }, [location.pathname])

  const getCurrentUser = async () => {
    const data = await userApi.getCurrentUser()
    setUser(data)
    setLoadingInitial(false)
  }

  const signIn = async (email, password) => {
    try {
      setLoading(true)
      const data = await userApi.signIn(email, password)
      localStorage.setItem(TOKEN_KEY, data.token)
      // localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token)
      // localStorage.setItem(USER_ID, data.user.user_id)
      // localStorage.setItem(REFRESH_TOKEN_ID, data.user.refresh_token_id)
      setSignInSuccess(true)
      setLoading(false)
    } catch (error) {
      // toast.error(error.message, {
      //   theme: "dark",
      // })
      setError(error)
      setLoading(false)
    }
  }

  const logout = async () => {
    const resp = await authApi.logOut(localStorage.getItem(REFRESH_TOKEN_ID))
    if (resp.msg === "logout") {
      localStorage.clear()
      window.location.reload()
    }
  }

  useEffect(() => {
    // setAuthHeader();
    getCurrentUser()
  }, [signInSuccess])

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      loadingInitial,
      error,
      signIn,
      // signUp,
      logout,
    }),
    [user, loading, loadingInitial, error]
  )
  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default AuthContext
