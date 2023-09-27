import apiInstance from "./config"


const logOut = async (payload) => {
  try {
    const resp = await apiInstance.get(`user/logout/${payload}`)
    return resp.data
  } catch (error) {
    console.log(error)
    return { error: true }
  }
}

const refreshToken = async (user_id, refresh_token_id, refresh_token) => {
  try {
    const dataRefresh = {
      user_id: Number(user_id),
      refresh_token_id: Number(refresh_token_id),
      refresh_token,
    }
    const resp = await apiInstance.post("user/refresh", dataRefresh)
    return resp.data
  } catch (e) {
    console.log("Error", e)
  }
}
const changePassword = async (data) => {
  try {
    const resp = await apiInstance.patch("user/change-password", data)
    return resp
  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.message)
    } else {
      throw new Error("Error when getting list of buildings")
    }
  }
}

const authApi = {
  logOut,
  changePassword,
  refreshToken,
}

export default authApi
