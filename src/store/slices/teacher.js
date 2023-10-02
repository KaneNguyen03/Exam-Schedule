import { createSlice } from "@reduxjs/toolkit";
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  updateTeacher,
} from "../thunks/teacher";
import teacherTypes from "../../constants/teacherTypes";

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    loadings: {},
    errors: {},
    contents: {},
    paginations: {},
  },
  extraReducers: {
    //get all teacher
    [getAllTeachers.pending]: (state) => {
      state.loadings[teacherTypes.GET_TEACHERS] = true;
      state.errors[teacherTypes.GET_TEACHERS] = "";
    },
    [getAllTeachers.fulfilled]: (state, { payload }) => {
      state.loadings[teacherTypes.GET_TEACHERS] = false;
      state.contents[teacherTypes.GET_TEACHERS] = payload;
      state.paginations[teacherTypes.GET_TEACHERS] = payload.data.pagination;
    },
    [getAllTeachers.rejected]: (state, { payload }) => {
      state.loadings[teacherTypes.GET_TEACHERS] = false;
      state.errors[teacherTypes.GET_TEACHERS] = payload;
    },
    //update
    [updateTeacher.pending]: (state) => {
      state.loadings[teacherTypes.UPDATE_TEACHER] = true;
      state.errors[teacherTypes.UPDATE_TEACHER] = "";
    },
    [updateTeacher.fulfilled]: (state, payload) => {
      state.loadings[teacherTypes.UPDATE_TEACHER] = false;
      state.contents[teacherTypes.UPDATE_TEACHER] = payload.meta.arg;
      const index = state.contents[
        teacherTypes.GET_TEACHERS
      ].data.data.findIndex(
        (c) => c.proctoringId === payload.meta.arg.proctoringId
      );
      state.contents[teacherTypes.GET_TEACHERS].data.data[index] =
        payload.meta.arg;
    },
    [updateTeacher.rejected]: (state, { payload }) => {
      state.loadings[teacherTypes.UPDATE_TEACHER] = false;
      state.errors[teacherTypes.UPDATE_TEACHER] = payload;
    },
    //dELETE
    [deleteTeacher.pending]: (state) => {
      state.loadings[teacherTypes.UPDATE_TEACHER] = true;
      state.errors[teacherTypes.UPDATE_TEACHER] = "";
    },
    [deleteTeacher.fulfilled]: (state, payload) => {
      state.loadings[teacherTypes.UPDATE_TEACHER] = false;
      state.contents[teacherTypes.UPDATE_TEACHER] = payload.meta.arg;
      const index = state.contents[
        teacherTypes.GET_TEACHERS
      ].data.data.findIndex(
        (c) => c.proctoringId === payload.meta.arg.proctoringId
      );
      state.contents[teacherTypes.GET_TEACHERS].data.data.splice(index, 1);
    },
    [deleteTeacher.rejected]: (state, { payload }) => {
      state.loadings[teacherTypes.UPDATE_TEACHER] = false;
      state.errors[teacherTypes.UPDATE_TEACHER] = payload;
    },

    //Create
    [createTeacher.pending]: (state) => {
      state.loadings[teacherTypes.CREATE_TEACHER] = true;
      state.errors[teacherTypes.CREATE_TEACHER] = "";
    },
    [createTeacher.fulfilled]: (state, payload) => {
      state.loadings[teacherTypes.CREATE_TEACHER] = false;
      state.contents[teacherTypes.CREATE_TEACHER] = payload.meta.arg;
      state.contents[teacherTypes.GET_TEACHERS].data.data.push(
        payload.meta.arg
      );

      state.contents[teacherTypes.GET_TEACHERS].data.data.sort((a, b) => {
        return a.proctoringId.localeCompare(b.proctoringId);
      });
    },
    [createTeacher.rejected]: (state, { payload }) => {
      state.loadings[teacherTypes.CREATE_TEACHER] = false;
      state.errors[teacherTypes.CREATE_TEACHER] = payload;
    },
  },
});
export default teacherSlice.reducer;
