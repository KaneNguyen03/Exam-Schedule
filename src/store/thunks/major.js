import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit"
import major from "../../apis/major"
import majorTypes from "../../constants/majorTypes"

export const getAllMajors = createAsyncThunk(
  majorTypes.GET_MAJORS,
  async () => {
    try {
      const result = await major.getAllMajors()
      return result
    } catch (error) {
      return isRejectedWithValue(error)
    }
  }
)
