import { createSlice } from "@reduxjs/toolkit";
import {
  getAllStudents,
  updateStudent,
  deleteStudent,
  createStudent,
  getStudents,
} from "../thunks/student";
import studentTypes from "../../constants/studentTypes";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    loadings: {},
    errors: {},
    contents: {},
    paginations: {},
  },
  extraReducers: {
    [getAllStudents.pending]: (state) => {
      state.loadings[studentTypes.GET_STUDENTS] = true;
      state.errors[studentTypes.GET_STUDENTS] = "";
    },

    [getAllStudents.fulfilled]: (state, { payload }) => {
      state.loadings[studentTypes.GET_STUDENTS] = false;
      state.contents[studentTypes.GET_STUDENTS] = payload;
      state.paginations[studentTypes.GET_STUDENTS] = payload.data.pagination;
    },
    [getAllStudents.rejected]: (state, { payload }) => {
      state.loadings[studentTypes.GET_STUDENTS] = false;
      state.errors[studentTypes.GET_STUDENTS] = payload;
    },

    //Update
    [updateStudent.pending]: (state) => {
      state.loadings[studentTypes.UPDATE_STUDENT] = true;
      state.errors[studentTypes.UPDATE_STUDENT] = "";
    },
    [updateStudent.fulfilled]: (state, payload) => {
      state.loadings[studentTypes.UPDATE_STUDENT] = false;
      state.contents[studentTypes.UPDATE_STUDENT] = payload.meta.arg;
      const index = state.contents[
        studentTypes.GET_STUDENTS
      ].data.data.findIndex(
        (c) => c.studentListId === payload.meta.arg.studentListId
      );
      state.contents[studentTypes.GET_STUDENTS].data.data[index] =
        payload.meta.arg;
    },
    [updateStudent.rejected]: (state, { payload }) => {
      state.loadings[studentTypes.UPDATE_STUDENT] = false;
      state.errors[studentTypes.UPDATE_STUDENT] = payload;
    },

    //delete
    [deleteStudent.pending]: (state) => {
      state.loadings[studentTypes.DELETE_STUDENT] = true;
      state.errors[studentTypes.DELETE_STUDENT] = "";
    },
    [deleteStudent.fulfilled]: (state, payload) => {
      state.loadings[studentTypes.DELETE_STUDENT] = false;
      state.contents[studentTypes.DELETE_STUDENT] = payload.meta.arg;
      // const index = state.contents[
      //   studentTypes.GET_STUDENTS
      // ].data.data.findIndex(
      //   (c) => c.studentListId === payload.meta.arg.studentListId
      // );
      // state.contents[studentTypes.GET_STUDENTS].data.data.splice(index, 1);
    },
    [deleteStudent.rejected]: (state, { payload }) => {
      state.loadings[studentTypes.DELETE_STUDENT] = false;
      state.errors[studentTypes.DELETE_STUDENT] = payload;
    },

    //create
    [createStudent.pending]: (state) => {
      state.loadings[studentTypes.CREATE_STUDENT] = true;
      state.errors[studentTypes.CREATE_STUDENT] = "";
    },
    [createStudent.fulfilled]: (state, payload ) => {
      state.loadings[studentTypes.CREATE_STUDENT] = false;
      state.contents[studentTypes.CREATE_STUDENT] = payload.meta.arg;
      const temp = { ...payload.meta.arg, status: "Active" };
      state.contents[studentTypes.GET_STUDENTS].data.data.push(temp);
    },
    [createStudent.rejected]: (state, { payload }) => {
      state.loadings[studentTypes.CREATE_STUDENT] = false;
      state.errors[studentTypes.CREATE_STUDENT] = payload;
    },

    //Get Students
    [getStudents.pending]: (state) => {
      state.loadings[studentTypes.GET_ALL_STUDENTS] = true;
      state.errors[studentTypes.GET_STUDENTS] = "";
    },

    [getStudents.fulfilled]: (state, { payload }) => {
      state.loadings[studentTypes.GET_ALL_STUDENTS] = false;
      state.contents[studentTypes.GET_ALL_STUDENTS] = payload;
      state.paginations[studentTypes.GET_ALL_STUDENTS] =
        payload.data.pagination;
    },
    [getStudents.rejected]: (state, { payload }) => {
      state.loadings[studentTypes.GET_ALL_STUDENTS] = false;
      state.errors[studentTypes.GET_ALL_STUDENTS] = payload;
    },
  },
});
export default studentSlice.reducer;
