import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import teacherTypes from "../../constants/teacherTypes";
import teacher from "../../apis/teacher";

export const getAllTeachers = createAsyncThunk(
  teacherTypes.GET_TEACHERS,
  async (data) => {
    try {
      const result = await teacher.getAllTeachers(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
)
export const updateTeacher = createAsyncThunk(
  teacherTypes.UPDATE_TEACHER,
  async (data) => {
    try {
      const result = await teacher.updateTeacher(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
)
export const deleteTeacher = createAsyncThunk(
  teacherTypes.DELETE_TEACHER,
  async (data) => {
    try {
      const result = await teacher.deleteTeacher(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
)
export const createTeacher = createAsyncThunk(
  teacherTypes.CREATE_TEACHER,
  async (data) => {
    try {
      const result = await teacher.createTeacher(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
)
