import SubHeader from "../components/Layout/SubHeader"
import Sidebar from "../components/Layout/Sidebar"
import { useDispatch, useSelector } from "react-redux"
import examscheduleTypes from "../constants/examscheduleTypes"
import "../pages/CalendarStyles.css"
import {
  createExamschedule,
  generateExamschedule,
  getAllExamschedules,
} from "../store/thunks/examschedule"
import { useEffect } from "react"

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
import { timeOptions } from "../constants/commons/commons"
import { toast } from "react-toastify"
import useAuth from "../hooks/useAuth"
import { makeRoles } from "../utils/common"
import { useNavigate } from "react-router-dom"
import courseTypes from "../constants/courseTypes"
import { getAllCourses } from "../store/thunks/course"
import LoadingSpinner from "../constants/commons/loading-spinner/LoadingSpinner"

const ExamscheduleDashboard = () => {
  const navigate = useNavigate()
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    keyword: "",
  })
  const { user } = useAuth()
  const dispatch = useDispatch()
  const dataexsl = useSelector((state) => state.examslot)
  const datacl = useSelector((state) => state.classroom)
  const datate = useSelector((state) => state.teacher)
  const dataco = useSelector((state) => state.course)
  const classrooms = datacl?.contents[classroomTypes.GET_CLASSROOMS]?.data?.data
  const teachers = datate?.contents[teacherTypes.GET_TEACHERS]?.data?.data
  const courses = dataco?.contents[courseTypes.GET_COURSES]?.data?.data

  const allExamSlots =
    dataexsl?.contents[examslotTypes.GET_EXAMSLOTS]?.data?.data

  const [openModal, setOpenModal] = useState(false)
  const [currentExamSchedule, setCurrentExamSchedule] = useState()


  // const options = teachers?.map((teacher) => ({
  //   value: teacher.proctoringId,
  //   label: teacher.proctoringId + " : " + teacher.proctoringName,
  // }))
  // const optionsClassroom = classrooms?.map((classroom) => ({
  //   value: classroom.classroomId,
  //   label: classroom.classroomId + " : " + classroom.name,
  // }))
  const optionsCourses = courses?.map((course) => ({
    value: course.courseId,
    label: course.courseId,
  }))
  const [selectedOption, setSelectedOption] = useState(null)
  const [loadings, setLoading] = useState(true)

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

  // const convertDataExamSlots = connectedData
  //   ?.filter((item) => item?.status === "Active")
  //   ?.map((item) => {
  //     const startDate = new Date(item.date);
  //     const endDate = new Date(item.date);
  //     startDate.setHours(item.startTime.substring(0, 2));
  //     endDate.setHours(item.endTime.substring(0, 2));
  //     startDate.setMinutes(item.startTime.substring(3, 5));
  //     endDate.setMinutes(item.endTime.substring(3, 5));
  //     startDate.setSeconds(0);
  //     endDate.setSeconds(0);
  //     return {
  //       title: item.examSlotId, // You can customize the title as needed
  //       start: startDate, // Convert the date string to a Date object
  //       end: endDate,
  //       proctoringId: item.proctoringId,
  //       classroomId: item.classroomId,
  //       courseId: item.courseId,
  //       examScheduleId: item.examScheduleId,
  //       examSlotId: item.examSlotId,
  //       examSlotName: item.examSlotName,
  //       status: item.status,
  //     };
  //   });
  //setup DATE selection
  const [selectedDate, setSelectedDate] = useState(null)
  const [openModalChoosingCourse, setOpenModalChoosingCourse] = useState(false)
  const handleDateChange = (date) => {
    setSelectedDate(date)
  }
  const [submitDataGenerator, setSubmitDataGenerator] = useState({
    courseId: "",
    examSlotId: "",
  })

  const handleSubmitExamSchedule = async () => {
    const newListProctorings = currentExamSchedule.listProctoring.map(
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

  // const UpdateExamSchedule = () => {
  //   try {
  //     dispatch(createExamschedule(currentExamSchedule))
  //     toast.success("Exam Schedule updated")
  //   } catch (error) {
  //     toast.error("Error updating exam schedule")
  //   }
  // }

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
      dispatch(getAllExamschedules())
    } catch (error) {
      toast.error("Error getting examschedule")
    }
    try {
      dispatch(getAllExamslots())
    } catch (error) {
      toast.error("Error getting examslots")
    }
  }, [dispatch])

  return (
    <div>
      {loadings && <LoadingSpinner />}
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <Sidebar />
        {[...makeRoles([1, 2])].includes(user.roleId) && (
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
            <div className=" text-slate-800 font-semibold text-3xl p-1">
              Exam Schedule
            </div>
            <div className="p-12">
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
            {/* {openModal ? (
              <div className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-40 z-[1000]">
                <div className="modal absolute w-[30%] translate-x-[-50%] translate-y-[-50%]  z-20 top-[50%] left-[50%]">
                  <div className="modal-content ">
                    <div className="relativerounded-lg shadow bg-gray-700">
                      <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                        data-modal-hide="authentication-modal"
                        onClick={() => setOpenModal(false)}
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                      <div className="px-6 py-6 lg:px-8">
                        <h3 className="mb-4 text-xl font-medium  text-white">
                          Exam Schedule Details
                        </h3>
                        <div>
                          <label className="mb-2 text-sm font-medium  text-white flex">
                            Exam Schedule Id
                          </label>
                          <input
                            className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                            placeholder=""
                            readOnly
                            value={currentExamSchedule.examScheduleId}
                          />
                        </div>
                        <div>
                          <label className="mb-2 text-sm font-medium  text-white flex">
                            Exam Slot Id
                          </label>
                          <input
                            className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                            placeholder=""
                            readOnly
                            value={currentExamSchedule.examSlotId}
                          />
                        </div>
                        <div>
                          <label className="mb-2 text-sm font-medium text-white flex">
                            Examslot Name
                          </label>
                          <input
                            className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                            placeholder=""
                            readOnly
                            value={currentExamSchedule.examSlotId}
                          />
                        </div>
                        <div>
                          <label className="mb-2 text-sm font-medium  text-white flex">
                            proctoringId
                          </label>
                          <ReactSelect
                            className="text-sm text-start"
                            options={options}
                            isMulti={false}
                            defaultValue={
                              currentExamSchedule
                                ? options.find(
                                    (option) =>
                                      option.value ===
                                      currentExamSchedule.proctoringId
                                  )
                                : null
                            }
                          />
                        </div>
                        <div className="">
                          <label className="mb-2 text-sm font-medium text-white flex">
                            Classroom
                          </label>
                          <ReactSelect
                            className="text-sm text-start"
                            options={optionsClassroom}
                            isMulti={false}
                            defaultValue={
                              currentExamSchedule
                                ? optionsClassroom.find(
                                    (option) =>
                                      option.value ===
                                      currentExamSchedule.classroomId
                                  )
                                : null
                            }
                          />
                        </div>
                        <label className="mb-2 text-sm font-medium text-white flex">
                          Date
                        </label>
                        <div className="flex">
                          <ReactDatePicker
                            selected={new Date(currentExamSchedule.start)}
                            onChange={handleDateChange}
                            dateFormat="dd-MM-yyyy"
                            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white flex justify-start"
                          />
                        </div>
                        <label className="mb-2 text-sm font-medium text-white flex">
                          Start time
                        </label>
                        <div className="flex">
                          <ReactSelect
                            options={timeOptions}
                            isMulti={false}
                            defaultValue={
                              timeOptions
                                ? timeOptions.find(
                                    (option) =>
                                      option.value[0] ===
                                      currentExamSchedule?.start
                                        ?.toString()
                                        .slice(16, 25)
                                        .trim()
                                  )
                                : null
                            }
                            onChange={(selectedOption) => {
                              // Update the proctoringLocation in the currentTeacher state
                              // setCurrentExamslot((prevExamslot) => ({
                              //   ...prevExamslot,
                              //   startTime: selectedOption
                              //     ? selectedOption.value[0]
                              //     : null,
                              //   endTime: selectedOption
                              //     ? selectedOption.value[1]
                              //     : null,
                              // }))

                              // Update the selectedOption state
                              setSelectedOption(
                                selectedOption ? selectedOption.value : null
                              )

                              // setAddData({
                              //   ...addData,
                              //   startTime: selectedOption.value[0],
                              //   endTime: selectedOption.value[1],
                              // })
                            }}
                          />
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-start"></div>
                        </div>
                        <div className="flex flex-row p-4 gap-5 items-end">
                          <button
                            type="submit"
                            className=" text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                            onClick={() => UpdateExamSchedule()}
                          >
                            Save
                          </button>
                          <button
                            type="submit"
                            className=" text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
                            onClick={() => setOpenModal(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )} */}
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
                <div className="text-blue-800">Scheduled for the future.</div>
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
          </main>
        )}
      </div>
    </div>
  )
}

export default ExamscheduleDashboard
