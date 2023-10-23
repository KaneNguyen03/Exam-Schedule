import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import ReactSelect from "react-select"
import { toast } from "react-toastify"
import Sidebar from "../components/Layout/Sidebar"
import LoadingSpinner from "../constants/commons/loading-spinner/LoadingSpinner"
import courseTypes from "../constants/courseTypes"
import examscheduleTypes from "../constants/examscheduleTypes"
import examslotTypes from "../constants/examslotTypes"
import useAuth from "../hooks/useAuth"
import { getAllCourses } from "../store/thunks/course"
import {
  generateExamschedule,
  getAllExamschedules,
  getExamscheduleDetails,
} from "../store/thunks/examschedule"
import { getAllExamslots, updateExamslot } from "../store/thunks/examslot"

const ExamscheduleDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    keyword: "",
    courseId: "",
    examSlotId: "",
  })
  const { user } = useAuth()
  const [loadings, setLoading] = useState(true)
  const dataexsl = useSelector((state) => state.examslot)

  const dataes = useSelector((state) => state.examschedule)
  const examslots = dataexsl?.contents[examslotTypes.GET_EXAMSLOTS]?.data?.data
  const examSchedule =
    dataes.contents[examscheduleTypes.GET_EXAMSCHEDULES]?.payload?.data

  const location = useLocation()
  const examSlotId = location.pathname?.split("/")[2]
  const currentExamSlot = examslots?.find((x) => x.examSlotId === examSlotId)

  const [submitDataGenerator, setSubmitDataGenerator] = useState({
    courseId: "",
    examSlotId: "",
  })


  useEffect(() => {
    if (
      dataexsl?.loadings[examslotTypes.GET_EXAMSLOTS] ||
      dataexsl?.loadings[examslotTypes.CREATE_EXAMSLOT] ||
      dataexsl?.loadings[examslotTypes.UPDATE_EXAMSLOT] ||
      dataexsl?.loadings[examslotTypes.DELETE_EXAMSLOT]
    )
      setLoading(true)
    else setLoading(false)
  }, [dataexsl, param])


  useEffect(() => {
    try {
      const delayDebounceFn = setTimeout(() => {
        dispatch(getAllExamslots(param))
      }, 500)
      return () => clearTimeout(delayDebounceFn)
    } catch (error) {
      toast.error("Error getting examslot")
    }
  }, [dispatch, param])

  useEffect(() => {
    try {
      dispatch(
        generateExamschedule({
          courseId: "PRN",
          examSlotId: "T-01",
        })
      )
    } catch (error) {
      toast.error("Error post exam schedule")
    }
  }, [dispatch])



  useEffect(() => {
    try {
      const delayDebounceFn = setTimeout(() => {
        dispatch(getExamscheduleDetails(param))
      }, 500)
      return () => clearTimeout(delayDebounceFn)
    } catch (error) {
      toast.error("Error getting exam Schedule")
    }
  }, [param, dispatch, param])

  // useEffect(() => {
  //   try {
  //     const delayDebounceFn = setTimeout(() => {
  //       dispatch(getAllExamschedules({ page: 1, pageSize: 999 }))
  //     }, 500)
  //     return () => clearTimeout(delayDebounceFn)
  //   } catch (error) {
  //     toast.error("Error getting exam Schedule")
  //   }
  // }, [param, dispatch, param])

  return (
    <div className="">
      {loadings && <LoadingSpinner />}
      <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
        <Sidebar />
          <main className="flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
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
            <div className="grid gap-4 pt-7 m-1 overflow-x-auto max-h-[76vh] overflow-y-scroll">
              <table className=" text-sm text-left text-gray-400 ">
                <thead className=" text-xs text-gray-300 uppercase  bg-gray-700 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Exam Schedule Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Course Id
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Classroom ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Start Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      End Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {examSchedule?.map((item) => (
                    <tr
                      className="bg-white border-b  border-gray-700"
                      key={item?.examScheduleId}
                    >
                      <td className="px-6 py-4">{item?.examScheduleId}</td>
                      <td className="px-6 py-4">{item.courseId}</td>
                      <td className="px-6 py-4">{item.classroomId}</td>
                      <td className="px-6 py-4">
                        {item?.start
                          // ?.toString()
                          // .split(" ")
                          // .slice(1, 4)
                          // .join(" ")
                          }
                      </td>
                      <td className="px-6 py-4">
                        {item?.start
                          // .toString()
                          // .split(" ")[4]
                          // .split(":")
                          // .slice(0, 2)
                          // .join(":")
                          }
                      </td>
                      <td className="px-6 py-4">
                        {item?.end
                            // .toString()
                            // .split(" ")[4]
                            // .split(":")
                            // .slice(0, 2)
                            // .join(":")
                          }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
      </div>
    </div>
  )
}

export default ExamscheduleDetails
