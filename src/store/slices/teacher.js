import { createSlice } from "@reduxjs/toolkit";
import { getAllTeachers } from "../thunks/teacher";
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
    [getAllTeachers.pending]: (state) => {
      state.loadings[teacherTypes.GET_TEACHERS] = true;
      state.errors[teacherTypes.GET_TEACHERS] = "";
    },
    [getAllTeachers.fulfilled]: (state, payload) => {
      state.loadings[teacherTypes.GET_TEACHERS] = false;
      state.contents[teacherTypes.GET_TEACHERS] = payload;
    },
    [getAllTeachers.rejected]: (state, { payload }) => {
      state.loadings[teacherTypes.GET_TEACHERS] = false;
      state.errors[teacherTypes.GET_TEACHERS] = payload;
    },
  },
});
export default teacherSlice.reducer;
