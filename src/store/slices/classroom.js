import { createSlice } from "@reduxjs/toolkit"
import {
  createClassroom,
  deleteClassroom,
  getAllClassrooms,
  updateClassroom,
} from "../thunks/classroom"
import classroomTypes from "../../constants/classroomTypes"

const classroomSlice = createSlice({
  name: "classroom",
  initialState: {
    loadings: {},
    errors: {},
    contents: {},
    paginations: {},
  },
  extraReducers: {
    // Get all classrooms
    [getAllClassrooms.pending]: (state) => {
      state.loadings[classroomTypes.GET_CLASSROOMS] = true
      state.errors[classroomTypes.GET_CLASSROOMS] = ""
    },
    [getAllClassrooms.fulfilled]: (state, { payload }) => {
      state.loadings[classroomTypes.GET_CLASSROOMS] = false
      state.contents[classroomTypes.GET_CLASSROOMS] = payload
      state.paginations[classroomTypes.GET_CLASSROOMS] = payload.data.pagination
    },
    [getAllClassrooms.rejected]: (state, { payload }) => {
      state.loadings[classroomTypes.GET_CLASSROOMS] = false
      state.errors[classroomTypes.GET_CLASSROOMS] = payload
    },

    // Update the classroom
    [updateClassroom.pending]: (state) => {
      state.loadings[classroomTypes.UPDATE_CLASSROOM] = true
      state.errors[classroomTypes.UPDATE_CLASSROOM] = ""
    },
    [updateClassroom.fulfilled]: (state, payload) => {
      state.loadings[classroomTypes.UPDATE_CLASSROOM] = false
      state.contents[classroomTypes.UPDATE_CLASSROOM] = payload.meta.arg
      const index = state.contents[
        classroomTypes.GET_CLASSROOMS
      ].data.data.findIndex(
        (c) => c.classroomId === payload.meta.arg.classroomId
      )
      state.contents[classroomTypes.GET_CLASSROOMS].data.data[index] =
        payload.meta.arg
    },
    [updateClassroom.rejected]: (state, { payload }) => {
      state.loadings[classroomTypes.UPDATE_CLASSROOM] = false
      state.errors[classroomTypes.UPDATE_CLASSROOM] = payload
    },

    // Delete a classroom
    [deleteClassroom.pending]: (state) => {
      state.loadings[classroomTypes.DELETE_CLASSROOM] = true
      state.errors[classroomTypes.DELETE_CLASSROOM] = ""
    },
    [deleteClassroom.fulfilled]: (state, payload) => {
      state.loadings[classroomTypes.DELETE_CLASSROOM] = false
      state.contents[classroomTypes.DELETE_CLASSROOM] = payload.meta.arg
      // const index = state.contents[
      //   classroomTypes.GET_CLASSROOMS
      // ].data.data.findIndex(
      //   (c) => c.classroomId === payload.meta.arg.classroomId
      // )
      // state.contents[classroomTypes.GET_CLASSROOMS].data.data.splice(index, 1)
    },
    [deleteClassroom.rejected]: (state, { payload }) => {
      state.loadings[classroomTypes.DELETE_CLASSROOM] = false
      state.errors[classroomTypes.DELETE_CLASSROOM] = payload
    },

    // Create a new classroom
    [createClassroom.pending]: (state) => {
      state.loadings[classroomTypes.CREATE_CLASSROOM] = true
      state.errors[classroomTypes.CREATE_CLASSROOM] = ""
    },
    [createClassroom.fulfilled]: (state, payload) => {
      state.loadings[classroomTypes.CREATE_CLASSROOM] = false
      state.contents[classroomTypes.CREATE_CLASSROOM] = payload.meta.arg
      state.contents[classroomTypes.GET_CLASSROOMS].data.data.push(
        payload.meta.arg
      )

      state.contents[classroomTypes.GET_CLASSROOMS].data.data.sort((a, b) => {
        return a.classroomId.localeCompare(b.classroomId)
      })
    },

    [createClassroom.rejected]: (state, { payload }) => {
      state.loadings[classroomTypes.CREATE_CLASSROOM] = false
      state.errors[classroomTypes.CREATE_CLASSROOM] = payload
    },
  },
})
export default classroomSlice.reducer
