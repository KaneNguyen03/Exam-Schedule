import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import examscheduleTypes from "../../constants/examscheduleTypes"
import examschedule from "../../apis/examschedule"

export const getAllExamschedules = createAsyncThunk(
  examscheduleTypes.GET_EXAMSCHEDULES,
  async (data) => {
    try {
      const result = await examschedule.getAllExamschedules(data)
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)

export const createExamschedule = createAsyncThunk(
  examscheduleTypes.CREATE_EXAMSCHEDULE,
  async (data) => {
    try {
      const result = await examschedule.createExamschedule(data)
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)
export const generateExamschedule = createAsyncThunk(
  examscheduleTypes.GENERATE_EXAMSCHEDULE,
  async (courseId, examSlotId) => {
    try {
      const result = await examschedule.generateExamSchedule(
        courseId,
        examSlotId
      )
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)

export const getExamscheduleDetails = createAsyncThunk(
  examscheduleTypes.GET_EXAMSCHEDULE_DETAILS,
  async (res) => {
    try {
      const result = await examschedule.getExamScheduleByCourseIdAndExamSlotId(
       res
      )
      console.log(res)
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)
export const getExamScheduleByUsername = createAsyncThunk(
  examscheduleTypes.GET_EXAMSCHEDULE_BY_USERNAME,
  async (res) => {
    try {
      const result = await examschedule.getExamScheduleByUsername(
       res
      )
      console.log(res)
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)

