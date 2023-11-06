//action
import { getAllClassrooms } from "../store/thunks/classroom"

//layout
import Sidebar from "../components/Layout/Sidebar"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import classroomTypes from "../constants/classroomTypes"
import { getAllCourses } from "../store/thunks/course"
import courseTypes from "../constants/courseTypes"
import { getAllTeachers } from "../store/thunks/teacher"
import teacherTypes from "../constants/teacherTypes"
import studentTypes from "../constants/studentTypes"
import { getAllStudents } from "../store/thunks/student"
import majorTypes from "../constants/majorTypes"
import { getAllExamschedules } from "../store/thunks/examschedule"
import { getAllExamslots } from "../store/thunks/examslot"
import { getAllMajors } from "../store/thunks/major"
import semesterTypes from "../constants/semesterTypes"
import { getAllSemesters } from "../store/thunks/semester"
import examslotTypes from "../constants/examslotTypes"
import examscheduleTypes from "../constants/examscheduleTypes"
import alluserTypes from "../constants/alluserTypes"
import { getAllusers } from "../store/thunks/alluser"
import { toast } from "react-toastify"
import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"
import { makeRoles } from "../utils/common"
import { Bar, Line, Pie } from "react-chartjs-2"
import "chart.js/auto"

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    keyword: "",
  })
  const { user } = useAuth()
  const datacl = useSelector((state) => state.classroom)
  const dataco = useSelector((state) => state.course)
  const datate = useSelector((state) => state.teacher)
  const datast = useSelector((state) => state.student)
  const dataexs = useSelector((state) => state.examschedule)
  const dataexsl = useSelector((state) => state.examslot)
  const datamj = useSelector((state) => state.major)
  const datase = useSelector((state) => state.semester)

  const datauser = useSelector((state) => state.alluser)

  const allusers = datauser?.contents[alluserTypes.GET_ALLUSERS]?.data.data
  const classrooms = datacl?.contents[classroomTypes.GET_CLASSROOMS]?.data.data
  const teachers = datate?.contents[teacherTypes.GET_TEACHERS]?.data.data
  const examslots = dataexsl?.contents[examslotTypes.GET_EXAMSLOTS]?.data?.data
  const students = datast?.contents[studentTypes.GET_STUDENTS]?.data.data
  const courses = dataco?.contents[courseTypes.GET_COURSES]?.data.data
  const examschedules =
    dataexs?.contents[examscheduleTypes.GET_EXAMSCHEDULES]?.payload?.data
  const majors = datamj?.contents[majorTypes.GET_MAJORS]?.data.data
  const semesters = datase?.contents[semesterTypes.GET_SEMESTERS]?.data.data
  const [loadings, setLoading] = useState(true)

  const currentTeacher = teachers?.find(
    (teacher) => teacher.proctoringName === user.username.toLowerCase()
  )

  const examSlotData = {
    labels: [],
    datasets: [
      {
        label: "Compensation",
        data: [],
        backgroundColor: [],
      },
    ],
  }

  // Đảm bảo rằng dữ liệu thời gian được tính toán đúng đơn vị
  const startTimes = examslots?.map(
    (slot) => new Date(`1970-01-01T${slot.startTime}`)
  )
  const endTimes = examslots?.map(
    (slot) => new Date(`1970-01-01T${slot.endTime}`)
  )

  // Tạo dữ liệu cho biểu đồ đường
  const timeData = {
    labels: examslots?.map((slot) => slot.examSlotName),
    datasets: [
      {
        label: "Start Time",
        data: startTimes?.map((time) => time.getHours()), // Hiển thị theo giờ
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "End Time",
        data: endTimes?.map((time) => time.getHours()), // Hiển thị theo giờ
        borderColor: "rgba(192, 75, 192, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  }

  // Xử lý dữ liệu từ examslots
  examslots?.forEach((examSlot) => {
    examSlotData.labels.push(examSlot.examSlotName)
    const compensation = examSlot.listProctoring.reduce(
      (totalCompensation, proctor) =>
        totalCompensation + parseFloat(proctor.compensation),
      0
    )
    examSlotData.datasets[0].data.push(compensation)

    // Tạo màu sắc ngẫu nhiên cho cột biểu đồ
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`
    examSlotData.datasets[0].backgroundColor.push(randomColor)
  })

  // Thực hiện thống kê số lượng khung thời gian coi thi mà mỗi giám thị tham gia
  const proctorData = examslots?.reduce((proctorStats, slot) => {
    slot.listProctoring.forEach((proctor) => {
      const proctorName = proctor.proctoringName
      proctorStats[proctorName] = (proctorStats[proctorName] || 0) + 1
    })
    return proctorStats
  }, {})

  // Tạo dữ liệu cho biểu đồ Pie Chart
  const pieChartData = {
    labels: Object?.keys(proctorData ? proctorData : ""),
    datasets: [
      {
        data: Object?.values(proctorData ? proctorData : ""),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          // Thêm màu nền cho các giám thị khác (nếu cần)
        ],
      },
    ],
  }

  useEffect(() => {
    if (
      dataco?.loadings[courseTypes.GET_COURSES] ||
      dataco?.loadings[courseTypes.CREATE_COURSE] ||
      dataco?.loadings[courseTypes.UPDATE_COURSE] ||
      dataco?.loadings[courseTypes.DELETE_COURSE]
    )
      setLoading(true)
    else setLoading(false)
  }, [dataco])

  useEffect(() => {
    if (
      datase?.loadings[semesterTypes.GET_SEMESTERS] ||
      datase?.loadings[semesterTypes.CREATE_SEMESTER] ||
      datase?.loadings[semesterTypes.UPDATE_SEMESTER] ||
      datase?.loadings[semesterTypes.DELETE_SEMESTER]
    )
      setLoading(true)
    else setLoading(false)
  }, [datase])
  useEffect(() => {
    if (
      dataexsl?.loadings[examslotTypes.GET_EXAMSLOTS] ||
      dataexsl?.loadings[examslotTypes.CREATE_EXAMSLOT] ||
      dataexsl?.loadings[examslotTypes.UPDATE_EXAMSLOT] ||
      dataexsl?.loadings[examslotTypes.DELETE_EXAMSLOT]
    )
      setLoading(true)
    else setLoading(false)
  }, [dataexsl])

  useEffect(() => {
    if (
      datacl?.loadings[classroomTypes.GET_CLASSROOMS] ||
      datacl?.loadings[classroomTypes.CREATE_CLASSROOM] ||
      datacl?.loadings[classroomTypes.UPDATE_CLASSROOM] ||
      datacl?.loadings[classroomTypes.DELETE_CLASSROOM]
    )
      setLoading(true)
    else setLoading(false)
  }, [datacl])
  useEffect(() => {
    if (
      datauser?.loadings[alluserTypes.GET_ALLUSERS] ||
      datauser?.loadings[alluserTypes.CREATE_ALLUSER] ||
      datauser?.loadings[alluserTypes.UPDATE_ALLUSER] ||
      datauser?.loadings[alluserTypes.DELETE_ALLUSER]
    )
      setLoading(true)
    else setLoading(false)
  }, [datauser])
  useEffect(() => {
    if (
      datate?.loadings[teacherTypes.GET_TEACHERS] ||
      datate?.loadings[teacherTypes.CREATE_TEACHER] ||
      datate?.loadings[teacherTypes.UPDATE_TEACHER] ||
      datate?.loadings[teacherTypes.DELETE_TEACHER]
    )
      setLoading(true)
    else setLoading(false)
  }, [datate])
  useEffect(() => {
    if (
      datast?.loadings[studentTypes.GET_STUDENTS] ||
      datast?.loadings[studentTypes.CREATE_STUDENT] ||
      datast?.loadings[studentTypes.UPDATE_STUDENT] ||
      datast?.loadings[studentTypes.DELETE_STUDENT]
    )
      setLoading(true)
    else setLoading(false)
  }, [datast])

  useEffect(() => {
    try {
      dispatch(getAllClassrooms({ page: 1, pageSize: 999 }))
    } catch (error) {
      toast.error("Error getting classroom")
    }
    try {
      dispatch(getAllCourses({ page: 1, pageSize: 999 }))
    } catch (error) {
      toast.error("Error getting course")
    }
    try {
      dispatch(getAllTeachers({ page: 1, pageSize: 9999 }))
    } catch (error) {
      toast.error("Error getting proctoring")
    }
    try {
      dispatch(getAllusers({ page: 1, pageSize: 999999 }))
    } catch (error) {
      toast.error("Error getting users")
    }
    try {
      dispatch(getAllStudents({ page: 1, pageSize: 99999 }))
    } catch (error) {
      toast.error("Error getting students")
    }
    try {
      dispatch(getAllExamschedules({ page: 1, pageSize: 999 }))
    } catch (error) {
      toast.error("Error getting examschedule")
    }
    try {
      dispatch(getAllExamslots({ page: 1, pageSize: 999 }))
    } catch (error) {
      toast.error("Error getting examslot")
    }
    try {
      dispatch(getAllMajors({ page: 1, pageSize: 999 }))
    } catch (error) {
      toast.error("Error getting majors")
    }

    try {
      dispatch(getAllSemesters({ page: 1, pageSize: 999 }))
    } catch (error) {
      toast.error("Error getting semesters")
    }
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
                    onChange={(e) => {
                      setParam({
                        ...param,
                        keyword: e.target.value,
                      })
                    }}
                    value={param.keyword}
                  />
                </div>
                <div className="flex md:hidden">
                  <a
                    href=""
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
                      {user.username}
                    </span>
                    <span className="truncate w-20 text-gray-500 text-xs leading-none mt-1">
                      {user.roleId === "AD"
                        ? "Admin"
                        : user.roleId === "TA"
                        ? "Testing Admin"
                        : user.roleId === "TS"
                        ? "Testing Staff"
                        : user.roleId === "ST"
                        ? "Student"
                        : user.roleId === "LT"
                        ? "Lecturer"
                        : ""}
                    </span>
                  </span>
                </a>
              </div>
              <div></div>
            </div>
          </header>
          <div className="w-full p-6">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid grid-cols-2 gap-6 mt-8">
              {[...makeRoles([1, 2])].includes(user.roleId) && (
                <>
                  <Link to="/proctoring" className="dashboard-card">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-inherit font-bold">Proctoring</h2>
                      <p className="mt-4">{teachers?.length}</p>
                    </div>
                  </Link>
                  <Link to="/student" className="dashboard-card">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-inherit font-bold">Student List</h2>
                      <p className="mt-4">{students?.length}</p>
                    </div>
                  </Link>
                  <Link to="/room" className="dashboard-card">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-inherit font-bold">Classrooms</h2>
                      <p className="mt-4">{classrooms?.length}</p>
                    </div>
                  </Link>
                  <Link to="/alluser" className="dashboard-card">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-inherit font-bold">User</h2>
                      <p className="mt-4">{allusers?.length}</p>
                    </div>
                  </Link>
                </>
              )}
              {[...makeRoles([4])].includes(user.roleId) && (
                <>
                  <>
                    <Link to="/proctoring" className="dashboard-card">
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-inherit font-bold">Proctoring</h2>
                        <p className="mt-4">{teachers?.length}</p>
                      </div>
                    </Link>
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-inherit font-bold">Compensation</h2>
                      <p className="mt-4">
                        {currentTeacher?.compensation
                          ? currentTeacher?.compensation * 4
                          : 0}
                        $
                      </p>
                    </div>
                  </>
                  <div className="bg-white rounded-lg shadow-md p-6 ">
                    <h2 className="text-inherit font-bold">Exam Slot Chart</h2>
                    {examSlotData ? <Bar data={examSlotData} /> : <></>}
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-inherit font-bold">Time Chart</h2>

                    {pieChartData ? (
                      <Pie data={pieChartData} className="max-h-80 my-8" />
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              )}
              {[...makeRoles([3])].includes(user.roleId) && (
                <>
                  <div className="bg-white rounded-lg shadow-md p-6 dashboard-card">
                    <h2 className="text-inherit font-bold">Course</h2>
                    <p className="mt-4">{courses?.length}</p>
                  </div>
                  <Link to="/examschedule" className="dashboard-card">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h2 className="text-inherit font-bold">Exam Schedule</h2>
                      <p className="mt-4">{examschedules?.length}</p>
                    </div>
                  </Link>
                  <div className="bg-white rounded-lg shadow-md p-6 dashboard-card">
                    <h2 className="text-inherit font-bold">Exam Slot</h2>
                    <p className="mt-4">{examslots?.length}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-md p-6 dashboard-card">
                    <h2 className="text-inherit font-bold">Major</h2>
                    <p className="mt-4">{majors?.length}</p>
                  </div>
                </>
              )}
            </div>
            {[...makeRoles([1, 2])].includes(user.roleId) && (
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 dashboard-card">
                  <h2 className="text-inherit font-bold">Exam Slot Chart</h2>
                  {examSlotData?.labels?.length > 0 && (
                    <Bar data={examSlotData} />
                  )}
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 dashboard-card">
                  <h2 className="text-inherit font-bold">Time Chart</h2>
                  {timeData?.labels?.length > 0 && <Line data={timeData} />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
