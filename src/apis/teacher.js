import apiInstance from "./config"

const getAllTeachers = async (data) => {
  const url = "?" + new URLSearchParams(data).toString()
  try {
    const data = await apiInstance.get(`api/Proctoring${url}`)
    return data
  } catch (error) {
    throw new Error("Error geting teacher")
  }
}
const updateTeacher = async (data) => {
  try {
    const response = await apiInstance.put(
      `api/Proctoring/${data.proctoringId}`,
      {
        proctoringId: data.proctoringId,
        proctoringName: data.proctoringName,
        proctoringLocation: data.proctoringLocation,
        compensation: data.compensation,
        status: "Active",
      }
    )
    return response
  } catch (error) {
    throw new Error("Error update proctoring")
  }
}

const deleteTeacher = async (data) => {
  try {
    const response = await apiInstance.delete(
      `api/Proctoring/${data}`,
    )
    return response
  } catch (error) {
    throw new Error("Error delete proctoring")
  }
}

const createTeacher = async (data) => {
  try {
    const response = await apiInstance.post(`api/Proctoring`, {
      proctoringId: data.proctoringId,
      proctoringName: data.proctoringName,
      compensation: data.compensation ? data.compensation : "0",
      examSlotId: data.examSlotId,
      status: "Active",
    })
    return response
  } catch (error) {
    throw new Error("Error create proctoring")
  }
}

const teacherApi = {
  getAllTeachers,
  updateTeacher,
  deleteTeacher,
  createTeacher,
}

export default teacherApi
