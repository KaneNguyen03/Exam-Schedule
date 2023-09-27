import apiInstance from "./config";

const getAllExamchedules = async() => {
 try {
    const data  = await apiInstance.get("api/ExamSchedule")
      return data
 } catch (error) {
    throw new Error("Error geting exam schedule")
 }
}

const examscheduleApi = {
    getAllExamchedules
  }
  
  export default examscheduleApi