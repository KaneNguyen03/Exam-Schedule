import apiInstance from "./config"

const getAllExamschedules = async () => {
  try {
    const data = await apiInstance.get("api/ExamSchedule")
    return data
  } catch (error) {
    throw new Error("Error geting exam schedule")
  }
}

const createExamschedule = async (res) => {
  try {
    const data = await apiInstance.post("api/ExamSchedule", res)
    return data
  } catch (error) {
    throw new Error("Error geting exam schedule")
  }
}

const generateExamSchedule = async (res) => {
  try {
    const data = await apiInstance.post(
      `api/ExamSchedule/GenerateExamSchedule?courseId=${res.courseId}&examSlotId=${res.examSlotId}`
    )
  } catch (error) {
    throw new Error("Error generate exam schedule")
  }
}

const getExamScheduleByCourseIdAndExamSlotId = async (res) => {
  try {
    console.log(res)
    const url = "&" + new URLSearchParams(res).toString()
    const data = await apiInstance.get(
      `api/ExamSchedule/GetExamSchedulesByCourseIDAndExamSlotID?${url}`
    )
    return data;
  } catch (error) {
    throw new Error("Error getting exam schedule details")
  }
}

const sendMail = async (res) => {

  try {

    const data = await apiInstance.post(
      `api/ExamSchedule/SendEmailNotification?courseId=${res.courseId}&examSlotId=${res.examSlotId}`
    )
    return data;
  } catch (error) {
    throw new Error("Error sent mail")
  }
}


const examscheduleApi = {
  getAllExamschedules,
  createExamschedule,
  generateExamSchedule,
  getExamScheduleByCourseIdAndExamSlotId,
  sendMail
}

export default examscheduleApi
