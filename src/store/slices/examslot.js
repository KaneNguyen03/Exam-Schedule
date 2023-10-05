import { createSlice } from "@reduxjs/toolkit";
import { createExamslot, 
         deleteExamslot, 
         getAllExamslots, 
         updateExamslot
         } from "../thunks/examslot";
import examslotTypes from "../../constants/examslotTypes";

const examslotSlice = createSlice({
  name: "examslot",
  initialState: {
    loadings: {},
    errors: {},
    contents: {},
    paginations: {},
  },
  extraReducers: {
    //get all exam slots
    [getAllExamslots.pending]: (state) => {
      state.loadings[examslotTypes.GET_EXAMSLOTS] = true;
      state.errors[examslotTypes.GET_EXAMSLOTS] = "";
    },
    [getAllExamslots.fulfilled]: (state, {payload}) => {
      state.loadings[examslotTypes.GET_EXAMSLOTS] = false;
      state.contents[examslotTypes.GET_EXAMSLOTS] = payload;
      state.paginations[examslotTypes.GET_EXAMSLOTS] = payload.data.pagination;
    },
    [getAllExamslots.rejected]: (state, { payload }) => {
      state.loadings[examslotTypes.GET_EXAMSLOTS] = false;
      state.errors[examslotTypes.GET_EXAMSLOTS] = payload;
    },

    //update
    [updateExamslot.pending]: (state) => {
      state.loadings[examslotTypes.UPDATE_EXAMSLOT] = true;
      state.errors[examslotTypes.UPDATE_EXAMSLOT] = "";
    },
    [updateExamslot.fulfilled]: (state, payload) => {
      state.loadings[examslotTypes.UPDATE_EXAMSLOT] = false;
      state.contents[examslotTypes.UPDATE_EXAMSLOT] = payload.meta.arg;
      const index = state.contents[
        examslotTypes.GET_EXAMSLOTS
      ].data.data.findIndex(
        (c) => c.examSlotId === payload.meta.arg.examSlotId
      );
      state.contents[examslotTypes.GET_EXAMSLOTS].data.data[index] =
        payload.meta.arg;
    },
    [updateExamslot.rejected]: (state, { payload }) => {
      state.loadings[examslotTypes.UPDATE_EXAMSLOT] = false;
      state.errors[examslotTypes.UPDATE_EXAMSLOT] = payload;
    },

    //dELETE
    [deleteExamslot.pending]: (state) => {
      state.loadings[examslotTypes.DELETE_EXAMSLOT] = true;
      state.errors[examslotTypes.DELETE_EXAMSLOT] = "";
    },
    [deleteExamslot.fulfilled]: (state, payload) => {
      state.loadings[examslotTypes.DELETE_EXAMSLOT] = false;
      state.contents[examslotTypes.DELETE_EXAMSLOT] = payload.meta.arg;
      // const index = state.contents[
      //   examslotTypes.GET_EXAMSLOTS
      // ].data.data.findIndex(
      //   (c) => c.examSlotId === payload.meta.arg.examSlotId
      // );
      // state.contents[examslotTypes.GET_EXAMSLOTS].data.data.splice(index, 1);
    },
    [deleteExamslot.rejected]: (state, { payload }) => {
      state.loadings[examslotTypes.DELETE_EXAMSLOT] = false;
      state.errors[examslotTypes.DELETE_EXAMSLOT] = payload;
    },
        //Create
        [createExamslot.pending]: (state) => {
          state.loadings[examslotTypes.CREATE_EXAMSLOT] = true;
          state.errors[examslotTypes.CREATE_EXAMSLOT] = "";
        },
        [createExamslot.fulfilled]: (state, payload) => {
          state.loadings[examslotTypes.CREATE_EXAMSLOT] = false;
          state.contents[examslotTypes.CREATE_EXAMSLOT] = payload.meta.arg;
          state.contents[examslotTypes.GET_EXAMSLOTS].data.data.push(
            payload.meta.arg
          );
    
          state.contents[examslotTypes.GET_EXAMSLOTS].data.data.sort((a, b) => {
            return a.examSlotId.localeCompare(b.examSlotId);
          });
        },
        [createExamslot.rejected]: (state, { payload }) => {
          state.loadings[examslotTypes.CREATE_EXAMSLOT] = false;
          state.errors[examslotTypes.CREATE_EXAMSLOT] = payload;
        },
  },
});
export default examslotSlice.reducer;
