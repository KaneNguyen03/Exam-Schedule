import { createSlice } from "@reduxjs/toolkit"
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  updateCourse,
} from "../thunks/course"
import courseTypes from "../../constants/courseTypes"

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
      state.loadings[courseTypes.GET_COURSES] = true
      state.errors[courseTypes.GET_COURSES] = ""
    },
    [getAllCourses.fulfilled]: (state, { payload }) => {
      state.loadings[courseTypes.GET_COURSES] = false
      state.contents[courseTypes.GET_COURSES] = payload
      state.paginations[courseTypes.GET_COURSES] = payload?.data?.pagination
    },
    [getAllCourses.rejected]: (state, { payload }) => {
      state.loadings[courseTypes.GET_COURSES] = false
      state.errors[courseTypes.GET_COURSES] = payload
    },

    //update
    [updateCourse.pending]: (state) => {
      state.loadings[courseTypes.UPDATE_COURSE] = true
      state.errors[courseTypes.UPDATE_COURSE] = ""
    },
    [updateCourse.fulfilled]: (state, payload) => {
      state.loadings[courseTypes.UPDATE_COURSE] = false
      state.contents[courseTypes.UPDATE_COURSE] = payload.meta.arg
      const index = state.contents[courseTypes.GET_COURSES].data.data.findIndex(
        (c) => c.courseId === payload.meta.arg.courseId
      )
      state.contents[courseTypes.GET_COURSES].data.data[index] =
        payload.meta.arg
    },
    [updateCourse.rejected]: (state, { payload }) => {
      state.loadings[courseTypes.UPDATE_COURSE] = false
      state.errors[courseTypes.UPDATE_COURSE] = payload
    },

    //dELETE
    [deleteCourse.pending]: (state) => {
      state.loadings[courseTypes.DELETE_COURSE] = true
      state.errors[courseTypes.DELETE_COURSE] = ""
    },
    [deleteCourse.fulfilled]: (state, payload) => {
      state.loadings[courseTypes.DELETE_COURSE] = false
      state.contents[courseTypes.DELETE_COURSE] = payload.meta.arg
      // const index = state.contents[
      //   courseTypes.GET_COURSES
      // ].data.data.findIndex(
      //   (c) => c.courseId === payload.meta.arg.courseId
      // );
      // state.contents[courseTypes.GET_COURSES].data.data.splice(index, 1);
    },
    [deleteCourse.rejected]: (state, { payload }) => {
      state.loadings[courseTypes.DELETE_COURSE] = false
      state.errors[courseTypes.DELETE_COURSE] = payload
    },

    //Create
    [createCourse.pending]: (state) => {
      state.loadings[courseTypes.CREATE_COURSE] = true
      state.errors[courseTypes.CREATE_COURSE] = ""
    },
    [createCourse.fulfilled]: (state, payload) => {
      state.loadings[courseTypes.CREATE_COURSE] = false
      state.contents[courseTypes.CREATE_COURSE] = payload.meta.arg
      const temp = { ...payload.meta.arg, status: "Active" }
      state.contents[courseTypes.GET_COURSES].data.data.push(temp)

      state.contents[courseTypes.GET_COURSES].data.data.sort((a, b) => {
        return a.courseId.localeCompare(b.courseId)
      })
    },
    [createCourse.rejected]: (state, { payload }) => {
      state.loadings[courseTypes.CREATE_COURSE] = false
      state.errors[courseTypes.CREATE_COURSE] = payload
    },
  },
})
export default courseSlice.reducer
