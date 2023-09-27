import apiInstance from "./config";

const getAllCourses = async() => {
 try {
    const data  = await apiInstance.get("api/Course")
      return data
 } catch (error) {
    throw new Error("Error geting course")
 }
}

const courseApi = {
    getAllCourses
  }
  
  export default courseApi