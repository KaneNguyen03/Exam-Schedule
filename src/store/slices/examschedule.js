import { createSlice } from "@reduxjs/toolkit";

import examscheduleTypes from "../../constants/examscheduleTypes";
import { getAllExamschedules } from "../thunks/examschedule";

const examscheduleSlice = createSlice({
  name: "examSchedule",
  initialState: {
    loadings: {},
    errors: {},
    contents: {},
    paginations: {},
  },
  extraReducers: {
    [getAllExamschedules.pending]: (state) => {
      state.loadings[examscheduleTypes.GET_EXAMSCHEDULES ] = true;
      state.errors[examscheduleTypes.GET_EXAMSCHEDULES] = "";
    },
    [getAllExamschedules.fulfilled]: (state, payload) => {

      state.loadings[examscheduleTypes.GET_EXAMSCHEDULES] = false;
      state.contents[examscheduleTypes.GET_EXAMSCHEDULES] = payload;
    },
    [getAllExamschedules.rejected]: (state, { payload }) => {
      state.loadings[examscheduleTypes.GET_EXAMSCHEDULES] = false;
      state.errors[examscheduleTypes.GET_EXAMSCHEDULES] = payload;
    },
  },
});
export default examscheduleSlice.reducer;
