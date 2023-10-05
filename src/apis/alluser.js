import apiInstance from "./config";

const getAllusers = async(data) => {
   const url = "?" + new URLSearchParams(data).toString()
 try {
    const data  = await apiInstance.get(`api/Auth/AllUser${url}`)
      return data
 } catch (error) {
    throw new Error("Error geting all user")
 }
}
const updateAlluser = async (data) => {
   try {
     const response = await apiInstance.put(
       `api/Auth/AllUser/${data.username}`,
       {
        username: data.username,
        roleId: data.roleId,
        passwordHash: data.passwordHash,
        passwordSalt: data.passwordSalt,
        refreshToken: data.refreshToken,
        tokenCreated: data.tokenCreated,
        tokenExpires: data.tokenExpires,
        role : data?.role,
        
       }
     )
     return response
   } catch (error) {
     throw new Error("Error update user")
   }
 }
 
 const deleteAlluser = async (data) => {
   try {
     const response = await apiInstance.put(
       `api/Auth/AllUser/${data.username}`,
       {
        ...data,
        username: data.username,
        status: data.status
       }
     )
     return response
   } catch (error) {
     throw new Error("Error delete user")
   }
 }
 
 const createAlluser = async (data) => {
   try {
     const response = await apiInstance.post(`api/api/Auth/AllUser`, {
        username: data.username,
        roleId: data.roleId,
        passwordHash: data.passwordHash,
        passwordSalt: data.passwordSalt,
        refreshToken: data.refreshToken,
        tokenCreated: data.tokenCreated,
        tokenExpires: data.tokenExpires,
        role : data?.role,
        status: "Active"
     })
     return response
   } catch (error) {
     throw new Error("Error create user")
   }
 }

const alluserApi = {
    getAllusers,
    updateAlluser,
    deleteAlluser,
    createAlluser,
  }
  
  export default alluserApi