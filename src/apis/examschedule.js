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
    const url = "&" + new URLSearchParams(res.param).toString()
    const data = await apiInstance.get(
      `api/ExamSchedule/GetExamSchedulesByCourseIDAndExamSlotID?CourseId=${res.courseId}&ExamSlotId=${res.examSlotId}${url}`
    )
    return data;
  } catch (error) {
    throw new Error("Error getting exam schedule details")
  }
}

const examscheduleApi = {
  getAllExamschedules,
  createExamschedule,
  generateExamSchedule,
  getExamScheduleByCourseIdAndExamSlotId
}

export default examscheduleApi
