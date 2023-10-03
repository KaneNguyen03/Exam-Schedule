import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import semester  from "../../apis/semester"
import semesterTypes from "../../constants/semesterTypes";

export const getAllSemesters = createAsyncThunk(
   semesterTypes.GET_SEMESTERS,
  async (data) => {
    try {
      const result = await semester.getAllSemesters(data);
      return result;
    } catch (error) {
      return isRejectedWithValue(error);
    }
  }
)

export const updateSemester = createAsyncThunk(
  semesterTypes.UPDATE_SEMESTER,
  async (data) => {
    try {
      const result = await semester.updateSemester(data)
      return result
      } catch (error) {
        return isRejectedWithValue(error)
    }
  }  
)

export const deleteSemester = createAsyncThunk(
  semesterTypes.DELETE_SEMESTER,
  async (data) => {
    try {
      const result = await semester.deleteSemester(data)
      return result
    }catch(error){
      return isRejectedWithValue(error)
    }
  }
)

export const createSemester = createAsyncThunk(
  semesterTypes.CREATE_SEMESTER,
  async (data) => {
    try {
      const result = await semester.createSemester(data)
      return result
      } catch (error) {
        return isRejectedWithValue(error)
    }
  }
)
