import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import major from "../../apis/major"
import majorTypes from "../../constants/majorTypes"

export const getAllMajors = createAsyncThunk(
  majorTypes.GET_MAJORS,
  async (data) => {
    try {
      const result = await major.getAllMajors(data)
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)

export const updateMajor = createAsyncThunk(
  majorTypes.UPDATE_MAJOR,
  async (data) => {
    try {
      const result = await major.updateMajor(data)
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)

export const deleteMajor = createAsyncThunk(
  majorTypes.DELETE_MAJOR,
  async (data) => {
    try {
      const result = await major.deleteMajor(data)
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)

export const createMajor = createAsyncThunk(
  majorTypes.CREATE_MAJOR,
  async (data) => {
    try {
      const result = await major.createMajor(data)
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)
