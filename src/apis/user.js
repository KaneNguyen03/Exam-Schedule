// import { TOKEN_KEY } from "./config"
import apiInstance from "./config"

const signIn = async (email, password) => {
  try {
    const { data } = await apiInstance.post("api/Accounts/SignIn", {
      email,
      password,
    })
    return data
  } catch (error) {
    throw new Error("Invalid email or password")
  }
}

const signUp = async (email, username, password) => {
  const { data } = await apiInstance.post("api/Accounts/SignUp", {
    email,
    username,
    password,
  })
  return data
}

const userApi = {
  signIn,
  signUp,
}

export default userApi
