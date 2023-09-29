import axios from "axios"

export const TOKEN_KEY = "examskd_token"
export const REFRESH_TOKEN_KEY = "examskd_refresh_token"
export const USER_ID = "user_id"
export const REFRESH_TOKEN_ID = "refresh_token_id"

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SECRET,
})

apiInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("examskd_token")
    if (token) {
      config.headers["Authorization"] = ` bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)



// apiInstance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async function (error) {
//     const originalRequest = error.config
//     if (error.response.status !== 401) {
//       return Promise.reject(error)
//     }
//     if (
//       error.response.status === 401 &&
//       error.response?.data?.message === "jwt expired"
//     ) {
//       const user_id = localStorage.getItem(USER_ID)
//       const refresh_token_id = localStorage.getItem(REFRESH_TOKEN_ID)
//       const refresh_token = localStorage.getItem(REFRESH_TOKEN_KEY)

//       if (!user_id || !refresh_token_id || !refresh_token) {
//         logOutApp()
//       } else {
//         const resp = await authApi.refreshToken(
//           user_id,
//           refresh_token_id,
//           refresh_token
//         )
//         if (!resp.token) {
//           logOutApp()
//           return false
//         }
//         const access_token = resp.token
//         localStorage.setItem(TOKEN_KEY, access_token)
//         apiInstance.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${access_token}`
//         return apiInstance(originalRequest)
//       }
//     }
//     return Promise.reject(error)
//   }
// )

export default apiInstance
