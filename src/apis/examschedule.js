import apiInstance from "./config";

const getAllExamschedules = async() => {
 try {
    const data  = await apiInstance.get("api/ExamSchedule")
      return data
 } catch (error) {
    throw new Error("Error geting exam schedule")
 }
}

const createExamschedule = async(res) => {
 try {
    const data  = await apiInstance.post("api/ExamSchedule", res)
      return data
 } catch (error) {
    throw new Error("Error geting exam schedule")
 }
}

const examscheduleApi = {
    getAllExamschedules,
    createExamschedule
  }
  
  export default examscheduleApi