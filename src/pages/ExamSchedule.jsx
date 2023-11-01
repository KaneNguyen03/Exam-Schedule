import SubHeader from "../components/Layout/SubHeader"
import Sidebar from "../components/Layout/Sidebar"
import { useDispatch, useSelector } from "react-redux"
import examscheduleTypes from "../constants/examscheduleTypes"
import "../pages/CalendarStyles.css"
import DropdownSelectIcon from "../assets/svg/select_dropdown_icon.svg"

import {
  createExamschedule,
  generateExamschedule,
  getAllExamschedules,
  getExamScheduleByUsername,
} from "../store/thunks/examschedule"
import { useEffect, useRef } from "react"

import { Calendar, momentLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from "moment"
import { useState } from "react"
import { getAllExamslots, updateExamslot } from "../store/thunks/examslot"
import examslotTypes from "../constants/examslotTypes"
import classroomTypes from "../constants/classroomTypes"
import { getAllClassrooms } from "../store/thunks/classroom"
import ReactSelect from "react-select"
import teacherTypes from "../constants/teacherTypes"
import { getAllTeachers } from "../store/thunks/teacher"
import ReactDatePicker from "react-datepicker"
import { sizeOptions, timeOptions } from "../constants/commons/commons"
import { toast } from "react-toastify"
import useAuth from "../hooks/useAuth"
import { makeRoles } from "../utils/common"
import { useNavigate } from "react-router-dom"
import courseTypes from "../constants/courseTypes"
import { getAllCourses } from "../store/thunks/course"
import LoadingSpinner from "../constants/commons/loading-spinner/LoadingSpinner"
import { Pagination } from "react-headless-pagination"
import StatusButton from "../components/Status"
import { color } from "../constants/commons/styled"
import { CSVLink } from "react-csv"
import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
const ExamscheduleDashboard = () => {
  const navigate = useNavigate()
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    keyword: "",
  })
  const [selectedTab, setSelectedTab] = useState(false)
  const [isShowSelect, setIsShowSelect] = useState(false)
  const popupSelect = useRef(null)
  const { user } = useAuth()
  const dispatch = useDispatch()
  const dataexsl = useSelector((state) => state.examslot)
  const datacl = useSelector((state) => state.classroom)
  const datate = useSelector((state) => state.teacher)
  const dataco = useSelector((state) => state.course)
  const dataexs = useSelector((state) => state.examschedule)
  const examScheduleByUser = dataexs?.contents[
    examscheduleTypes.GET_EXAMSCHEDULE_BY_USERNAME
  ]?.data.data?.filter((item) => item !== null)

  const classrooms = datacl?.contents[classroomTypes.GET_CLASSROOMS]?.data?.data
  const teachers = datate?.contents[teacherTypes.GET_TEACHERS]?.data?.data
  const courses = dataco?.contents[courseTypes.GET_COURSES]?.data?.data
  const pagination = dataexs?.paginations[examscheduleTypes.GET_EXAMSCHEDULES]

  const paginationByUser =
    dataexs?.paginations[examscheduleTypes.GET_EXAMSCHEDULE_BY_USERNAME]
  const allExamSlots =
    dataexsl?.contents[examslotTypes.GET_EXAMSLOTS]?.data?.data

  // Tạo một bản sao của examScheduleByUser với thông tin ngày giờ từ allExamSlots
  const updatedExamScheduleByUser = examScheduleByUser?.map((schedule) => {
    const matchingSlot = allExamSlots?.find(
      (slot) => slot.examSlotId === schedule.examSlotId
    )
    if (matchingSlot) {
      const { date, startTime, endTime } = matchingSlot
      return { ...schedule, date, startTime, endTime }
    }
    return schedule
  })

  const [openModal, setOpenModal] = useState(false)
  const [currentExamSchedule, setCurrentExamSchedule] = useState()

  const optionsCourses = courses?.map((course) => ({
    value: course.courseId,
    label: course.courseId,
  }))
  const [selectedOption, setSelectedOption] = useState(null)
  const [loadings, setLoading] = useState(true)
  const examschedules =
    dataexs?.contents[examscheduleTypes.GET_EXAMSCHEDULES]?.payload?.data

  const convertDataExamSlots = allExamSlots?.map((item) => {
    const startDate = new Date(item.date)
    const endDate = new Date(item.date)
    startDate.setHours(item.startTime.substring(0, 2))
    endDate.setHours(item.endTime.substring(0, 2))
    startDate.setMinutes(item.startTime.substring(3, 5))
    endDate.setMinutes(item.endTime.substring(3, 5))
    startDate.setSeconds(0)
    endDate.setSeconds(0)
    return {
      title: item.examSlotId, // You can customize the title as needed
      start: startDate, // Convert the date string to a Date object
      end: endDate,
      listProctoring: item.listProctoring,
      examSlotId: item.examSlotId,
      examSlotName: item.examSlotName,
      status: item.status,
      startTime: item.startTime,
      endTime: item.endTime,
      date: item.date,
    }
  })

  const [selectedDate, setSelectedDate] = useState(null)
  const [openModalChoosingCourse, setOpenModalChoosingCourse] = useState(false)
  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  const [submitDataGenerator, setSubmitDataGenerator] = useState({
    courseId: "",
    examSlotId: "",
  })
  const headers = [
    { label: "examScheduleId", key: "examScheduleId" },
    { label: "examSlotId", key: "examSlotId" },
    { label: "classroomId", key: "classroomId" },
    { label: "courseId", key: "courseId" },
    { label: "proctoringId", key: "proctoringId" },
    { label: "studentListId", key: "studentListId" },
  ]
  const [exportData, setExportData] = useState([
    {
      examScheduleId: "",
      examSlotId: "",
      classroomId: "",
      courseId: "",
      proctoringId: "",
      studentListId: "",
    },
  ])
  const handleExportCSV = (e) => {
    e.preventDefault()
    const element = document.getElementById("exportCSV")
    element.click()
  }
  const handleSubmitExamSchedule = async () => {
    const newListProctorings = currentExamSchedule.listProctoring?.map(
      (item) => ({
        ...item,
        listExamSlot: [],
      })
    )

    const updateStatusExamslot = {
      examSlotId: currentExamSchedule.examSlotId,
      examSlotName: currentExamSchedule.examSlotName,
      date: currentExamSchedule.date,
      startTime: currentExamSchedule.startTime,
      endTime: currentExamSchedule.endTime,
      status: "pending",
      listProctoring: newListProctorings,
      courseId: currentExamSchedule.courseId,
    }

    await dispatch(updateExamslot(updateStatusExamslot))

    try {
      setTimeout(() => dispatch(generateExamschedule(submitDataGenerator)), 800)
    } catch (err) {
      toast.error("Error generate Exam Schedule")
    }

    setOpenModalChoosingCourse(false)
  }

  const localizer = momentLocalizer(moment)

  const eventStyleGetter = (event, start, end, isSelected) => {
    const currentTime = new Date()
    const isEventInProgress =
      event.start <= currentTime && event.end >= currentTime
    let backgroundColor = event.start < new Date() ? "#ccc" : "#dc3454"
    if (event.start >= new Date() && event.status === "pending") {
      backgroundColor = "#3174ad"
    }
    if (isEventInProgress) backgroundColor = "#ffd700"
    // Add more conditions for custom styling

    return {
      style: {
        backgroundColor,
      },
    }
  }

  const handleEventClick = (event) => {
    setOpenModalChoosingCourse(
      currentExamSchedule?.status.toLowerCase() === "active"
    )

    if (currentExamSchedule?.status === "pending") {
      navigate(`/examschedule/${currentExamSchedule.examSlotId}`)
    }
    // Handle the event click here
    // if (!event.proctoring)
    setOpenModal(true)
    // You can show more details or perform actions as needed
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
  }, [dataco, param])

  useEffect(() => {
    try {
      const delayDebounceFn = setTimeout(() => {
        dispatch(getAllClassrooms({ pageSize: 999, page: 1 }))
      }, 500)
      return () => clearTimeout(delayDebounceFn)
    } catch (error) {
      toast.error("Error getting exam rooms")
    }
    try {
      dispatch(getAllTeachers({ page: 1, pageSize: 999 }))
    } catch (error) {
      toast.error("Error getting proctoring")
    }
  }, [dispatch])

  useEffect(() => {
    if (examschedules?.data !== undefined) {
      const preprocessedData = examschedules?.data?.map((item) => ({
        ...item,
      }))
      setExportData(preprocessedData)
    }
  }, [dataexs, param, examschedules])

  useEffect(() => {
    try {
      const delayDebounceFn = setTimeout(() => {
        dispatch(getAllCourses({ page: 1, pageSize: 999 }))
      }, 500)
      return () => clearTimeout(delayDebounceFn)
    } catch (error) {
      toast.error("Error getting course")
    }
  }, [param.keyword, dispatch, param])

  useEffect(() => {
    try {
      dispatch(getAllExamschedules(param))
    } catch (error) {
      toast.error("Error getting examschedule")
    }
    try {
      dispatch(getAllExamslots())
    } catch (error) {
      toast.error("Error getting examslots")
    }
    try {
      dispatch(
        getExamScheduleByUsername({
          Username: user.username,
          page: param.page,
          pageSize: param.pageSize,
        })
      )
    } catch (error) {
      toast.error("Error getting examscheduleby username")
    }
  }, [dispatch, param])

  return (
    <div>
      {loadings && <LoadingSpinner />}
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <Sidebar />

        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
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
          {[...makeRoles([1, 2, 3, 4, 5])].includes(user.roleId) && (
            <div className=" text-slate-800 font-semibold text-3xl pt-8 pb-4 m-3">
              Exam Schedule Management
            </div>
          )}
          {/* {{[...makeRoles([1, 2])].includes(user.roleId) && (} */}
          {selectedTab ? (
            <div className="flex justify-end text-slate-800 font-semibold text-3xl p-10 pb-0 pt-0">
              <div>
                <div
                  className=" text-primary flex items-center justify-between  font-semibold h-8 md:h-10 w-32 md:w-44 text-xs md:text-sm border-solid border border-primary  rounded-2xl cursor-pointer"
                  onClick={() => setIsShowSelect(!isShowSelect)}
                >
                  <span className="pl-4">Show {pagination?.pageSize} item</span>
                  <img
                    src={DropdownSelectIcon}
                    className="pointer-events-none leading-[16px] md:leading-[20px] md:mr-4"
                    alt="drop icon"
                  />
                </div>
                {isShowSelect && (
                  <ul
                    ref={popupSelect}
                    className="text-left cursor-pointer absolute"
                  >
                    {sizeOptions?.map((item) => {
                      return (
                        <li
                          className="px-4 py-2 text-xs md:text-sm bg-gray-100 first:rounded-t-lg last:rounded-b-lg border-b last:border-b-0 z-10 hover:bg-gray-200"
                          onClick={() => {
                            setParam({
                              ...param,
                              pageSize: Number(item.value),
                            })
                            setIsShowSelect(false)
                          }}
                          key={item.value}
                        >
                          Show {item.value} items
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
              {[...makeRoles([3])].includes(user.roleId) && (
                <button
                  className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-900 mx-4"
                  onClick={(e) => {
                    handleExportCSV(e)
                  }}
                >
                  <span className="ml-2">Export Exam Slot</span>
                </button>
              )}
            </div>
          ) : (
            <></>
          )}
          {[...makeRoles([1, 2])].includes(user.roleId) && (
            <Tabs className={selectedTab ? "" : "pt-10"}>
              <TabList className="flex w-full justify-around py-2 px-2 bg-slate-800 text-white p-4">
                <Tab onClick={() => setSelectedTab(false)}>
                  <button className="text-base bg-inherit cursor-pointer">
                    Calendar
                  </button>
                </Tab>
                <Tab onClick={() => setSelectedTab(true)}>
                  <button className="text-base bg-inherit cursor-pointer">
                    Table
                  </button>
                </Tab>
              </TabList>
              <TabPanel>
                {[...makeRoles([1, 2, 3])].includes(user.roleId) && (
                  <div className="p-16 pt-4">
                    <Calendar
                      localizer={localizer}
                      events={convertDataExamSlots}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: 500 }}
                      eventPropGetter={eventStyleGetter}
                      onSelectEvent={(event) => {
                        setCurrentExamSchedule(event)
                        handleEventClick()
                      }} // Handle event click
                    />
                  </div>
                )}

                {openModalChoosingCourse ? (
                  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 z-[1000]">
                    <div className="modal absolute w-[28%] translate-x-[-50%] translate-y-[-50%] z-20 top-[50%] left-[50%]">
                      <div className="relativerounded-lg shadow bg-gray-700">
                        <div className="px-6 py-6 lg:px-8">
                          <h3 className="mb-4 text-xl font-medium  text-white">
                            Please choose course for this Slot
                          </h3>
                          <div>
                            <label className="mb-2 text-sm font-medium  text-white flex">
                              Examslot Id
                            </label>
                            <input
                              defaultValue={currentExamSchedule?.examSlotId}
                              className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                              placeholder=""
                              readOnly
                            />
                          </div>
                          <div className="my-4">
                            <label className="mb-2 text-sm font-medium  text-white flex">
                              Course
                            </label>
                            <ReactSelect
                              className="text-sm text-start"
                              options={optionsCourses}
                              isMulti={false}
                              onChange={(data) => {
                                setSubmitDataGenerator({
                                  examSlotId: currentExamSchedule.examSlotId,
                                  courseId: data.value,
                                })
                                setCurrentExamSchedule({
                                  ...currentExamSchedule,
                                  courseId: data.value,
                                })
                              }}
                            />
                          </div>
                          <div className="flex justify-between">
                            <div className="flex items-start text-red-500">
                              *This action can do only one
                            </div>
                          </div>
                          <div className="flex flex-row p-4 gap-5 items-end justify-center">
                            <button
                              type="submit"
                              className=" text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                              onClick={() => {
                                handleSubmitExamSchedule()
                              }}
                            >
                              Save
                            </button>
                            <button
                              type="submit"
                              className=" text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
                              onClick={() => setOpenModalChoosingCourse(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {[...makeRoles([1, 2])].includes(user.roleId) && (
                  <div className="p-4 grid grid-cols-4 justify-items-center">
                    {/* <!-- Gray Box --> */}
                    <div className="flex flex-row justify-around items-center gap-4 p-4 bg-gray-300 rounded-md w-80">
                      <div className="w-12 h-12 bg-gray-400 flex items-center justify-center rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white "
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <div className="text-gray-800">The Exam has finished</div>
                    </div>

                    {/* <!-- Red Box --> */}
                    <div className="flex flex-row justify-around items-center gap-4 w-80 p-4 bg-red-300 rounded-md">
                      <div className="w-12 h-12 bg-red-400 flex items-center justify-center rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </div>
                      <div className="text-red-800">Missing Course.</div>
                    </div>

                    {/* <!-- Blue Box --> */}
                    <div className="flex flex-row justify-around items-center gap-4 w-80 p-4 bg-blue-300 rounded-md">
                      <div className="w-12 h-12 bg-blue-400 flex items-center justify-center rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20 12H4"
                          ></path>
                        </svg>
                      </div>
                      <div className="text-blue-800">
                        Scheduled for the future.
                      </div>
                    </div>

                    {/* <!-- Yellow Box --> */}
                    <div className="flex flex-row justify-around items-center gap-4 w-80 p-4 bg-yellow-300 rounded-md">
                      <div className="w-12 h-12 bg-yellow-400 flex items-center justify-center rounded-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                      </div>
                      <div className="text-yellow-800">Exam in progress. </div>
                    </div>
                  </div>
                )}
              </TabPanel>

              <TabPanel>
                {[...makeRoles([1, 2])].includes(user.roleId) && (
                  <>
                    <div className="grid gap-4 p-8 pt-2 m-1 overflow-x-auto max-h-[76vh] overflow-y-scroll">
                      <table className=" text-sm text-left text-gray-400 ">
                        <thead className=" text-xs text-gray-300 uppercase  bg-gray-700 ">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              ExamScheduleId
                            </th>
                            <th scope="col" className="px-6 py-3">
                              ExamslotId
                            </th>
                            <th scope="col" className="px-6 py-3">
                              ClassroomId
                            </th>
                            <th scope="col" className="px-6 py-3">
                              courseId
                            </th>
                            <th scope="col" className="px-6 py-3">
                              proctoringId
                            </th>
                            <th scope="col" className="px-6 py-3">
                              studentListId
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {examschedules?.data?.map((examschedule) => (
                            <tr
                              className="bg-white border-b  border-gray-700"
                              key={examschedule?.examScheduleId}
                            >
                              <td className="px-6 py-4">
                                {examschedule.examScheduleId}
                              </td>
                              <td className="px-6 py-4">
                                {examschedule.examSlotId}
                              </td>
                              <td className="px-6 py-4">
                                {examschedule.classroomId}
                              </td>
                              <td className="px-6 py-4">
                                {examschedule.courseId}
                              </td>
                              <td className="px-6 py-4">
                                {examschedule.proctoringId}
                              </td>
                              <td className="px-6 py-4">
                                {examschedule.studentListId}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="sticky bottom-0 bg-white p-2 z-10">
                        {examschedules?.data?.length ? (
                          <Pagination
                            currentPage={pagination.currentPage - 1}
                            setCurrentPage={(page) => {
                              setParam({ ...param, page: page + 1 })
                            }}
                            totalPages={pagination.totalPage}
                            edgePageCount={3}
                            middlePagesSiblingCount={1}
                            className="flex items-center justify-center mt-4"
                            truncableText="..."
                            truncableClassName=""
                          >
                            <Pagination.PrevButton
                              className={`w-8 md:w-10 h-8 md:h-10 rounded-lg border-solid border border-primary ${
                                pagination.currentPage > 0
                                  ? "cursor-pointer "
                                  : "cursor-default hidden"
                              }`}
                            >
                              {" "}
                              <div className="w-full h-full flex justify-center items-center">
                                <svg
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>
                              </div>
                            </Pagination.PrevButton>

                            <div className="flex items-center justify-center mx-6 list-none ">
                              {examschedules?.data?.length > 0 ? (
                                <Pagination.PageButton
                                  activeClassName="bg-blue-button border-0 text-white "
                                  inactiveClassName="border"
                                  className="flex justify-center items-center rounded-lg border-solid  border-primary mx-1 w-10 h-10 cursor-pointer font-medium bg-slate-700 text-gray-300"
                                />
                              ) : (
                                <div className="flex justify-center items-center rounded-lg  mx-1 w-10 h-10 cursor-pointer font-medium bg-blue-button border-0 text-white">
                                  1
                                </div>
                              )}
                            </div>

                            <Pagination.NextButton
                              className={`w-8 md:w-10 h-8 md:h-10 rounded-lg border-solid border border-primary  ${(
                                page
                              ) =>
                                page > examschedules?.data?.length
                                  ? "cursor-pointer"
                                  : "cursor-not-allowed"}`}
                            >
                              <div className="w-full h-full flex justify-center items-center">
                                <svg
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  className="w-6 h-6 "
                                >
                                  <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                </svg>
                              </div>
                            </Pagination.NextButton>
                          </Pagination>
                        ) : null}
                      </div>
                    </div>
                  </>
                )}
              </TabPanel>
            </Tabs>
          )}
          {/* {[...makeRoles([4])].includes(user.roleId) && (
            <>
              <div className="grid gap-4 p-8 pt-2 m-1 overflow-x-auto max-h-[76vh] overflow-y-scroll">
                <table className=" text-sm text-left text-gray-400 ">
                  <thead className=" text-xs text-gray-300 uppercase  bg-gray-700 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ExamScheduleId
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ExamslotId
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ClassroomId
                      </th>
                      <th scope="col" className="px-6 py-3">
                        proctoringId
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {examschedules?.data?.map((examschedule) => (
                      <tr
                        className="bg-white border-b  border-gray-700"
                        key={examschedule?.examScheduleId}
                      >
                        <td className="px-6 py-4">
                          {examschedule.examScheduleId}
                        </td>
                        <td className="px-6 py-4">{examschedule.examSlotId}</td>
                        <td className="px-6 py-4">
                          {examschedule.classroomId}
                        </td>
                        <td className="px-6 py-4">
                          {examschedule.proctoringId}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="sticky bottom-0 bg-white p-2 z-10">
                  {examschedules?.data?.length ? (
                    <Pagination
                      currentPage={pagination.currentPage - 1}
                      setCurrentPage={(page) => {
                        setParam({ ...param, page: page + 1 })
                      }}
                      totalPages={pagination.totalPage}
                      edgePageCount={3}
                      middlePagesSiblingCount={1}
                      className="flex items-center justify-center mt-4"
                      truncableText="..."
                      truncableClassName=""
                    >
                      <Pagination.PrevButton
                        className={`w-8 md:w-10 h-8 md:h-10 rounded-lg border-solid border border-primary ${
                          pagination.currentPage > 0
                            ? "cursor-pointer "
                            : "cursor-default hidden"
                        }`}
                      >
                        {" "}
                        <div className="w-full h-full flex justify-center items-center">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                          </svg>
                        </div>
                      </Pagination.PrevButton>

                      <div className="flex items-center justify-center mx-6 list-none ">
                        {examschedules?.data?.length > 0 ? (
                          <Pagination.PageButton
                            activeClassName="bg-blue-button border-0 text-white "
                            inactiveClassName="border"
                            className="flex justify-center items-center rounded-lg border-solid  border-primary mx-1 w-10 h-10 cursor-pointer font-medium bg-slate-700 text-gray-300"
                          />
                        ) : (
                          <div className="flex justify-center items-center rounded-lg  mx-1 w-10 h-10 cursor-pointer font-medium bg-blue-button border-0 text-white">
                            1
                          </div>
                        )}
                      </div>

                      <Pagination.NextButton
                        className={`w-8 md:w-10 h-8 md:h-10 rounded-lg border-solid border border-primary  ${(
                          page
                        ) =>
                          page > examschedules?.data?.length
                            ? "cursor-pointer"
                            : "cursor-not-allowed"}`}
                      >
                        <div className="w-full h-full flex justify-center items-center">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 "
                          >
                            <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                          </svg>
                        </div>
                      </Pagination.NextButton>
                    </Pagination>
                  ) : null}
                </div>
              </div>
            </>
          )} */}
          {[...makeRoles([3])].includes(user.roleId) && (
            <>
              <div className="flex justify-end text-slate-800 font-semibold text-3xl p-10 pb-0 pt-0">
                <div>
                  <div
                    className=" text-primary flex items-center justify-between  font-semibold h-8 md:h-10 w-32 md:w-44 text-xs md:text-sm border-solid border border-primary  rounded-2xl cursor-pointer"
                    onClick={() => setIsShowSelect(!isShowSelect)}
                  >
                    <span className="pl-4">
                      Show {pagination?.pageSize} item
                    </span>
                    <img
                      src={DropdownSelectIcon}
                      className="pointer-events-none leading-[16px] md:leading-[20px] md:mr-4"
                      alt="drop icon"
                    />
                  </div>
                  {isShowSelect && (
                    <ul
                      ref={popupSelect}
                      className="text-left cursor-pointer absolute"
                    >
                      {sizeOptions?.map((item) => {
                        return (
                          <li
                            className="px-4 py-2 text-xs md:text-sm bg-gray-100 first:rounded-t-lg last:rounded-b-lg border-b last:border-b-0 z-10 hover:bg-gray-200"
                            onClick={() => {
                              setParam({
                                ...param,
                                pageSize: Number(item.value),
                              })
                              setIsShowSelect(false)
                            }}
                            key={item.value}
                          >
                            Show {item.value} items
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
                <button
                  className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-900 mx-4"
                  onClick={(e) => {
                    handleExportCSV(e)
                  }}
                >
                  <span className="ml-2">Export Exam Slot</span>
                </button>
              </div>
              <div className="grid gap-4 p-8 pt-2 m-1 overflow-x-auto max-h-[76vh] overflow-y-scroll">
                <table className=" text-sm text-left text-gray-400 ">
                  <thead className=" text-xs text-gray-300 uppercase  bg-gray-700 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ExamScheduleId
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ExamslotId
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ClassroomId
                      </th>
                      <th scope="col" className="px-6 py-3">
                        courseId
                      </th>
                      <th scope="col" className="px-6 py-3">
                        proctoringId
                      </th>
                      <th scope="col" className="px-6 py-3">
                        studentListId
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {examschedules?.data?.map((examschedule) => (
                      <tr
                        className="bg-white border-b  border-gray-700"
                        key={examschedule?.examScheduleId}
                      >
                        <td className="px-6 py-4">
                          {examschedule.examScheduleId}
                        </td>
                        <td className="px-6 py-4">{examschedule.examSlotId}</td>
                        <td className="px-6 py-4">
                          {examschedule.classroomId}
                        </td>
                        <td className="px-6 py-4">{examschedule.courseId}</td>
                        <td className="px-6 py-4">
                          {examschedule.proctoringId}
                        </td>
                        <td className="px-6 py-4">
                          {examschedule.studentListId}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="sticky bottom-0 bg-white p-2 z-10">
                  {examschedules?.data?.length ? (
                    <Pagination
                      currentPage={pagination.currentPage - 1}
                      setCurrentPage={(page) => {
                        setParam({ ...param, page: page + 1 })
                      }}
                      totalPages={pagination.totalPage}
                      edgePageCount={3}
                      middlePagesSiblingCount={1}
                      className="flex items-center justify-center mt-4"
                      truncableText="..."
                      truncableClassName=""
                    >
                      <Pagination.PrevButton
                        className={`w-8 md:w-10 h-8 md:h-10 rounded-lg border-solid border border-primary ${
                          pagination.currentPage > 0
                            ? "cursor-pointer "
                            : "cursor-default hidden"
                        }`}
                      >
                        {" "}
                        <div className="w-full h-full flex justify-center items-center">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                          </svg>
                        </div>
                      </Pagination.PrevButton>

                      <div className="flex items-center justify-center mx-6 list-none ">
                        {examschedules?.data?.length > 0 ? (
                          <Pagination.PageButton
                            activeClassName="bg-blue-button border-0 text-white "
                            inactiveClassName="border"
                            className="flex justify-center items-center rounded-lg border-solid  border-primary mx-1 w-10 h-10 cursor-pointer font-medium bg-slate-700 text-gray-300"
                          />
                        ) : (
                          <div className="flex justify-center items-center rounded-lg  mx-1 w-10 h-10 cursor-pointer font-medium bg-blue-button border-0 text-white">
                            1
                          </div>
                        )}
                      </div>

                      <Pagination.NextButton
                        className={`w-8 md:w-10 h-8 md:h-10 rounded-lg border-solid border border-primary  ${(
                          page
                        ) =>
                          page > examschedules?.data?.length
                            ? "cursor-pointer"
                            : "cursor-not-allowed"}`}
                      >
                        <div className="w-full h-full flex justify-center items-center">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 "
                          >
                            <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                          </svg>
                        </div>
                      </Pagination.NextButton>
                    </Pagination>
                  ) : null}
                </div>
              </div>
            </>
          )}

          {[...makeRoles([4, 5])].includes(user.roleId) && (
            <>
              <div className="flex justify-end text-slate-800 font-semibold text-3xl p-10 pb-0 pt-0">
                <div>
                  <div
                    className=" text-primary flex items-center justify-between  font-semibold h-8 md:h-10 w-32 md:w-44 text-xs md:text-sm border-solid border border-primary  rounded-2xl cursor-pointer"
                    onClick={() => setIsShowSelect(!isShowSelect)}
                  >
                    <span className="pl-4">
                      Show {pagination?.pageSize} item
                    </span>
                    <img
                      src={DropdownSelectIcon}
                      className="pointer-events-none leading-[16px] md:leading-[20px] md:mr-4"
                      alt="drop icon"
                    />
                  </div>
                  {isShowSelect && (
                    <ul
                      ref={popupSelect}
                      className="text-left cursor-pointer absolute"
                    >
                      {sizeOptions?.map((item) => {
                        return (
                          <li
                            className="px-4 py-2 text-xs md:text-sm bg-gray-100 first:rounded-t-lg last:rounded-b-lg border-b last:border-b-0 z-10 hover:bg-gray-200"
                            onClick={() => {
                              setParam({
                                ...param,
                                pageSize: Number(item.value),
                              })
                              setIsShowSelect(false)
                            }}
                            key={item.value}
                          >
                            Show {item.value} items
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </div>
              <div className="grid gap-4 p-8 pt-2 m-1 overflow-x-auto max-h-[76vh] overflow-y-scroll">
                <table className=" text-sm text-left text-gray-400 ">
                  <thead className=" text-xs text-gray-300 uppercase  bg-gray-700 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        ExamScheduleId
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ExamslotId
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ClassroomId
                      </th>
                      {makeRoles([5]).includes(user.roleId) && (
                        <th scope="col" className="px-6 py-3">
                          courseId
                        </th>
                      )}
                      {makeRoles([4]).includes(user.roleId) && (
                        <th scope="col" className="px-6 py-3">
                          Proctoring
                        </th>
                      )}
                      <th scope="col" className="px-6 py-3">
                        Start Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        End Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {updatedExamScheduleByUser?.map((examschedule) => (
                      <tr
                        className="bg-white border-b  border-gray-700"
                        key={examschedule?.examScheduleId}
                      >
                        <td className="px-6 py-4">
                          {examschedule?.examScheduleId}
                        </td>
                        <td className="px-6 py-4">
                          {examschedule?.examSlotId}
                        </td>
                        <td className="px-6 py-4">
                          {examschedule?.classroomId}
                        </td>
                        {makeRoles([5]).includes(user.roleId) && (
                          <td className="px-6 py-4">
                            {examschedule?.courseId}
                          </td>
                        )}
                        {makeRoles([4]).includes(user.roleId) && (
                          <td className="px-6 py-4">
                            {examschedule?.proctoringId}
                          </td>
                        )}
                         <td className="px-6 py-4">
                         {examschedule.startTime.substring(0, 5)}
                         </td>
                         <td className="px-6 py-4">
                         {examschedule.endTime.substring(0, 5)}
                         </td>
                         <td className="px-6 py-4">
                         {moment(examschedule.date).format("DD/MM/YYYY")}
                         </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="sticky bottom-0 bg-white p-2 z-10">
                  {updatedExamScheduleByUser?.length ? (
                    <Pagination
                      currentPage={paginationByUser.currentPage - 1}
                      setCurrentPage={(page) => {
                        setParam({ ...param, page: page + 1 })
                      }}
                      totalPages={paginationByUser.totalPage}
                      edgePageCount={3}
                      middlePagesSiblingCount={1}
                      className="flex items-center justify-center mt-4"
                      truncableText="..."
                      truncableClassName=""
                    >
                      <Pagination.PrevButton
                        className={`w-8 md:w-10 h-8 md:h-10 rounded-lg border-solid border border-primary ${
                          paginationByUser.currentPage > 0
                            ? "cursor-pointer "
                            : "cursor-default hidden"
                        }`}
                      >
                        {" "}
                        <div className="w-full h-full flex justify-center items-center">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                          </svg>
                        </div>
                      </Pagination.PrevButton>

                      <div className="flex items-center justify-center mx-6 list-none ">
                        {updatedExamScheduleByUser?.length > 0 ? (
                          <Pagination.PageButton
                            activeClassName="bg-blue-button border-0 text-white "
                            inactiveClassName="border"
                            className="flex justify-center items-center rounded-lg border-solid  border-primary mx-1 w-10 h-10 cursor-pointer font-medium bg-slate-700 text-gray-300"
                          />
                        ) : (
                          <div className="flex justify-center items-center rounded-lg  mx-1 w-10 h-10 cursor-pointer font-medium bg-blue-button border-0 text-white">
                            1
                          </div>
                        )}
                      </div>

                      <Pagination.NextButton
                        className={`w-8 md:w-10 h-8 md:h-10 rounded-lg border-solid border border-primary  ${(
                          page
                        ) =>
                          page > updatedExamScheduleByUser?.length
                            ? "cursor-pointer"
                            : "cursor-not-allowed"}`}
                      >
                        <div className="w-full h-full flex justify-center items-center">
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 "
                          >
                            <path d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                          </svg>
                        </div>
                      </Pagination.NextButton>
                    </Pagination>
                  ) : null}
                </div>
              </div>
            </>
          )}
        </main>
        <div></div>
      </div>
      <CSVLink
        data={exportData} // data truyen vao
        filename={`${"ExamSlotExport"}.csv`}
        headers={headers}
        id="exportCSV"
      />
    </div>
  )
}

export default ExamscheduleDashboard
