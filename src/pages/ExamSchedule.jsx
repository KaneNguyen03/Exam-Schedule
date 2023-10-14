import SubHeader from "../components/Layout/SubHeader"
import Sidebar from "../components/Layout/Sidebar"
import { useDispatch, useSelector } from "react-redux"
import examscheduleTypes from "../constants/examscheduleTypes"
import {
  createExamschedule,
  getAllExamschedules,
} from "../store/thunks/examschedule"
import { useEffect } from "react"

import { Calendar, momentLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from "moment"
import { useState } from "react"
import { getAllExamslots } from "../store/thunks/examslot"
import examslotTypes from "../constants/examslotTypes"
import classroomTypes from "../constants/classroomTypes"
import { getAllClassrooms } from "../store/thunks/classroom"
import ReactSelect from "react-select"
import teacherTypes from "../constants/teacherTypes"
import { getAllTeachers } from "../store/thunks/teacher"
import ReactDatePicker from "react-datepicker"
import { timeOptions } from "../constants/commons/commons"

const ExamscheduleDashboard = () => {
  const dispatch = useDispatch()
  const dataexs = useSelector((state) => state.examschedule)
  const dataexsl = useSelector((state) => state.examslot)
  const datacl = useSelector((state) => state.classroom)
  const datate = useSelector((state) => state.teacher)
  const classrooms = datacl?.contents[classroomTypes.GET_CLASSROOMS]?.data.data
  const teachers = datate?.contents[teacherTypes.GET_TEACHERS]?.data.data
  const examschedules =
    dataexs?.contents[examscheduleTypes.GET_EXAMSCHEDULES]?.payload?.data

  const allExamSlots =
    dataexsl?.contents[examslotTypes.GET_EXAMSLOTS]?.data.data

  const [openModal, setOpenModal] = useState(false)
  const [currentExamSchedule, setCurrentExamSchedule] = useState()

  const options = teachers?.map((teacher) => ({
    value: teacher.proctoringId,
    label: teacher.proctoringId + " : " + teacher.proctoringName,
  }))
  const optionsClassroom = classrooms?.map((classroom) => ({
    value: classroom.classroomId,
    label: classroom.classroomId + " : " + classroom.name,
  }))
  // Create a dictionary to map examSlotId to examSlot data
  const examSlotDict = {}
  allExamSlots?.forEach((exam) => {
    examSlotDict[exam.examSlotId] = exam
  })

  // Connect the data based on examSlotId
  const connectedData = examschedules?.map((schedule) => {
    const examSlotData = examSlotDict[schedule.examSlotId]
    if (examSlotData) {
      return { ...schedule, ...examSlotData }
    }
  })
  const [selectedOption, setSelectedOption] = useState(null)

  const convertDataExamSlots = connectedData
    ?.filter((item) => item?.status === "Active")
    ?.map((item) => {
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
        proctoringId: item.proctoringId,
        classroomId: item.classroomId,
        courseId: item.courseId,
        examScheduleId: item.examScheduleId,
        examSlotId: item.examSlotId,
        examSlotName: item.examSlotName,
        status: item.status,
      }
    })
  //setup DATE selection
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const localizer = momentLocalizer(moment)

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log("🚀 Kha ne ~ file: ExamSchedule.jsx:116 ~ event:", event)

    const currentTime = new Date()
    const isEventInProgress =
      event.start <= currentTime && event.end >= currentTime
    let backgroundColor = event.start < new Date() ? "#ccc" : "#dc3454"
    if (event.proctoringId && event.start > new Date() && event.classroomId) {
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
    setCurrentExamSchedule(event)
    // Handle the event click here
    // if (!event.proctoring)
    setOpenModal(true)
    // You can show more details or perform actions as needed
  }

  const UpdateExamSchedule = () => {
    dispatch(createExamschedule(currentExamSchedule))
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getAllClassrooms({ pageSize: 999, page: 1 }))
    }, 500)
    dispatch(getAllTeachers({ page: 1, pageSize: 999 }))
    return () => clearTimeout(delayDebounceFn)
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllExamschedules())
    dispatch(getAllExamslots())
  }, [dispatch])

  return (
    <div>
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <Sidebar />
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <SubHeader />
          <div className=" text-slate-800 font-semibold text-3xl p-12">
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
              onSelectEvent={handleEventClick} // Handle event click
            />
          </div>
          {openModal ? (
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
          )}

          <div className="p-4 grid grid-cols-2 gap-4 justify-items-center">
            {/* <!-- Gray Box --> */}
            <div className="flex flex-row justify-around items-center gap-4 p-8 bg-gray-300 rounded-md w-80">
              <div className="w-12 h-12 bg-gray-400 flex items-center justify-center rounded-md">
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
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div className="text-gray-800">The Exam has finished</div>
            </div>

            {/* <!-- Red Box --> */}
            <div className="flex flex-row justify-around items-center gap-4 w-80 p-8 bg-red-300 rounded-md">
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
              <div className="text-red-800">Missing proctoring.</div>
            </div>

            {/* <!-- Blue Box --> */}
            <div className="flex flex-row justify-around items-center gap-4 w-80 p-8 bg-blue-300 rounded-md">
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
            <div className="flex flex-row justify-around items-center gap-4 w-80 p-8 bg-yellow-300 rounded-md">
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
      </div>
    </div>
  )
}

export default ExamscheduleDashboard
