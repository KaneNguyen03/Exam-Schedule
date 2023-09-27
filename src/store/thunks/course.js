import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import courseTypes from "../../constants/courseTypes";
import course from "../../apis/course";

export const getAllCourses = createAsyncThunk(
  courseTypes.GET_COURSES,
  async () => {
    try {
      const result = await course.getAllCourses();
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);
