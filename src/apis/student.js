import apiInstance from "./config";

const getAllStudents = async(data) => {
   const url ="?" + new URLSearchParams(data).toString()
 try {
    const data  = await apiInstance.get(`api/StudentList${url}`)
      return data
 } catch (error) {
    throw new Error("Error geting students")
 }
}
const updateStudent = async (data) => {
   try {
     const response = await apiInstance.put(
       `api/StudentList/${data.studentListId}`,
       {
        studentListId: data.studentListId,
         studentId: data.studentId ,
         courseId: data.courseId,
         
       }
     )
     return response
   } catch (error) {
     throw new Error("Error update studentlist")
   }
 }
 
 const deleteStudent = async (data) => {
   try {
     const response = await apiInstance.delete(
       `api/StudentList/${data.studentListId}`
     )
     return response
   } catch (error) {
     throw new Error("Error delete studentlist")
   }
 }
 
 const createStudent = async (data) => {
   try {
     const response = await apiInstance.post(`api/StudentList`, {
      studentListId: data.studentListId,
       studentId: data.studentId ,
       courseId: data.courseId,
       
     })
     return response
   } catch (error) {
     throw new Error("Error create studentlist")
   }
 }

const studentApi = {
    getAllStudents,
    updateStudent,
    deleteStudent,
    createStudent,
  }
  
  export default studentApi