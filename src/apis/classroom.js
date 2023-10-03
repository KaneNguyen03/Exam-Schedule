import apiInstance from "./config"

const getAllClassrooms = async (data) => {
  const url = "?" + new URLSearchParams(data).toString()
  try {
    const data = await apiInstance.get(`api/Classroom${url}`)
    return data
  } catch (error) {
    throw new Error("Error geting classroom")
  }
}

const updateClassroom = async (data) => {
  try {
    const response = await apiInstance.put(
      `api/Classroom/${data.classroomId}`,
      {
        ClassroomId: data.classroomId,
        name: data.name,
        capacity: data.capacity,
      }
    )
    return response
  } catch (error) {
    throw new Error("Error update classroom")
  }
}

const deleteClassroom = async (data) => {
  try {
    const response = await apiInstance.put(
      `api/Classroom/${data.classroomId}`,
      {
        ...data,
        ClassroomId: data.classroomId,
        status: data.status,
      }
    )
    return response
  } catch (error) {
    throw new Error("Error delete classroom")
  }
}

const createClassroom = async (data) => {
  try {
    const response = await apiInstance.post(`api/Classroom`, {
      ClassroomId: data.classroomId,
      name: data.name,
      capacity: data.capacity,
    })
    return response
  } catch (error) {
    throw new Error("Error create classroom")
  }
}

const classroomApi = {
  getAllClassrooms,
  updateClassroom,
  deleteClassroom,
  createClassroom,
}

export default classroomApi
