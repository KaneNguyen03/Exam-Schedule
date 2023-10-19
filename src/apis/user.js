import { TOKEN_KEY } from "./config"
import apiInstance from "./config"
import authApi from "./auth"

const signIn = async (username, password) => {
  try {
    const { data } = await apiInstance.post("api/Auth/login", {
      username,
      password,
    })
    return data
  } catch (error) {
    throw new Error("Invalid email or password")
  }
}

const signUp = async (email, username, password) => {
  const { data } = await apiInstance.post("api/Auth/register", {
    email,
    username,
    password,
  })
  return data
}

const getCurrentUser = async (token = localStorage.getItem(TOKEN_KEY)) => {
  try {
    const { data } = await apiInstance.get("api/Auth")
    return data
  } catch (error) {
    console.log(error)
  }
}

const logOutApp = async () => {
  await localStorage.clear()
  await window.location.reload()
}

const userApi = {
  signIn,
  signUp,
  getCurrentUser,
  logOutApp,
}

export default userApi
