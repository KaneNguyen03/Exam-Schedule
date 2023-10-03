import apiInstance from "./config";

const getAllCourses = async(data) => {
   const url = "?" + new URLSearchParams(data).toString()
 try {
    const data  = await apiInstance.get(`api/Course${url}`)
      return data
 } catch (error) {
    throw new Error("Error geting course")
 }
}
const updateCourse = async(data) => {
   
 try {
    const response  = await apiInstance.put(
      `api/Course${data.courseId}`,
      {
         courseId: data.courseId,
         courseName: data.courseName,
         semesterId: data.semesterId,
         studentListId: data.studentListId,
      })
      return response
 } catch (error) {
    throw new Error("Error update course")
 }
}
const deleteCourse = async (data) => {
   try {
     const response = await apiInstance.delete(
       `api/Course/${data.courseId}`
     )
     return response
   } catch (error) {
     throw new Error("Error delete proctoring")
   }
 }
const createCourse = async (data) => {
   try {
     const response = await apiInstance.delete(
       `api/Course`,{
         courseId: data.courseId,
         courseName: data.courseName,
         semesterId: data.semesterId,
         studentListId: data.studentListId,
       }
     )
     return response
   } catch (error) {
     throw new Error("Error create course")
   }
 }

const courseApi = {
    getAllCourses,
    updateCourse,
    deleteCourse,
    createCourse,
  }
  
  export default courseApi