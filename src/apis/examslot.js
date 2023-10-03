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
         examSchedules: data.examSchedules,
         proctoring: data?.proctoring,
      }
      )
      return response
 } catch (error) {
    throw new Error("Error update exam slot")
 }
}

const deleteExamslot = async (data) => {
   try {
      const response = await apiInstance.delete(
         `api/ExamSlot/${data.examSlotId}`
      )
      return response
   } catch (error) {
   throw new Error("Error delete exam slot")
   }
}
const createExamslot = async(data) => {
  
   try {
      const response  = await apiInstance.post(
        `api/ExamSlot`,
        {
           examSlotId: data.examSlotId,
           examSlotName: data.examSlotName,
           proctoringId: data.proctoringId,
           date: data.date,
           startTime: data.startTime,
           endTime: data.endTime,
           examSchedules: data.examSchedules,
           proctoring: data?.proctoring,
        }
        )
        return response
   } catch (error) {
      throw new Error("Error create exam slot")
   }
  }
const examslotApi = {
    getAllExamslots,
    updateExamslot,
    deleteExamslot,
    createExamslot,
  }
  
  export default examslotApi