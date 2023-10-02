import { createSlice } from "@reduxjs/toolkit";
import { getAllStudents } from "../thunks/student";
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
    [getAllStudents.fulfilled]: (state, {payload}) => {
      state.loadings[studentTypes.GET_STUDENTS] = false;
      state.contents[studentTypes.GET_STUDENTS] = payload;
    },
    [getAllStudents.rejected]: (state, { payload }) => {
      state.loadings[studentTypes.GET_STUDENTS] = false;
      state.errors[studentTypes.GET_STUDENTS] = payload;
    },
  },
});
export default studentSlice.reducer;
