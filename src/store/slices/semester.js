import { createSlice } from "@reduxjs/toolkit";
import { getAllSemesters,
  createSemester,
  updateSemester,
  deleteSemester } from "../thunks/semester";
   
import semesterTypes from "../../constants/semesterTypes";

const semesterSlice = createSlice({
  name: "Semester",
  initialState: {
    loadings: {},
    errors: {},
    contents: {},
    paginations: {},
  },
  extraReducers: {
    // Get all semesters
    [getAllSemesters.pending]: (state) => {
      state.loadings[semesterTypes.GET_SEMESTERS ] = true;
      state.errors[semesterTypes.GET_SEMESTERS ] = "";
    },
    [getAllSemesters.fulfilled]: (state, payload) => {
      state.loadings[semesterTypes.GET_SEMESTERS ] = false;
      state.contents[semesterTypes.GET_SEMESTERS ] = payload;
    },
    [getAllSemesters.rejected]: (state, { payload }) => {
      state.loadings[semesterTypes.GET_SEMESTERS ] = false;
      state.errors[semesterTypes.GET_SEMESTERS ] = payload;
    },
    // Update the semester
    [updateSemester.pending]: (state) => {
      state.loadings[semesterTypes.UPDATE_SEMESTER] = true;
      state.errors[semesterTypes.UPDATE_SEMESTER] = ""
    },
    [updateSemester.fulfilled]: (state, payload) => {
      state.loadings[semesterTypes.UPDATE_SEMESTER] = false;
      state.contents[semesterTypes.UPDATE_SEMESTER] = payload.meta.arg
      const index = state.contents[
        semesterTypes.GET_SEMESTERS
      ].payload.data.data.findIndex(
        (c) => c.semesterId === payload.meta.arg.semesterId
      )
      state.contents[semesterTypes.GET_SEMESTERS].payload.data.data[index] 
      = payload.meta.arg
    },
    [updateSemester.rejected]: (state, { payload }) => {
      state.loadings[semesterTypes.UPDATE_SEMESTER] = false;
      state.errors[semesterTypes.UPDATE_SEMESTER] = payload;
    },
    // Delete a semester
    [deleteSemester.pending]: (state) => {
      state.loadings[semesterTypes.DELETE_SEMESTER] = true;
      state.errors[semesterTypes.DELETE_SEMESTER] = ""
    },
    [deleteSemester.fulfilled]: (state, payload) => {
      state.loadings[semesterTypes.DELETE_SEMESTER] = false;
      state.contents[semesterTypes.DELETE_SEMESTER] = payload.meta.arg
      const index = state.contents[
        semesterTypes.GET_SEMESTERS
      ].payload.data.data.findIndex(
        (c) => c.semesterId === payload.meta.arg.semesterId
      )
      state.contents[semesterTypes.GET_SEMESTERS].payload.data.data.splice(index, 1)
    },
    [deleteSemester.rejected]: (state, { payload }) => {
      state.loadings[semesterTypes.DELETE_SEMESTER] = false;
      state.errors[semesterTypes.DELETE_SEMESTER] = payload;
    },
    // Create a new semester
    [createSemester.pending]: (state) => {
      state.loadings[semesterTypes.CREATE_SEMESTER] = true;
      state.errors[semesterTypes.CREATE_SEMESTER] = ""
    },
    [createSemester.fulfilled]: (state, payload) => {
      state.loadings[semesterTypes.CREATE_SEMESTER] = false;
      state.contents[semesterTypes.CREATE_SEMESTER] = payload.meta.arg
      state.contents[semesterTypes.GET_SEMESTERS].payload.data.data.push(
        payload.meta.arg
      )
      // Sort the array by semesterId
      state.contents[semesterTypes.GET_SEMESTERS].payload.data.data.sort((a, b) => {
        return a.semesterId.localeCompare(b.semesterId);
    });
    },
    [createSemester.rejected]: (state, { payload }) => {
      state.loadings[semesterTypes.CREATE_SEMESTER] = false;
      state.errors[semesterTypes.CREATE_SEMESTER] = payload;
    },
  },
});
export default semesterSlice.reducer;
