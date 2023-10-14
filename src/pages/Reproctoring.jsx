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
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
} from "../store/thunks/teacher"
import { color } from "../constants/commons/styled"
import StatusButton from "../components/Status"

import { v4 as uuidv4 } from "uuid"

const Reproctoring = () => {
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
  const dataexsl = useSelector((state) => state.examslot)
  const datate = useSelector((state) => state.teacher)
  const examslots = dataexsl?.contents[examslotTypes.GET_EXAMSLOTS]?.data
  const teachers = datate?.contents[teacherTypes.GET_TEACHERS]?.data.data
  const currentUserExamslot = teachers?.filter((teacher) => {
    return teacher.proctoringName === user.username
  })

  const pagination = dataexsl?.paginations[examslotTypes.GET_EXAMSLOTS]
  const popupSelect = useRef(null)

  const [loadings, setLoading] = useState(true)
  const [selectedOption, setSelectedOption] = useState(null)

  const UpdateExamslot = async () => {
    const result = await dispatch(
      createTeacher({
        proctoringId: uuidv4(),
        proctoringName: user.username,
        examSlotId: currentExamslot.examSlotId,
      })
    )
    dispatch(
      updateExamslot({
        ...currentExamslot,
        proctoringId: result?.payload?.data?.proctoringId,
      })
    )
    setOpenModal(false)
  }

  const onDeleteRegister = (data) => {
    console.log("🚀 Kha ne ~ file: Reproctoring.jsx:79 ~ data:", data)
    const req = {
      ...data,
      productoringId: "",
    }
    dispatch(deleteTeacher(data.proctoringId))
    dispatch(deleteExamslot(req))
    setOpenModalConfirm(false)
    setTimeout(() => dispatch(getAllExamslots(param)), 1000)
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
    const delayDebounceFn = setTimeout(() => {
      dispatch(getAllExamslots(param))
    }, 500)
    dispatch(getAllTeachers({ page: 1, pageSize: 999 }))
    return () => clearTimeout(delayDebounceFn)
  }, [param.keyword, dispatch, param])

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
          <div className="flex justify-around text-slate-800 font-semibold text-3xl p-10 pb-0">
            <div className="justify-center w-full">Register Examslot</div>

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
                  {sizeOptions.map((item) => {
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
                    examSlotId
                  </th>
                  <th scope="col" className="px-6 py-3">
                    examSlotName
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

                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
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
                        <div className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-40 z-[1000]">
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
                                  Do you want to register as a proctoring for
                                  this exam
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
                                    Date
                                  </label>
                                  <input
                                    readOnly
                                    value={new Intl.DateTimeFormat(
                                      "en-GB"
                                    ).format(
                                      new Date(
                                        currentExamslot?.date.substring(0, 10)
                                      )
                                    )}
                                    onChange={(e) =>
                                      setCurrentExamslot({
                                        ...currentExamslot,
                                        date: e.target.value,
                                      })
                                    }
                                    className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
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
                        <div className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-40 z-[1000]">
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
                                <div className="p-10 text-center my-8 gap-4">
                                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to cancel this exam
                                    registration?
                                  </h3>
                                  <button
                                    data-modal-hide="popup-modal"
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                                    onClick={() =>
                                      onDeleteRegister(currentExamslot)
                                    }
                                  >
                                    Submit
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
                      {examslot?.date.substring(0, 10)}
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
                    <td>
                      <>
                        {examslot.status.toLowerCase() === "active" &&
                        examslot.proctoringId ? (
                          <StatusButton
                            color={color.blue}
                            bgColor={color.blueLight}
                            title="Enrolled"
                          />
                        ) : examslot.status.toLowerCase() === "active" &&
                          !examslot.proctoringId ? (
                          <StatusButton
                            color={color.green}
                            bgColor={color.greenLight}
                            title="Available"
                          />
                        ) : examslot?.status.toLowerCase() === "inactive" ? (
                          <StatusButton
                            color={color.red}
                            bgColor={color.redLight}
                            title="Inactive"
                          />
                        ) : (
                          <>-</>
                        )}
                      </>
                    </td>
                    <td>
                      <>
                        {examslot.status.toLowerCase() === "active" &&
                        currentUserExamslot.find(
                          (slot) => slot.examSlotId === examslot.examSlotId
                        ) ? (
                          <button
                            type="button"
                            id="Delete"
                            className="focus:outline-none text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-red-600 hover:bg-red-700 focus:ring-red-900"
                            onClick={() => {
                              setCurrentExamslot(examslot)
                              setOpenModalConfirm(true)
                            }}
                          >
                            Cancel
                          </button>
                        ) : examslot.status.toLowerCase() === "active" &&
                          !currentUserExamslot.find(
                            (slot) => slot.examSlotId === examslot.examSlotId
                          ) && examslot.proctoringId ? (
                          <button
                            type="button"
                            id="Delete"
                            className="focus:outline-none text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-600 hover:bg-gray-700 focus:ring-gray-900"
                          >
                            Unavailable
                          </button>
                        ) : examslot.status.toLowerCase() === "active" &&
                          (!examslot.proctoringId || examslot.proctoringId === "") ? (
                          <button
                            type="button"
                            id="Register"
                            className="text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
                            onClick={() => {
                              setOpenModal(!openModal)
                              setSelectedOption(examslot.proctoringId)
                              setCurrentExamslot(examslot)
                            }}
                          >
                            Register
                          </button>
                        ) : examslot?.status.toLowerCase() === "inactive" ? (
                          <button
                            type="button"
                            id="Delete"
                            className="focus:outline-none text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-gray-600 hover:bg-gray-700 focus:ring-gray-900"
                          >
                            Unavailable
                          </button>
                        ) : (
                          <>-</>
                        )}
                      </>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="sticky bottom-0 bg-white p-2">
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
    </div>
  )
}

export default Reproctoring
