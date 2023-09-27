import { combineReducers, configureStore } from "@reduxjs/toolkit"
import classroomReducer from "./slices/classroom"
import courseReducer from "./slices/course"
import teacherReducer from "./slices/teacher"
import studentReducer from "./slices/student"
import examscheduleReducer from "./slices/examschedule"
import examslot from "./slices/examslot"
import major from "./slices/major"
import semester from "./slices/semester"

const reducer = combineReducers({
  classroom: classroomReducer,
  course: courseReducer,
  teacher: teacherReducer,
  student: studentReducer,
  examschedule: examscheduleReducer,
  examslot: examslot,
  major: major,
  semester: semester,
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
