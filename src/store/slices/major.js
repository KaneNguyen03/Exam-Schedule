import { createSlice } from "@reduxjs/toolkit";
import { getAllMajors,
  createMajor,
  updateMajor,
  deleteMajor,
} from "../thunks/major";

import majorTypes from "../../constants/majorTypes";


const majorSlice = createSlice({
  name: "major",
  initialState: {
    loadings: {},
    errors: {},
    contents: {},
    paginations: {},
  },
  extraReducers: {

    [getAllMajors.pending]: (state) => {
      state.loadings[majorTypes.GET_MAJORS ] = true;
      state.errors[majorTypes.GET_MAJORS ] = "";
    },
    [getAllMajors.fulfilled]: (state, {payload}) => {

      state.loadings[majorTypes.GET_MAJORS ] = false;
      state.contents[majorTypes.GET_MAJORS ] = payload;
      state.paginations[majorTypes.GET_MAJORS ] = payload.data.pagination
    },
    [getAllMajors.rejected]: (state, { payload }) => {
      state.loadings[majorTypes.GET_MAJORS ] = false;
      state.errors[majorTypes.GET_MAJORS ] = payload;
    },

    // Update the Major
    [updateMajor.pending]: (state) => {
      state.loadings[majorTypes.UPDATE_MAJOR] = true
      state.errors[majorTypes.UPDATE_MAJOR] = ""
    },
    [updateMajor.fulfilled]: (state, payload) => {
      state.loadings[majorTypes.UPDATE_MAJOR] = false
      state.contents[majorTypes.UPDATE_MAJOR] = payload.meta.arg
      const index = state.contents[
        majorTypes.GET_MAJORS
      ].data.data.findIndex(
        (c) => c.majorId === payload.meta.arg.majorId
      )
      state.contents[majorTypes.GET_MAJORS].data.data[index] =
        payload.meta.arg
    },
    [updateMajor.rejected]: (state, { payload }) => {
      state.loadings[majorTypes.UPDATE_MAJOR] = false
      state.errors[majorTypes.UPDATE_MAJOR] = payload
    },

    // Delete a Major
    [deleteMajor.pending]: (state) => {
      state.loadings[majorTypes.UPDATE_MAJOR] = true
      state.errors[majorTypes.UPDATE_MAJOR] = ""
    },
    [deleteMajor.fulfilled]: (state, payload) => {
      state.loadings[majorTypes.UPDATE_MAJOR] = false
      state.contents[majorTypes.UPDATE_MAJOR] = payload.meta.arg
      const index = state.contents[
        majorTypes.GET_MAJORS
      ].data.data.findIndex(
        (c) => c.majorId === payload.meta.arg.majorId
      )
      state.contents[majorTypes.GET_MAJORS].data.data.splice(index, 1)
    },
    [deleteMajor.rejected]: (state, { payload }) => {
      state.loadings[majorTypes.UPDATE_MAJOR] = false
      state.errors[majorTypes.UPDATE_MAJOR] = payload
    },

    // Create a new Major
    [createMajor.pending]: (state) => {
      state.loadings[majorTypes.CREATE_MAJOR] = true
      state.errors[majorTypes.CREATE_MAJOR] = ""
    },
    [createMajor.fulfilled]: (state, payload) => {
      state.loadings[majorTypes.CREATE_MAJOR] = false
      state.contents[majorTypes.CREATE_MAJOR] = payload.meta.arg
      state.contents[majorTypes.GET_MAJORS].data.data.push(
        payload.meta.arg
      )
      // Sort the array by majorId
      state.contents[majorTypes.GET_MAJORS].data.data.sort((a, b) => {
        return a.majorId.localeCompare(b.majorId);
    });
    },
    [createMajor.rejected]: (state, { payload }) => {
      state.loadings[majorTypes.CREATE_MAJOR] = false
      state.errors[majorTypes.CREATE_MAJOR] = payload
    },

  },
});

export default majorSlice.reducer;
