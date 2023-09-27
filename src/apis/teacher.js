import apiInstance from "./config";

const getAllTeachers = async() => {
 try {
    const data  = await apiInstance.get("api/Proctoring")
      return data
 } catch (error) {
    throw new Error("Error geting teacher")
 }
}

const teacherApi = {
    getAllTeachers
  }
  
  export default teacherApi