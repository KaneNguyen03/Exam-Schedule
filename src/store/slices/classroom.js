import { createSlice } from "@reduxjs/toolkit";
import { getAllClassrooms, updateClassroom } from "../thunks/classroom";
import classroomTypes from "../../constants/classroomTypes";

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
      state.loadings[classroomTypes.GET_CLASSROOMS] = true;
      state.errors[classroomTypes.GET_CLASSROOMS] = "";
    },
    [getAllClassrooms.fulfilled]: (state, payload) => {
      state.loadings[classroomTypes.GET_CLASSROOMS] = false;
      state.contents[classroomTypes.GET_CLASSROOMS] = payload;
    },
    [getAllClassrooms.rejected]: (state, { payload }) => {
      state.loadings[classroomTypes.GET_CLASSROOMS] = false;
      state.errors[classroomTypes.GET_CLASSROOMS] = payload;
    },

    // Update the classroom
    [updateClassroom.pending]: (state) => {
      state.loadings[classroomTypes.UPDATE_CLASSROOM] = true;
      state.errors[classroomTypes.UPDATE_CLASSROOM] = "";
    },
    [updateClassroom.fulfilled]: (state, payload) => {
      state.loadings[classroomTypes.UPDATE_CLASSROOM] = false;
      state.contents[classroomTypes.UPDATE_CLASSROOM] = payload.meta.arg;
      const index = state.contents[
        classroomTypes.GET_CLASSROOMS
      ].payload.data.findIndex(
        (c) => c.classroomId === payload.meta.arg.classroomId
      );
      state.contents[classroomTypes.GET_CLASSROOMS].payload.data[index] =
        payload.meta.arg;
    },
    [updateClassroom.rejected]: (state, { payload }) => {
      state.loadings[classroomTypes.UPDATE_CLASSROOM] = false;
      state.errors[classroomTypes.UPDATE_CLASSROOM] = payload;
    },
  },
});
export default classroomSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { getAllClassrooms, updateClassroom } from "../thunks/classroom";
// import classroomTypes from "../../constants/classroomTypes";

// const classroomSlice = createSlice({
//   name: "classroom",
//   initialState: {
//     loadings: {},
//     errors: {},
//     contents: {},
//     paginations: {},
//     headers: {}, // Store headers separately if needed
//   },
//   extraReducers: {
//     //Get all classrooms
//     [getAllClassrooms.pending]: (state) => {
//       state.loadings[classroomTypes.GET_CLASSROOMS] = true;
//       state.errors[classroomTypes.GET_CLASSROOMS] = "";
//     },
//     [getAllClassrooms.fulfilled]: (state, payload) => {
//       state.loadings[classroomTypes.GET_CLASSROOMS] = false;
//       state.contents[classroomTypes.GET_CLASSROOMS] = payload;
//     },
//     [getAllClassrooms.rejected]: (state, { payload }) => {
//       state.loadings[classroomTypes.GET_CLASSROOMS] = false;
//       state.errors[classroomTypes.GET_CLASSROOMS] = payload;
//     },

//     // Update the classroom
//     [updateClassroom.pending]: (state) => {
//       state.loadings[classroomTypes.UPDATE_CLASSROOM] = true;
//       state.errors[classroomTypes.UPDATE_CLASSROOM] = "";
//     },
//     [updateClassroom.fulfilled]: (state, payload) => {
//       state.loadings[classroomTypes.UPDATE_CLASSROOM] = false;
//       state.contents[classroomTypes.UPDATE_CLASSROOM] = payload.meta.arg;
//       const index = state.contents[
//         classroomTypes.GET_CLASSROOMS
//       ].payload.data.findIndex(
//         (c) => c.classroomId === payload.meta.arg.classroomId
//       );

//       // Store the necessary header information
//       state.headers[classroomTypes.UPDATE_CLASSROOM] = {
//         contentType: payload.meta.request.getResponseHeader("content-type"),
//       };

//       state.contents[classroomTypes.GET_CLASSROOMS].payload.data[index] =
//         payload.meta.arg;
//     },
//     [updateClassroom.rejected]: (state, { payload }) => {
//       state.loadings[classroomTypes.UPDATE_CLASSROOM] = false;
//       state.errors[classroomTypes.UPDATE_CLASSROOM] = payload;
//     },
//   },
// });
// export default classroomSlice.reducer;
