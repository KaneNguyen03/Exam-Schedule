import { createSlice } from "@reduxjs/toolkit";
import { getAllCourses } from "../thunks/course";
import courseTypes from "../../constants/courseTypes";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    loadings: {},
    errors: {},
    contents: {},
    paginations: {},
  },
  extraReducers: {
    [getAllCourses.pending]: (state) => {
      state.loadings[courseTypes.GET_COURSES] = true;
      state.errors[courseTypes.GET_COURSES] = "";
    },
    [getAllCourses.fulfilled]: (state, payload) => {

      state.loadings[courseTypes.GET_COURSES] = false;
      state.contents[courseTypes.GET_COURSES] = payload;
    },
    [getAllCourses.rejected]: (state, { payload }) => {
      state.loadings[courseTypes.GET_COURSES] = false;
      state.errors[courseTypes.GET_COURSES] = payload;
    },
  },
});
export default courseSlice.reducer;
