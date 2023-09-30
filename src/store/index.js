import { combineReducers, configureStore } from "@reduxjs/toolkit"
import classroomReducer from "./slices/classroom"
import courseReducer from "./slices/course"
import teacherReducer from "./slices/teacher"
import studentReducer from "./slices/student"
import examscheduleReducer from "./slices/examschedule"
import examslotReducer from "./slices/examslot"
import majorReducer from "./slices/major"
import semesterReducer from "./slices/semester"

const reducer = combineReducers({
  classroom: classroomReducer,
  course: courseReducer,
  teacher: teacherReducer,
  student: studentReducer,
  examschedule: examscheduleReducer,
  examslot: examslotReducer,
  major: majorReducer,
  semester: semesterReducer,
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
