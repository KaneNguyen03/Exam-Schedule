import apiInstance from "./config";

const getAllExamslots = async(data) => {
   const url= "?" + new URLSearchParams(data).toString();
 try {
    const data  = await apiInstance.get(`api/ExamSlot${url}`)
      return data
 } catch (error) {
    throw new Error("Error geting exam slot")
 }
}
const updateExamslot = async(data) => {
  
 try {
    const response  = await apiInstance.put(
      `api/ExamSlot/${data.examSlotId}`,
      {
         examSlotId: data.examSlotId,
         examSlotName: data.examSlotName,
         proctoringId: data.proctoringId,
         date: data.date,
         startTime: data.startTime,
         endTime: data.endTime,
         examSchedule: data.ex
      }
      )
      return data
 } catch (error) {
    throw new Error("Error geting exam slot")
 }
}


const examslotApi = {
    getAllExamslots
  }
  
  export default examslotApi