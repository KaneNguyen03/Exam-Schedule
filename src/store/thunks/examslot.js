import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import examslotTypes from "../../constants/examslotTypes";
import examslot from "../../apis/examslot";

export const getAllExamslots = createAsyncThunk(
   examslotTypes.GET_EXAMSLOTS,
  async (data) => {
    try {
      const result = await examslot.getAllExamslots(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
)
export const updateExamslot = createAsyncThunk(
   examslotTypes.UPDATE_EXAMSLOT,
  async (data) => {
    try {
      const result = await examslot.updateExamslot(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
)
export const deleteExamslot = createAsyncThunk(
   examslotTypes.DELETE_EXAMSLOT,
  async (data) => {
    try {
      const result = await examslot.deleteExamslot(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
)
export const createExamslot = createAsyncThunk(
   examslotTypes.CREATE_EXAMSLOT,
  async (data) => {
    try {
      const result = await examslot.createExamslot(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
)
