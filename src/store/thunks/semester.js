import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import semester  from "../../apis/semester"
import semesterTypes from "../../constants/semesterTypes";

export const getAllSemesters = createAsyncThunk(
   semesterTypes.GET_SEMESTERS,
  async () => {
    try {
      const result = await semester.getAllSemesters();
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);