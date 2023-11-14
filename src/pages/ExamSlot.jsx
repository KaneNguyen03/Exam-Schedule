import DropdownSelectIcon from "../assets/svg/select_dropdown_icon.svg"

import { useEffect, useRef, useState } from "react"
import LoadingSpinner from "../constants/commons/loading-spinner/LoadingSpinner"
import useAuth from "../hooks/useAuth"
import { sizeOptions, timeOptions } from "../constants/commons/commons"
import { Pagination } from "react-headless-pagination"
import ReactSelect from "react-select"
import teacherTypes from "../constants/teacherTypes"
import examslotTypes from "../constants/examslotTypes"
import {
  createExamslot,
  deleteExamslot,
  getAllExamslots,
  updateExamslot,
} from "../store/thunks/examslot"

import Sidebar from "../components/Layout/Sidebar"
import { useDispatch, useSelector } from "react-redux"
import { createTeacher, getAllTeachers } from "../store/thunks/teacher"
import { color } from "../constants/commons/styled"
import StatusButton from "../components/Status"
import moment from "moment"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { createExamschedule } from "../store/thunks/examschedule"
import classroomTypes from "../constants/classroomTypes"
import { getAllClassrooms } from "../store/thunks/classroom"
import { toast } from "react-toastify"
import { differenceInDays, parseISO } from "date-fns"
import courseTypes from "../constants/courseTypes"
import { makeRoles } from "../utils/common"
import { CSVLink } from "react-csv"
import { getAllCourses } from "../store/thunks/course"
import examslotApi from "../apis/examslot"

const ExamSlot = () => {
  const dispatch = useDispatch()
  const { user } = useAuth()
  const [openModal, setOpenModal] = useState(false)
  const [isShowSelect, setIsShowSelect] = useState(false)
  const [openModalConfirm, setOpenModalConfirm] = useState(false)
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    keyword: "",
  })
  const [currentExamslot, setCurrentExamslot] = useState({})
  const handleExportCSV = async (e) => {
    e.preventDefault()
    const resultExport = await dispatch(
      getAllExamslots({ page: 1, pageSize: 9999999 })
    )
    const allExamSlot = resultExport?.payload.data.data
    await setExportData(allExamSlot)

    // Sử dụng setTimeout để chắc chắn rằng dữ liệu đã được cập nhật trước khi tạo element
    setTimeout(() => {
      const element = document.getElementById("exportCSV")
      element.click()
    }, 200)
    await dispatch(getAllExamslots(param))
  }
  const dataexsl = useSelector((state) => state.examslot)
  const datate = useSelector((state) => state.teacher)
  const datacl = useSelector((state) => state.classroom)
  const dataco = useSelector((state) => state.course)
  const courses = dataco?.contents[courseTypes.GET_COURSES]?.data.data
  const examslots = dataexsl?.contents[examslotTypes.GET_EXAMSLOTS]?.data
  const teachers = datate?.contents[teacherTypes.GET_TEACHERS]?.data.data
  const classrooms = datacl?.contents[classroomTypes.GET_CLASSROOMS]?.data.data
  const pagination = dataexsl?.paginations[examslotTypes.GET_EXAMSLOTS]
  const popupSelect = useRef(null)
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [addData, setAddData] = useState({
    examSlotId: "",
    examSlotName: "",
    date: "",
    startTime: "",
    endTime: "",
    listProctoring: [],
    status: "active",
    courseId: "",
  })

  const [loadings, setLoading] = useState(true)
  const currentDate = new Date()
  const [selectedOption, setSelectedOption] = useState(null)
  const today = new Date()
  const maxDate = new Date(today)
  maxDate.setDate(today.getDate() + 7)
  const optionCourses = courses?.map((course) => ({
    value: course.courseId,
    label: course.courseId,
  }))
  const options = teachers?.map((teacher) => ({
    value: teacher,
    label: teacher.proctoringName,
    key: teacher.proctoringName,
  }))

  const headers = [
    { label: "examSlotId", key: "examSlotId" },
    { label: "examSlotName", key: "examSlotName" },
    { label: "courseId", key: "courseId" },
    { label: "listProctoring", key: "listProctoring" },
    { label: "date", key: "date" },
    { label: "startTime", key: "startTime" },
    { label: "endTime", key: "endTime" },
  ]
  const [exportData, setExportData] = useState([
    {
      examSlotId: "",
      examSlotName: "",
      courseId: "",
      listProctoring: [],
      date: "",
      startTime: "",
      endTime: "",
    },
  ])
  //setup DATE selection
  const [selectedDate, setSelectedDate] = useState(null)

  const handleDateChange = (date) => {
    const nextDay = new Date(date)
    nextDay.setDate(nextDay.getDate() + 1)
    setCurrentExamslot({
      ...currentExamslot,
      date: nextDay,
    })
    setAddData({ ...addData, date: nextDay })
    setSelectedDate(date)
  }
  const UpdateExamslot = () => {
    try {
      const newListProctorings = currentExamslot.listProctoring.map((item) => ({
        ...item,
        listExamSlot: [],
      }))
      const submitData = {
        ...currentExamslot,
        listProctoring: newListProctorings,
      }
      dispatch(updateExamslot(submitData))
      toast.success("Examslot updated successfully")
    } catch (error) {
      toast.error("Error updating examslot")
    }

    setOpenModal(false)
  }

  const AddExamslot = () => {
    try {
      dispatch(createExamslot(addData))
      toast.success("Examslot added successfully")
    } catch (error) {
      toast.error("Error adding examslot")
    }

    setOpenModalAdd(false)
  }

  const handleUpload = (file) => {
    try {
      examslotApi.importExamSlot(file)
      toast.success("Import successfully")
    } catch (error) {
      toast.error("Error importing")
    }
  }

  const onDeleteExamslot = (data) => {
    const req = {
      ...data,
      status: "Inactive",
    }
    try {
      dispatch(deleteExamslot(req))
      toast.success("Examslot deleted successfully")
    } catch (error) {
      toast.error("Error deleting examslot")
    }

    setOpenModalConfirm(false)
    try {
      setTimeout(() => dispatch(getAllExamslots(param)), 1000)
    } catch (error) {
      toast.error("Error getting examslot")
    }
  }
  const restoreExamslot = (data) => {
    const req = {
      ...data,
      status: "Active",
    }
    try {
      dispatch(deleteExamslot(req))
      toast.success("Exam slot restored successfully")
    } catch (error) {
      toast.error("Error restoring examslot")
    }
    try {
      setTimeout(() => dispatch(getAllExamslots(param)), 1000)
    } catch (error) {
      toast.error("Error getting examslot ")
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
    if (examslots?.data !== undefined) {
      const preprocessedData = examslots?.data?.map((item) => ({
        ...item,
        listProctoring: item.listProctoring
          ?.map((proctoring) => proctoring.proctoringName)
          .join(", "),
      }))
      setExportData(preprocessedData)
    }
  }, [dataexsl, param, examslots])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getAllExamslots(param))
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [dispatch, param])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getAllClassrooms({ pageSize: 999, page: 1 }))
      dispatch(getAllTeachers({ page: 1, pageSize: 999 }))
      dispatch(getAllCourses({ page: 1, pageSize: 999 }))
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [dispatch])

  return (
    <div className="relative">
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
          <div className=" text-slate-800 font-semibold text-3xl pt-8 pb-4 m-3">
            Exam Slot Management
          </div>
          {/* <div className="w-full flex justify-end">
            {[...makeRoles([1, 2])].includes(user.roleId) && (
              <button
                type="button"
                id="Add"
                className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-[#1f2937] hover:bg-[#1f2937]"
                onClick={() => setOpenModalAdd(true)}
              >
                Add
              </button>
            )}
            {[...makeRoles([1, 2])].includes(user.roleId) && (
              <>
                <input
                  type="file"
                  accept=".xlsx"
                  onChange={(e) => {
                    handleUpload(e.target.files[0])
                  }}
                  className="hidden"
                />
                <button
                  className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-[#1f2937] hover:bg-[#1f2937]"
                  onClick={() =>
                    document.querySelector('input[type="file"]').click()
                  }
                >
                  {" "}
                  <span className="ml-2">Import Exam Slot</span>
                </button>
              </>
            )}
            {[...makeRoles([1, 2, 3])].includes(user.roleId) && (
              <button
              className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-[#1f2937] hover:bg-[#1f2937]"
                onClick={(e) => {
                  handleExportCSV(e)
                }}
              >
                <span className="ml-2">Export Exam Slot</span>
              </button>
            )}</div> */}
          <div className="flex justify-end text-slate-800 font-semibold text-3xl p-10 pb-0 pt-0">
            {[...makeRoles([1, 2])].includes(user.roleId) && (
              <button
                type="button"
                id="Add"
                className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-[#1f2937] hover:bg-[#1f2937]"
                onClick={() => setOpenModalAdd(true)}
              >
                Add
              </button>
            )}
            {[...makeRoles([1, 2])].includes(user.roleId) && (
              <>
                <input
                  type="file"
                  accept=".xlsx"
                  onChange={(e) => {
                    handleUpload(e.target.files[0])
                  }}
                  className="hidden"
                />
                <button
                  className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-[#1f2937] hover:bg-[#1f2937]"
                  onClick={() =>
                    document.querySelector('input[type="file"]').click()
                  }
                >
                  {" "}
                  <span className="ml-2">Import Exam Slot</span>
                </button>
              </>
            )}
            {[...makeRoles([1, 2, 3])].includes(user.roleId) && (
              <button
                className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-[#1f2937] hover:bg-[#1f2937]"
                onClick={(e) => {
                  handleExportCSV(e)
                }}
              >
                <span className="ml-2">Export Exam Slot</span>
              </button>
            )}
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
            {openModalAdd ? (
              <div className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-20 z-[1000]">
                <div className="modal absolute w-[28%] translate-x-[-50%] translate-y-[-50%]  z-20 top-[50%] left-[50%]">
                  <div className="relativerounded-lg shadow bg-gray-700">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                      data-modal-hide="authentication-modal"
                      onClick={() => setOpenModalAdd(false)}
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
                    <div className="px-6 py-6 lg:px-8 flex flex-col gap-y-4">
                      <h3 className="mb-4 text-xl font-medium  text-white">
                        Add examslot
                      </h3>
                      <div>
                        <label className="mb-2 text-sm font-medium  text-white flex">
                          Examslot Id
                        </label>
                        <input
                          className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                          placeholder=""
                          onChange={(e) =>
                            setAddData({
                              ...addData,
                              examSlotId: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="mb-2 text-sm font-medium  text-white flex">
                          Examslot Name
                        </label>
                        <input
                          onChange={(e) =>
                            setAddData({
                              ...addData,
                              examSlotName: e.target.value,
                            })
                          }
                          className=" border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                        />
                      </div>
                      <div>
                        <label className="mb-2 text-sm font-medium  text-white flex">
                          proctoringId
                        </label>
                        <ReactSelect
                          className="text-sm text-start"
                          options={options}
                          isMulti={true}
                          onChange={(data) => {
                            const newListProctoring = data?.map(
                              (item) => item.value
                            )
                            // Update the selectedOption state
                            setSelectedOption(
                              selectedOption ? selectedOption.value : null
                            )
                            setAddData({
                              ...addData,
                              listProctoring: newListProctoring,
                            })
                          }}
                        />
                      </div>
                      {/* <div>
                        <label className="mb-2 text-sm font-medium  text-white flex">
                          date
                        </label>
                        <input
                          onChange={(e) =>
                            setAddData({
                              ...addData,
                              date: e.target.value,
                            })
                          }
                          className=" border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                        />             
                      </div> */}

                      <label className="mb-2 text-sm font-medium  text-white flex">
                        Course
                      </label>
                      <ReactSelect
                        className="text-sm text-start"
                        options={optionCourses}
                        isMulti={false}
                        onChange={(selectedOption) => {
                          setAddData({
                            ...addData,
                            courseId: selectedOption.value,
                          })
                        }}
                      />

                      <label className="text-sm font-medium text-white flex">
                        Date
                      </label>
                      <div className="flex">
                        <ReactDatePicker
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="dd-MM-yyyy"
                          className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white flex justify-start"
                          minDate={maxDate}
                        />
                      </div>
                      <div>
                        <label className="mb-2 text-sm font-medium  text-white flex">
                          Time
                        </label>
                        <ReactSelect
                          className="text-sm text-start"
                          options={timeOptions}
                          isMulti={false}
                          value={
                            selectedOption
                              ? timeOptions.find(
                                  (option) => option.value === selectedOption
                                )
                              : null
                          }
                          onChange={(selectedOption) => {
                            // Update the proctoringLocation in the currentTeacher state
                            setCurrentExamslot((prevExamslot) => ({
                              ...prevExamslot,
                              startTime: selectedOption
                                ? selectedOption.value
                                : null,
                            }))

                            // Update the selectedOption state
                            setSelectedOption(
                              selectedOption ? selectedOption.value : null
                            )

                            setAddData({
                              ...addData,
                              startTime: selectedOption.value[0],
                              endTime: selectedOption.value[1],
                            })
                          }}
                        />
                      </div>

                      <div className="flex justify-between">
                        <div className="flex items-start"></div>
                      </div>
                      <div className="flex flex-row p-4 gap-5 items-end">
                        <button
                          type="submit"
                          className="w-full text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                          onClick={() => AddExamslot()}
                        >
                          Add
                        </button>
                        <button
                          type="submit"
                          className="w-full text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
                          onClick={() => setOpenModalAdd(false)}
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
            {/* <div>
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
            </div> */}
          </div>
          <div className="grid gap-4 pt-7 m-1 overflow-x-auto max-h-[76vh] overflow-y-scroll">
            <table className=" text-sm text-left text-gray-400 ">
              <thead className=" text-xs text-gray-300 uppercase  bg-gray-700 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    examSlotId
                  </th>
                  <th scope="col" className="px-6 py-3">
                    examSlotName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    proctoringId
                  </th>
                  <th scope="col" className="px-6 py-3">
                    course
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
                  {[...makeRoles([1, 2])].includes(user.roleId) && (
                    <>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {examslots?.data?.map((examslot) => (
                  <tr
                    className="bg-white border-b  border-gray-700"
                    key={examslot.examSlotId}
                  >
                    <td className="px-6 py-4">{examslot.examSlotId}</td>
                    <td className="px-6 py-4">
                      {examslot.examSlotName}

                      {openModal ? (
                        <div className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-20 z-[1000]">
                          <div className="modal absolute w-[28%] translate-x-[-50%] translate-y-[-50%]  z-20 top-[50%] left-[50%]">
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
                                  Edit examslot
                                </h3>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    Examslot Id
                                  </label>
                                  <input
                                    defaultValue={currentExamslot?.examSlotId}
                                    className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                    placeholder=""
                                    readOnly
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium text-white flex">
                                    Examslot Name
                                  </label>
                                  <input
                                    value={currentExamslot?.examSlotName}
                                    onChange={(e) =>
                                      setCurrentExamslot({
                                        ...currentExamslot,
                                        examSlotName: e.target.value,
                                      })
                                    }
                                    className=" border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium text-white flex">
                                    proctoring name
                                  </label>
                                  <ReactSelect
                                    options={options?.filter((option) => {
                                      const listExamSlot =
                                        option.value.listExamSlot
                                      for (const examSlot of listExamSlot) {
                                        if (
                                          examSlot.examSlotId ===
                                          currentExamslot.examSlotId
                                        ) {
                                          return false // Giữ lại phần tử này nếu tìm thấy examSlotId tương tự
                                        }
                                      }
                                      return true // Lọc ra các phần tử không có examSlotId tương tự
                                    })}
                                    isMulti={true}
                                    value={currentExamslot?.listProctoring?.map(
                                      (proctoring) => ({
                                        ...proctoring,
                                        value: proctoring,
                                        label: proctoring.proctoringName,
                                        key: proctoring.proctoringName,
                                      })
                                    )}
                                    onChange={(selectedOption) => {
                                      const newListProctoring =
                                        selectedOption.map((item) => item.value)
                                      setCurrentExamslot({
                                        ...currentExamslot,
                                        listProctoring: newListProctoring,
                                      })
                                    }}
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium text-white flex">
                                    Course
                                  </label>
                                  <ReactSelect
                                    options={optionCourses}
                                    isMulti={false}
                                    value={optionCourses?.find(
                                      (x) =>
                                        x.value == currentExamslot?.courseId
                                    )}
                                    onChange={(selectedOption) => {
                                      setCurrentExamslot({
                                        ...currentExamslot,
                                        courseId: selectedOption.value,
                                      })
                                    }}
                                  />
                                </div>

                                <div>
                                  <label className="mb-2 text-sm font-medium text-white flex">
                                    Date
                                  </label>
                                  <ReactDatePicker
                                    minDate={maxDate}
                                    selected={new Date(currentExamslot.date)}
                                    onChange={handleDateChange}
                                    dateFormat="dd-MM-yyyy"
                                    className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium text-white flex">
                                    Start time
                                  </label>
                                  <ReactSelect
                                    options={timeOptions}
                                    isMulti={false}
                                    value={
                                      timeOptions
                                        ? timeOptions.find(
                                            (option) =>
                                              option.value[0] ===
                                              currentExamslot?.startTime
                                          )
                                        : null
                                    }
                                    onChange={(selectedOption) => {
                                      // Update the proctoringLocation in the currentTeacher state
                                      setCurrentExamslot((prevExamslot) => ({
                                        ...prevExamslot,
                                        startTime: selectedOption
                                          ? selectedOption.value[0]
                                          : null,
                                        endTime: selectedOption
                                          ? selectedOption.value[1]
                                          : null,
                                      }))

                                      // Update the selectedOption state
                                      setSelectedOption(
                                        selectedOption
                                          ? selectedOption.value
                                          : null
                                      )
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
                                    onClick={() => UpdateExamslot()}
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
                      ) : (
                        <></>
                      )}

                      {openModalConfirm ? (
                        <div className="fixed top-0 left-0  w-full h-full bg-gray-200 bg-opacity-5 z-[1000]">
                          <div className="absolute top-0 left-0 w-full h-full">
                            <div className="translate-x-[-50%] translate-y-[-50%] absolute top-[50%] left-[50%]">
                              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button
                                  type="button"
                                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                  data-modal-hide="popup-modal"
                                  onClick={() => setOpenModalConfirm(false)}
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
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                  </svg>
                                  <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-10 text-center">
                                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this exam
                                    slot?
                                  </h3>
                                  <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                    onClick={() =>
                                      onDeleteExamslot(currentExamslot)
                                    }
                                  >
                                    Delete
                                  </button>
                                  <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5"
                                    onClick={() => setOpenModalConfirm(false)}
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
                    </td>
                    <td className="px-6 py-4">
                      {examslot.listProctoring
                        ?.map((item) => item.proctoringName)
                        .join(", ")}
                    </td>
                    <td className="px-6 py-4">{examslot.courseId}</td>
                    <td className="px-6 py-4">
                      {moment(examslot.date).format("DD/MM/YYYY")}
                    </td>
                    <td className="px-6 py-4">
                      {examslot.startTime.substring(0, 5)}
                    </td>
                    <td className="px-6 py-4">
                      {(() => {
                        // Split the startTime into hours and minutes
                        const [hours, minutes] = examslot.startTime
                          .split(":")
                          .map(Number)

                        // Add 90 minutes
                        const newMinutes = minutes + 90
                        const newHours = hours + Math.floor(newMinutes / 60)
                        const formattedHours = newHours % 24 // Handle overflow if necessary
                        const formattedMinutes = newMinutes % 60

                        // Format the result as "HH:mm"
                        const formattedTime = `${formattedHours
                          .toString()
                          .padStart(2, "0")}:${formattedMinutes
                          .toString()
                          .padStart(2, "0")}`

                        return formattedTime
                      })()}
                    </td>
                    {[...makeRoles([1, 2])].includes(user.roleId) && (
                      <>
                        <td>
                          <>
                            {(examslot?.status?.toLowerCase() === "active" ||
                              examslot?.status?.toLowerCase() === "pending") &&
                            differenceInDays(
                              parseISO(
                                examslot?.date?.toString().substring(0, 10)
                              ),
                              currentDate
                            ) > 0 ? (
                              <StatusButton
                                color={color.green}
                                bgColor={color.greenLight}
                                title="Active"
                              />
                            ) : examslot?.status?.toLowerCase() ===
                              "inactive" ? (
                              <StatusButton
                                color={color.red}
                                bgColor={color.redLight}
                                title="Inactive"
                              />
                            ) : (examslot?.status.toLowerCase() === "active" ||
                                examslot?.status.toLowerCase() === "pending") &&
                              differenceInDays(
                                parseISO(
                                  examslot?.date?.toString().substring(0, 10)
                                ),
                                currentDate
                              ) < 0 ? (
                              <StatusButton
                                color={color.yellow}
                                bgColor={color.yellowLight}
                                title="Completed"
                              />
                            ) : (
                              <>
                                {" "}
                                <StatusButton
                                  color={color.blue}
                                  bgColor={color.blueLight}
                                  title="pending"
                                />
                              </>
                            )}
                          </>
                        </td>
                        <td>
                          <div className="">
                            {examslot?.status?.toLowerCase() === "active" ||
                            examslot?.status?.toLowerCase() === "pending" ? (
                              <>
                                {" "}
                                <button
                                  type="button"
                                  id="Delete"
                                  className="focus:outline-none text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-red-600 hover:bg-red-700 focus:ring-red-900"
                                  onClick={() =>
                                    // onDeleteClassroom(classroom)
                                    {
                                      setCurrentExamslot(examslot)
                                      setOpenModalConfirm(true)
                                    }
                                  }
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  id="Edit"
                                  className="text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
                                  onClick={() => {
                                    setOpenModal(!openModal)
                                    setSelectedOption(examslot.proctoringId)
                                    setCurrentExamslot(examslot)
                                  }}
                                >
                                  Edit
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => restoreExamslot(examslot)}
                                className="focus:outline-none text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-400 hover:bg-gray-500 focus:ring-gray-600"
                              >
                                <svg
                                  viewBox="64 64 896 896"
                                  focusable="false"
                                  data-icon="redo"
                                  width="1em"
                                  height="1em"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M758.2 839.1C851.8 765.9 912 651.9 912 523.9 912 303 733.5 124.3 512.6 124 291.4 123.7 112 302.8 112 523.9c0 125.2 57.5 236.9 147.6 310.2 3.5 2.8 8.6 2.2 11.4-1.3l39.4-50.5c2.7-3.4 2.1-8.3-1.2-11.1-8.1-6.6-15.9-13.7-23.4-21.2a318.64 318.64 0 01-68.6-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-124.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 124.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.4 85.1-25.1 124.5a318.64 318.64 0 01-68.6 101.7c-9.3 9.3-19.1 18-29.3 26L668.2 724a8 8 0 00-14.1 3l-39.6 162.2c-1.2 5 2.6 9.9 7.7 9.9l167 .8c6.7 0 10.5-7.7 6.3-12.9l-37.3-47.9z"></path>
                                </svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="sticky bottom-0 bg-white p-2 z-10">
              {examslots?.data?.length ? (
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
      <CSVLink
        data={exportData} // data truyen vao
        filename={`${"ExamSlotExport"}.csv`}
        headers={headers}
        id="exportCSV"
      />
    </div>
  )
}

export default ExamSlot
