import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import examslotTypes from "../../constants/examslotTypes";
import examslot from "../../apis/examslot";

export const getAllExamslots = createAsyncThunk(
   examslotTypes.GET_EXAMSLOTS,
  async () => {
    try {
      const result = await examslot.getAllExamslots();
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);