import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import teacherTypes from "../../constants/teacherTypes";
import teacher from "../../apis/teacher";

export const getAllTeachers = createAsyncThunk(
  teacherTypes.GET_TEACHERS,
  async () => {
    try {
      const result = await teacher.getAllTeachers();
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);
