//action
import { getAllClassrooms } from "../store/thunks/classroom"

//layout
import Sidebar from "../components/Layout/Sidebar"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import classroomTypes from "../constants/classroomTypes"
import { getAllCourses } from "../store/thunks/course"
import courseTypes from "../constants/courseTypes"
import { getAllTeachers } from "../store/thunks/teacher"
import teacherTypes from "../constants/teacherTypes"
import studentTypes from "../constants/studentTypes"
import { getAllStudents } from "../store/thunks/student"
import majorTypes from "../constants/majorTypes"
import { getAllExamchedules } from "../store/thunks/examschedule"
import { getAllExamslots } from "../store/thunks/examslot"
import { getAllMajors } from "../store/thunks/major"
import semesterTypes from "../constants/semesterTypes"
import { getAllSemesters } from "../store/thunks/semester"
import examslotTypes from "../constants/examslotTypes"
import examscheduleTypes from "../constants/examscheduleTypes"
import Dashboard from "../components/Admin/Dashboard"

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const datacl = useSelector((state) => state.classroom)
  const dataco = useSelector((state) => state.course)
  const datate = useSelector((state) => state.teacher)
  const datast = useSelector((state) => state.student)
  const dataexs = useSelector((state) => state.examschedule)
  const dataexsl = useSelector((state) => state.examslot)
  const datamj = useSelector((state) => state.major)
  const datase = useSelector((state) => state.semester)
  const classrooms = datacl?.contents[classroomTypes.GET_CLASSROOMS]?.data.data
  const courses = dataco?.contents[courseTypes.GET_COURSES]?.payload?.data
  const teachers = datate?.contents[teacherTypes.GET_TEACHERS]?.data.data

  const students = datast?.contents[studentTypes.GET_STUDENTS]?.payload?.data
  const examschedules = dataexs?.contents[examscheduleTypes.GET_EXAMSCHEDULES]?.payload?.data
  const examslots = dataexsl?.contents[examslotTypes.GET_EXAMSLOTS]?.payload?.data
  const majors = datamj?.contents[majorTypes.GET_MAJORS]?.data.data
  const semesters = datase?.contents[semesterTypes.GET_SEMESTERS]?.payload?.data

  useEffect(() => {
    dispatch(getAllClassrooms())
    dispatch(getAllCourses())
    dispatch(getAllTeachers())
    dispatch(getAllStudents())
    dispatch(getAllExamchedules())
    dispatch(getAllExamslots())
    dispatch(getAllMajors())
    dispatch(getAllSemesters())
  }, [])

  return (
    <div>
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <Sidebar />
        <div className="main min-h-screen flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in max-h-screen">
          <header className="header bg-white shadow py-4 px-4">
            <div className="header-content flex items-center flex-row">
              <form action="#">
                <div className="hidden md:flex relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <input
                    id="search"
                    type="text"
                    name="search"
                    className="text-sm sm:text-base placeholder-gray-500 pl-10 pr-4 rounded-lg border border-gray-300 w-full h-10 focus:outline-none focus:border-indigo-400"
                    placeholder="Search..."
                  />
                </div>
                <div className="flex md:hidden">
                  <a
                    href="#"
                    className="flex items-center justify-center h-10 w-10 border-transparent"
                  >
                    <svg
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </a>
                </div>
              </form>
              <div className="flex ml-auto">
                <a className="flex flex-row items-center">
                  <img
                    src="https://png.pngtree.com/template/20190316/ourmid/pngtree-books-logo-image_79143.jpg"
                    className="h-10 w-10 bg-gray-200 border rounded-full"
                  />
                  <span className="flex flex-col ml-2">
                    <span className="truncate w-20 font-semibold tracking-wide leading-none">
                      BAO
                    </span>
                    <span className="truncate w-20 text-gray-500 text-xs leading-none mt-1">
                      Admin
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </header>
          <Dashboard
            classrooms={classrooms}
            courses={courses}
            teachers={teachers}
            students={students}
            examschedules={examschedules}
            examslots={examslots}
            majors={majors}
            semesters={semesters}
          />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
