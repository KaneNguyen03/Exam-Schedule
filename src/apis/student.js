import apiInstance from "./config";

const getAllStudents = async() => {
 try {
    const data  = await apiInstance.get("api/StudentList")
      return data
 } catch (error) {
    throw new Error("Error geting students")
 }
}

const studentApi = {
    getAllStudents
  }
  
  export default studentApi