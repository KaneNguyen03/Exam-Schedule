import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import classroomTypes from "../../constants/classroomTypes"
import classroom from "../../apis/classroom"

export const getAllClassrooms = createAsyncThunk(
  classroomTypes.GET_CLASSROOMS,
  async () => {
    try {
      const result = await classroom.getAllClassrooms()
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)

export const updateClassroom = createAsyncThunk(
  classroomTypes.UPDATE_CLASSROOM,
  async (data) => {
    try {
      const result = await classroom.updateClassroom(data)
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)
