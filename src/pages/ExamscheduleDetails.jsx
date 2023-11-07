import moment from "moment"
import DropdownSelectIcon from "../assets/svg/select_dropdown_icon.svg"

import React, { useEffect, useRef, useState } from "react"
import { Pagination } from "react-headless-pagination"
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
import examscheduleApi from "../apis/examschedule"
import { sizeOptions } from "../constants/commons/commons"

const ExamscheduleDetails = () => {
  const popupSelect = useRef(null)
  const dispatch = useDispatch()
  const [isShowSelect, setIsShowSelect] = useState(false)
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    keyword: "",
  })

  const { user } = useAuth()
  const [loadings, setLoading] = useState(true)
  const dataexsl = useSelector((state) => state.examslot)
  const dataes = useSelector((state) => state.examschedule)
  const examslots = dataexsl?.contents[examslotTypes.GET_EXAMSLOTS]?.data?.data
  const examSchedule =
    dataes.contents[examscheduleTypes.GET_EXAMSCHEDULE_DETAILS]?.data?.data

  const pagination =
    dataes?.paginations[examscheduleTypes.GET_EXAMSCHEDULE_DETAILS]

  const location = useLocation()
  const examSlotId = location.pathname?.split("/")[2]
  const currentExamSlot = examslots?.find((x) => x.examSlotId === examSlotId)

  // Tạo một bản sao của examSchedule với các trường dữ liệu được cập nhật
  const updatedExamSchedule = examSchedule?.map((scheduleItem) => {
    const examSlotId = scheduleItem.examSlotId
    const matchingExamSlot =
      currentExamSlot?.examSlotId === examSlotId ? currentExamSlot : null

    if (matchingExamSlot) {
      // Sử dụng Object.assign hoặc toán tử spread để thêm thông tin từ examSlot vào scheduleItem
      const updatedScheduleItem = { ...scheduleItem, ...matchingExamSlot }
      return updatedScheduleItem
    } else {
      // Nếu không có sự khớp, trả về scheduleItem ban đầu
      return scheduleItem
    }
  })

  const [submitDataGenerator, setSubmitDataGenerator] = useState({
    courseId: "",
    examSlotId: "",
  })

  const handleSendMail = () => {
    try {
      examscheduleApi.sendMail({
        courseId: currentExamSlot?.courseId,
        examSlotId: currentExamSlot?.examSlotId,
      })
      toast.success("Sent mail successfully")
    } catch (e) {
      toast.error("Error sending mail")
    }
  }

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
        dispatch(getAllExamslots({ page: 1, pageSize: 999 }))
      }, 500)
      return () => clearTimeout(delayDebounceFn)
    } catch (error) {
      toast.error("Error getting examslot")
    }
  }, [dispatch, param])

  useEffect(() => {
    if (examslots && currentExamSlot?.courseId && currentExamSlot?.examSlotId) {
      try {
        const delayDebounceFn = setTimeout(() => {
          dispatch(
            generateExamschedule({
              courseId: currentExamSlot?.courseId,
              examSlotId: currentExamSlot?.examSlotId,
            })
          )
          dispatch(
            getExamscheduleDetails({
              ...param,
              CourseId: currentExamSlot?.courseId,
              ExamSlotId: currentExamSlot?.examSlotId,
            })
          )
        }, 500)
        return () => clearTimeout(delayDebounceFn)
      } catch (error) {
        toast.error("Error getting exam Schedule")
      }
    }
  }, [examslots, currentExamSlot, dispatch, param])

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
          <div className=" text-slate-800 font-semibold text-3xl pt-8 pb-4 m-3">
              Exam Slot Management
            </div>
            <div className="flex justify-end text-slate-800 font-semibold text-3xl p-10 pb-0 pt-0">
            <button
              type="button"
              id="Add"
              className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-[#1f2937] hover:bg-[#1f2937]"
              onClick={() => handleSendMail()}
            >
              Sent Mail
            </button>{" "}
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
                          setParam({ ...param, pageSize: Number(item.value) })
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
                    Exam Slot
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Proctoring Id
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
                {updatedExamSchedule?.map((item) => (
                  <tr
                    className="bg-white border-b  border-gray-700"
                    key={item?.examScheduleId}
                  >
                    <td className="px-6 py-4">{item?.examScheduleId}</td>
                    <td className="px-6 py-4">{item.courseId}</td>
                    <td className="px-6 py-4">{item.classroomId}</td>
                    <td className="px-6 py-4">{item.examSlotId}</td>
                    <td className="px-6 py-4">{item.proctoringId}</td>
                    <td className="px-6 py-4">
                      {moment(item.date).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-6 py-4">{item.startTime}</td>
                    <td className="px-6 py-4">{item.endTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="sticky bottom-0 bg-white p-2 z-10">
              {examSchedule?.length ? (
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
                    {/* <img src={PreIcon} className="h-3 w-3" alt="arrPrev" /> */}
                  </Pagination.PrevButton>

                  <div className="flex items-center justify-center mx-6 list-none ">
                    {examslots?.data?.length > 0 ? (
                      <Pagination.PageButton
                        activeClassName="bg-blue-button border-0 text-white "
                        inactiveClassName="border"
                        className="flex justify-center items-center rounded-lg border-solid  border-primary mx-1 w-10 h-10 cursor-pointer font-medium bg-slate-700 text-blue-500"
                      />
                    ) : (
                      <div className="flex justify-center items-center rounded-lg  mx-1 w-10 h-10 cursor-pointer font-medium bg-blue-button border-0 bg-slate-700 text-white">
                        1
                      </div>
                    )}
                  </div>

                  <Pagination.NextButton
                    className={`w-8 md:w-10 h-8 md:h-10 rounded-lg border-solid border border-primary  ${(
                      page
                    ) =>
                      page > examslots?.data?.length
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
        </main>
      </div>
    </div>
  )
}

export default ExamscheduleDetails
