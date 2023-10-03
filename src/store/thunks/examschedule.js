import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import examscheduleTypes from "../../constants/examscheduleTypes";
import examschedule from "../../apis/examschedule";

export const getAllExamschedules = createAsyncThunk(
  examscheduleTypes.GET_EXAMSCHEDULES,
  async () => {
    try {
      const result = await examschedule.getAllExamschedules();
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);