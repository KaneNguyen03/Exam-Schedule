import { createSlice } from "@reduxjs/toolkit";
import { getAllExamslots } from "../thunks/examslot";
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
    [getAllExamslots.pending]: (state) => {
      state.loadings[examslotTypes.GET_EXAMSLOTS] = true;
      state.errors[examslotTypes.GET_EXAMSLOTS] = "";
    },
    [getAllExamslots.fulfilled]: (state, payload) => {
      state.loadings[examslotTypes.GET_EXAMSLOTS] = false;
      state.contents[examslotTypes.GET_EXAMSLOTS] = payload;
    },
    [getAllExamslots.rejected]: (state, { payload }) => {
      state.loadings[examslotTypes.GET_EXAMSLOTS] = false;
      state.errors[examslotTypes.GET_EXAMSLOTS] = payload;
    },
  },
});
export default examslotSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { getAllExamslots } from "../thunks/examslot";
// import examslotTypes from "../../constants/examslotTypes";

// const examslotSlice = createSlice({
//   name: "examslot",
//   initialState: {
//     loadings: {},
//     errors: {},
//     contents: {},
//     paginations: {},
//     headers: {}, // Store headers separately if needed
//   },
//   extraReducers: {
//     [getAllExamslots.pending]: (state) => {
//       state.loadings[examslotTypes.GET_EXAMSLOTS] = true;
//       state.errors[examslotTypes.GET_EXAMSLOTS] = "";
//     },
//     [getAllExamslots.fulfilled]: (state, payload) => {
//       state.loadings[examslotTypes.GET_EXAMSLOTS] = false;
//       state.contents[examslotTypes.GET_EXAMSLOTS] = payload;

//       // Store the necessary header information
//       state.headers[examslotTypes.GET_EXAMSLOTS] = {
//         contentType: payload.meta.request.getResponseHeader("content-type"),
//       };
//     },
//     [getAllExamslots.rejected]: (state, { payload }) => {
//       state.loadings[examslotTypes.GET_EXAMSLOTS] = false;
//       state.errors[examslotTypes.GET_EXAMSLOTS] = payload;
//     },
//   },
// });

// export default examslotSlice.reducer;