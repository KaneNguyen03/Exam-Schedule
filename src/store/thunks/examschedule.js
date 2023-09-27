import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import examscheduleTypes from "../../constants/examscheduleTypes";
import examschedule from "../../apis/examschedule";

export const getAllExamchedules = createAsyncThunk(
  examscheduleTypes.GET_EXAMSCHEDULES,
  async () => {
    try {
      const result = await examschedule.getAllExamchedules();
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);