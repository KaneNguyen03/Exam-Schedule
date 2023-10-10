import SubHeader from "../components/Layout/SubHeader"
import Sidebar from "../components/Layout/Sidebar"
import { useDispatch, useSelector } from "react-redux"
import examscheduleTypes from "../constants/examscheduleTypes"
import { getAllExamschedules } from "../store/thunks/examschedule"
import { useEffect } from "react"

import { Calendar, momentLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from "moment"
import { useState } from "react"
import { getAllExamslots } from "../store/thunks/examslot"
import examslotTypes from "../constants/examslotTypes"

const ExamscheduleDashboard = () => {
  const dispatch = useDispatch()
  const dataexs = useSelector((state) => state.examschedule)
  const dataexsl = useSelector((state) => state.examslot)
  const [openModal, setOpenModal] = useState(false)
  const examschedules =
    dataexs?.contents[examscheduleTypes.GET_EXAMSCHEDULES]?.payload?.data
  const allExamSlots =
    dataexsl?.contents[examslotTypes.GET_EXAMSLOTS]?.data.data

  const convertDataExamSlots = allExamSlots
    ?.filter((item) => item.status === "Active")
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
        classroom: null,
        proctoring: item.proctoringId,
      }
    })
  console.log(
    "🚀 Kha ne ~ file: ExamSchedule.jsx:25 ~ convertDataExamSlots:",
    convertDataExamSlots
  )

  // const examSlotsEX = [
  //   {
  //     title: "Math Exam",
  //     start: new Date(2023, 9, 10, 10, 0),
  //     end: new Date(2023, 9, 10, 12, 0),
  //   },
  //   {
  //     title: "History Exam",
  //     start: new Date(2023, 9, 11, 14, 0),
  //     end: new Date(2023, 9, 11, 16, 0),
  //   },
  //   // Add more exam slots as needed
  // ]

  const localizer = momentLocalizer(moment)

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log("🚀 Kha ne ~ file: ExamSchedule.jsx:80 ~ event:", event)

    const currentTime = new Date()
    const isEventInProgress =
      event.start <= currentTime && event.end >= currentTime
    let backgroundColor = event.start < new Date() ? "#ccc" : "#dc3454"
    if (event.proctoring && event.start > new Date()) {
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
    // Handle the event click here
    // if (!event.proctoring)
    setOpenModal(true)
    // You can show more details or perform actions as needed
  }

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
          <div className=" text-slate-800 font-semibold text-3xl">
            DashBoard
          </div>
          {/* <div className="grid gap-4 pt-7 m-1">
            <table className="w-full text-sm text-left text-gray-500 text-gray-400">
              <thead className="text-xs text-gray-300 uppercase bg-gray-50 bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Exam Schedule Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Course Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Exam Slot Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Classroom Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End time
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              {examschedules?.map((examschedules) => (
                <tr
                  className="bg-white border-b bg-gray-800 border-gray-700"
                  key={examschedules.examscheduleId}
                >
                  <td className="px-6 py-4">{examschedules.examScheduleId}</td>
                  <td className="px-6 py-4">{examschedules.courseId}</td>
                  <td className="px-6 py-4">{examschedules.examSlotId}</td>
                  <td className="px-6 py-4">{examschedules.classroomId}</td>
                  <td className="px-6 py-4">{examschedules.date}</td>
                  <td className="px-6 py-4">{examschedules.startTime}</td>
                  <td className="px-6 py-4">{examschedules.endTime}</td>
                  <td>
                    <Actionbt></Actionbt>
                  </td>
                </tr>
              ))}
            </table>
          </div> */}
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
                          Examslot Id
                        </label>
                        <input
                          // defaultValue={currentExamslot?.examSlotId}
                          className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                          placeholder=""
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="mb-2 text-sm font-medium text-white flex">
                          Examslot Name
                        </label>
                      </div>
                      <div>
                        <label className="mb-2 text-sm font-medium text-white flex">
                          proctoring id
                        </label>
                      </div>
                      <div>
                        <label className="mb-2 text-sm font-medium text-white flex">
                          Date
                        </label>
                      </div>
                      <div>
                        <label className="mb-2 text-sm font-medium text-white flex">
                          Start time
                        </label>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-start"></div>
                      </div>
                      <div className="flex flex-row p-4 gap-5 items-end">
                        <button
                          type="submit"
                          className=" text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                          // onClick={() => UpdateExamslot()}
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
        </main>
      </div>
    </div>
  )
}

export default ExamscheduleDashboard
