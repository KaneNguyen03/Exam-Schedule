import apiInstance from "./config";

const getAllExamschedules = async() => {
 try {
    const data  = await apiInstance.get("api/ExamSchedule")
      return data
 } catch (error) {
    throw new Error("Error geting exam schedule")
 }
}

const examscheduleApi = {
    getAllExamschedules
  }
  
  export default examscheduleApi