import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import courseTypes from "../../constants/courseTypes";
import course from "../../apis/course";

export const getAllCourses = createAsyncThunk(
  courseTypes.GET_COURSES,
  async (data) => {
    try {
      const result = await course.getAllCourses(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
)
export const updateCourse = createAsyncThunk(
  courseTypes.UPDATE_COURSE,
  async (data) => {
    try {
      const result = await course.updateCourse(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);
export const deleteCourse = createAsyncThunk(
  courseTypes.DELETE_COURSE,
  async (data) => {
    try {
      const result = await course.deleteCourse(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);
export const createCourse = createAsyncThunk(
  courseTypes.CREATE_COURSE,
  async (data) => {
    try {
      const result = await course.createCourse(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
)