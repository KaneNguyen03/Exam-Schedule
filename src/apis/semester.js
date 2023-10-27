import apiInstance from "./config";

const getAllSemesters = async(data) => {
   const url = "?" + new URLSearchParams(data).toString()
 try {
    const data  = await apiInstance.get(`api/Semester${url}`)
      return data
 } catch (error) {
    throw new Error("Error geting semester")
 }
}

const updateSemester = async (data) => {
   try {
     const response = await apiInstance.put(
       `api/Semester/${data.semesterId}`,
       {

         semesterId: data.semesterId,
         semesterName: data.semesterName,
         listMajor: data.listMajor,
         majorId: data.majorId,   
         course: data.course,
         status: "Active"
       }
     )
     return response
   } catch (error) {
     throw new Error("Error update Semester")
   }
 }
 
 const deleteSemester = async (data) => {
   try {
     const response = await apiInstance.put(
       `api/Semester/${data.semesterId}`,
       {
        ...data,
        majorId: data.majorId,
        status: data.status
       }
     )
     return response
   } catch (error) {
     throw new Error("Error delete Semester")
   }
 }
 
 const createSemester = async (data) => {
   try {
    const newListMajor = data.listMajor?.map((major)=>({
      ...major,
      ListSemester:[]
    }))
     const response = await apiInstance.post(`api/Semester`, {
       semesterId: data.semesterId,
       semesterName: data.semesterName,
       course: data.course,
       status:"active",
       listMajor: data.listMajor ? newListMajor :[],
       majorId: data.majorId ? data.major:"",
     })
     return response
   } catch (error) {
     throw new Error("Error create Semester")
   }
 }

const semesterApi = {
    getAllSemesters,
    updateSemester,
    deleteSemester,
    createSemester
  }
  
  export default semesterApi