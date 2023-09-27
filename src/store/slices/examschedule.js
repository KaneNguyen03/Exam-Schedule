import { createSlice } from "@reduxjs/toolkit";

import examscheduleTypes from "../../constants/examscheduleTypes";
import { getAllExamchedules } from "../thunks/examschedule";

const examscheduleSlice = createSlice({
  name: "examSchedule",
  initialState: {
    loadings: {},
    errors: {},
    contents: {},
    paginations: {},
  },
  extraReducers: {
    [getAllExamchedules.pending]: (state) => {
      state.loadings[examscheduleTypes.GET_EXAMSCHEDULES ] = true;
      state.errors[examscheduleTypes.GET_EXAMSCHEDULES] = "";
    },
    [getAllExamchedules.fulfilled]: (state, payload) => {

      state.loadings[examscheduleTypes.GET_EXAMSCHEDULES] = false;
      state.contents[examscheduleTypes.GET_EXAMSCHEDULES] = payload;
    },
    [getAllExamchedules.rejected]: (state, { payload }) => {
      state.loadings[examscheduleTypes.GET_EXAMSCHEDULES] = false;
      state.errors[examscheduleTypes.GET_EXAMSCHEDULES] = payload;
    },
  },
});
export default examscheduleSlice.reducer;
