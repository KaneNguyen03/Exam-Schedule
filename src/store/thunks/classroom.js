import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import classroomTypes from "../../constants/classroomTypes"
import classroom from "../../apis/classroom"

export const getAllClassrooms = createAsyncThunk(
  classroomTypes.GET_CLASSROOMS,
  async (data) => {
    try {
      const result = await classroom.getAllClassrooms(data)
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

export const deleteClassroom = createAsyncThunk(
  classroomTypes.DELETE_CLASSROOM,
  async (data) => {
    try {
      const result = await classroom.deleteClassroom(data)
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)

export const createClassroom = createAsyncThunk(
  classroomTypes.CREATE_CLASSROOM,
  async (data) => {
    try {
      const result = await classroom.createClassroom(data)
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)
