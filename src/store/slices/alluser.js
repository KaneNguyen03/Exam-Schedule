import { createSlice } from "@reduxjs/toolkit"
import {
    createAlluser,
    deleteAlluser,
    getAllusers,
    updateAlluser
} from "../thunks/alluser"
import alluserTypes from "../../constants/alluserTypes"

const alluserSlice =createSlice({
    name: "alluser",
    initialState: {
        loadings: {},
        errors: {},
        contents: {},
        paginations: {},
      },
      extraReducers: {
        // Get all classrooms
    [getAllusers.pending]: (state) => {
        state.loadings[alluserTypes.GET_ALLUSERS] = true
        state.errors[alluserTypes.GET_ALLUSERS] = ""
      },
      [getAllusers.fulfilled]: (state, { payload }) => {
        state.loadings[alluserTypes.GET_ALLUSERS] = false
        state.contents[alluserTypes.GET_ALLUSERS] = payload
        state.paginations[alluserTypes.GET_ALLUSERS] = payload.data.pagination
      },
      [getAllusers.rejected]: (state, { payload }) => {
        state.loadings[alluserTypes.GET_ALLUSERS] = false
        state.errors[alluserTypes.GET_ALLUSERS] = payload
      },

      //uPDATE
      [updateAlluser.pending]: (state) => {
        state.loadings[alluserTypes.UPDATE_ALLUSER] = true
        state.errors[alluserTypes.UPDATE_ALLUSER] = ""
      },
      [updateAlluser.fulfilled]: (state, payload) => {
        state.loadings[alluserTypes.UPDATE_ALLUSER] = false
        state.contents[alluserTypes.UPDATE_ALLUSER] = payload.meta.arg
        const index = state.contents[
          alluserTypes.GET_ALLUSERS
        ].data.data.findIndex(
          (c) => c.username === payload.meta.arg.username
        )
        state.contents[alluserTypes.GET_ALLUSERS].data.data[index] =
          payload.meta.arg
      },
      [updateAlluser.rejected]: (state, { payload }) => {
        state.loadings[alluserTypes.UPDATE_ALLUSER] = false
        state.errors[alluserTypes.UPDATE_ALLUSER] = payload
      },
  
      // Delete 
    [deleteAlluser.pending]: (state) => {
        state.loadings[alluserTypes.DELETE_ALLUSER] = true
        state.errors[alluserTypes.DELETE_ALLUSER] = ""
      },
      [deleteAlluser.fulfilled]: (state, payload) => {
        state.loadings[alluserTypes.DELETE_ALLUSER] = false
        state.contents[alluserTypes.DELETE_ALLUSER] = payload.meta.arg
        // const index = state.contents[
        //   alluserTypes.GET_ALLUSERS
        // ].data.data.findIndex(
        //   (c) => c.classroomId === payload.meta.arg.classroomId
        // )
        // state.contents[alluserTypes.GET_ALLUSERS].data.data.splice(index, 1)
      },
      [deleteAlluser.rejected]: (state, { payload }) => {
        state.loadings[alluserTypes.DELETE_ALLUSER] = false
        state.errors[alluserTypes.DELETE_ALLUSER] = payload
      },
      // Create a new classroom
      [createAlluser.pending]: (state) => {
        state.loadings[alluserTypes.CREATE_ALLUSER] = true
        state.errors[alluserTypes.CREATE_ALLUSER] = ""
      },
      [createAlluser.fulfilled]: (state, payload) => {
        state.loadings[alluserTypes.CREATE_ALLUSER] = false
        state.contents[alluserTypes.CREATE_ALLUSER] = payload.meta.arg
        const temp = {...payload.meta.arg, status:"Active"}
        state.contents[alluserTypes.GET_ALLUSERS].data.data.push(
          temp
        )
  
        state.contents[alluserTypes.GET_ALLUSERS].data.data.sort((a, b) => {
          return a.username.localeCompare(b.username)
        })
      },
  
      [createAlluser.rejected]: (state, { payload }) => {
        state.loadings[alluserTypes.CREATE_ALLUSER] = false
        state.errors[alluserTypes.CREATE_ALLUSER] = payload
      },
    },
  })
  export default alluserSlice.reducer
  