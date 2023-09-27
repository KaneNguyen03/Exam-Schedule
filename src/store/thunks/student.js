import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import studentTypes from "../../constants/studentTypes";
import student from "../../apis/student";

export const getAllStudents = createAsyncThunk(
  studentTypes.GET_STUDENTS,
  async () => {
    try {
      const result = await student.getAllStudents();
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);
