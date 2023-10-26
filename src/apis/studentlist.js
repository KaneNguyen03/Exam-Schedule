import apiInstance from "./config"

const getAllStudents = async (data) => {
  const url = "?" + new URLSearchParams(data).toString()
  try {
    const data = await apiInstance.get(`api/StudentList${url}`)
    return data
  } catch (error) {
    throw new Error("Error geting students")
  }
}

const getStudents = async () => {
  try {
    const data = await apiInstance.get(`api/Auth/AllStudents`)
    return data
  } catch (error) {
    throw new Error("Error geting students")
  }
}

const updateStudent = async (data) => {
  try {
    const response = await apiInstance.put(
      `api/StudentList/${data.studentListId}`,
      {
        studentListId: data.studentListId,
        listStudent: data.listStudent,
        courseId: data.courseId,
        numberOfProctoring: data.numberOfProctoring,
        status: data.status ? data.status : "active",
      }
    )
    return response
  } catch (error) {
    throw new Error("Error update studentlist")
  }
}

const deleteStudent = async (data) => {
  try {
    const response = await apiInstance.put(
      `api/StudentList/${data.studentListId}`,
      {
        ...data,
        studentListId: data.studentListId,
        status: data.status,
      }
    )
    return response
  } catch (error) {
    throw new Error("Error delete studentlist")
  }
}

const createStudent = async (data) => {
  try {
    const response = await apiInstance.post(`api/StudentList`, {
      studentListId: data.studentListId,
      listStudent: data.listStudent,
      courseId: data.courseId ? data.courseId : "",
      numberOfProctoring: data.numberOfProctoring,
      status: "Active",
    })
    return response
  } catch (error) {
    throw new Error("Error create studentlist")
  }
}

const studentApi = {
  getAllStudents,
  updateStudent,
  deleteStudent,
  createStudent,
  getStudents,
}

export default studentApi
