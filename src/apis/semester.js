import apiInstance from "./config";

const getAllSemesters = async() => {
 try {
    const data  = await apiInstance.get("api/Semester")
      return data
 } catch (error) {
    throw new Error("Error geting semester")
 }
}

const semesterApi = {
    getAllSemesters
  }
  
  export default semesterApi