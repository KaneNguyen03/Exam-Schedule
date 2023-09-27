import apiInstance from "./config";

const getAllExamslots = async() => {
 try {
    const data  = await apiInstance.get("api/ExamSlot")
      return data
 } catch (error) {
    throw new Error("Error geting exam slot")
 }
}

const examslotApi = {
    getAllExamslots
  }
  
  export default examslotApi