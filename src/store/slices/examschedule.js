import { createSlice } from "@reduxjs/toolkit"

import examscheduleTypes from "../../constants/examscheduleTypes"
import {
  createExamschedule,
  generateExamschedule,
  getAllExamschedules,
  getExamscheduleDetails,
} from "../thunks/examschedule"

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
      state.loadings[examscheduleTypes.GET_EXAMSCHEDULES] = true
      state.errors[examscheduleTypes.GET_EXAMSCHEDULES] = ""
    },
    [getAllExamschedules.fulfilled]: (state, payload) => {
      state.loadings[examscheduleTypes.GET_EXAMSCHEDULES] = false
      state.contents[examscheduleTypes.GET_EXAMSCHEDULES] = payload
    },
    [getAllExamschedules.rejected]: (state, { payload }) => {
      state.loadings[examscheduleTypes.GET_EXAMSCHEDULES] = false
      state.errors[examscheduleTypes.GET_EXAMSCHEDULES] = payload
    },

    // Create Exam Schedule

    [createExamschedule.pending]: (state) => {
      state.loadings[examscheduleTypes.CREATE_EXAMSCHEDULES] = true
      state.errors[examscheduleTypes.CREATE_EXAMSCHEDULES] = ""
    },
    [createExamschedule.fulfilled]: (state, payload) => {
      state.loadings[examscheduleTypes.CREATE_EXAMSCHEDULES] = false
      state.contents[examscheduleTypes.CREATE_EXAMSCHEDULES] = payload
    },
    [createExamschedule.rejected]: (state, { payload }) => {
      state.loadings[examscheduleTypes.CREATE_EXAMSCHEDULES] = false
      state.errors[examscheduleTypes.CREATE_EXAMSCHEDULES] = payload
    },
    // Generate Exam Schedule

    [generateExamschedule.pending]: (state) => {
      state.loadings[examscheduleTypes.GENERATE_EXAMSCHEDULE] = true
      state.errors[examscheduleTypes.GENERATE_EXAMSCHEDULE] = ""
    },
    [generateExamschedule.fulfilled]: (state, payload) => {
      state.loadings[examscheduleTypes.GENERATE_EXAMSCHEDULE] = false
      state.contents[examscheduleTypes.GENERATE_EXAMSCHEDULE] = payload
      state.contents[examscheduleTypes.GET_EXAMSCHEDULES] = payload
    },
    [generateExamschedule.rejected]: (state, { payload }) => {
      state.loadings[examscheduleTypes.GENERATE_EXAMSCHEDULE] = false
      state.errors[examscheduleTypes.GENERATE_EXAMSCHEDULE] = payload
    },

    //
    [getExamscheduleDetails.pending]: (state) => {
      state.loadings[examscheduleTypes.GET_EXAMSCHEDULE_DETAILS] = true
      state.errors[examscheduleTypes.GET_EXAMSCHEDULE_DETAILS] = ""
    },
    [getExamscheduleDetails.fulfilled]: (state, {payload}) => {
      state.loadings[examscheduleTypes.GET_EXAMSCHEDULE_DETAILS] = false
      state.contents[examscheduleTypes.GET_EXAMSCHEDULE_DETAILS] = payload
      state.paginations[examscheduleTypes.GET_EXAMSCHEDULE_DETAILS] = payload.data?.pagination
    },
    [getExamscheduleDetails.rejected]: (state, { payload }) => {
      state.loadings[examscheduleTypes.GET_EXAMSCHEDULE_DETAILS] = false
      state.errors[examscheduleTypes.GET_EXAMSCHEDULE_DETAILS] = payload
    },
  },
})
export default examscheduleSlice.reducer
