import { createSlice } from "@reduxjs/toolkit";
import { getAllSemesters } from "../thunks/semester";
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
  },
});
export default semesterSlice.reducer;
