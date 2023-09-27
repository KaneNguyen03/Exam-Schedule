import apiInstance from "./config";

const getAllMajors = async() => {
 try {
    const data  = await apiInstance.get("api/Major")
      return data
 } catch (error) {
    throw new Error("Error geting major")
 }
}

const majorApi = {
    getAllMajors
  }
  
  export default majorApi