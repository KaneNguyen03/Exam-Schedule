import { createSlice } from "@reduxjs/toolkit";
import { getAllMajors } from "../thunks/major";
import majorTypes from "../../constants/majorTypes";

const majorSlice = createSlice({
  name: "Major",
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
    [getAllMajors.fulfilled]: (state, payload) => {

      state.loadings[majorTypes.GET_MAJORS ] = false;
      state.contents[majorTypes.GET_MAJORS ] = payload;
    },
    [getAllMajors.rejected]: (state, { payload }) => {
      state.loadings[majorTypes.GET_MAJORS ] = false;
      state.errors[majorTypes.GET_MAJORS ] = payload;
    },
  },
});
export default majorSlice.reducer;
