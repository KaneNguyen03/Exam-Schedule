import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import studentTypes from "../../constants/studentTypes";
import student from "../../apis/studentlist";

export const getAllStudents = createAsyncThunk(
  studentTypes.GET_STUDENTS,
  async (data) => {
    try {
      const result = await student.getAllStudents(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);

export const getStudents = createAsyncThunk(
  studentTypes.GET_ALL_STUDENTS,
  async () => {
    try {
      const result = await student.getStudents();
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);

export const updateStudent = createAsyncThunk(
  studentTypes.UPDATE_STUDENT,
  async (data) => {
    try {
      const result = await student.updateStudent(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  studentTypes.DELETE_STUDENT,
  async (data) => {
    try {
      const result = await student.deleteStudent(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);

export const createStudent = createAsyncThunk(
  studentTypes.CREATE_STUDENT,
  async (data) => {
    try {
      const result = await student.createStudent(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
);
