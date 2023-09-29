import { useEffect, useRef, useState } from "react"
import Sidebar from "../components/Layout/Sidebar"
import {
  deleteClassroom,
  getAllClassrooms,
  updateClassroom,
} from "../store/thunks/classroom"
import classroomTypes from "../constants/classroomTypes"
import { useDispatch, useSelector } from "react-redux"
import { Pagination } from "react-headless-pagination"

// assets
import PreIcon from "../assets/pagination_pre.png"
import NextIcon from "../assets/pagination_next.png"
import DropdownSelectIcon from "../assets/svg/select_dropdown_icon.svg"
import { sizeOptions } from "../constants/commons/commons"

const Room = () => {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [isShowSelect, setIsShowSelect] = useState(false)
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    keyword: "",
  })

  const [currentClassroom, setCurrentClassroom] = useState({})
  const datacl = useSelector((state) => state.classroom)
  const classrooms = datacl?.contents[classroomTypes.GET_CLASSROOMS]?.data
  const pagination = datacl?.paginations[classroomTypes.GET_CLASSROOMS]

  const popupSelect = useRef(null)

  const SaveClassroom = () => {
    dispatch(updateClassroom(currentClassroom))
    setOpenModal(false)
  }

  const onDeleteClassroom = (data) => {
    dispatch(deleteClassroom(data))
    setTimeout(() => dispatch(getAllClassrooms(param)), 2000)
  }
  useEffect(() => {
    dispatch(getAllClassrooms(param))
  }, [dispatch, param])
  return (
    <div className="relative">
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
                    onChange={(e) =>
                      setParam({
                        ...param,
                        keyword: e.target.value,
                      })
                    }
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

          <div className="flex justify-around text-slate-800 font-semibold text-3xl p-12">
            <div className="justify-center w-full">Classroom Management</div>
            <button
              type="button"
              id="Delete"
              className="focus:outline-none text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-900"
            >
              Add
            </button>

            <div
              className="text-primary flex items-center justify-between  font-semibold h-8 md:h-10 w-32 md:w-44 text-xs md:text-sm border-solid border border-primary  rounded-2xl cursor-pointer"
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
              <ul ref={popupSelect} className="text-left cursor-pointer">
                {sizeOptions.map((item) => {
                  return (
                    <li
                      className="px-4 py-2 text-xs md:text-sm hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg  border-b last:border-b-0"
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

          <div className="grid  gap-4 pt-7 m-1">
            <table className=" table-auto">
              <thead>
                <tr>
                  <th>ClassroomId</th>
                  <th>Name</th>
                  <th>Capacity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {classrooms?.data?.map((classroom) => (
                  <tr key={classroom.classroomId}>
                    <td>{classroom.classroomId}</td>
                    <td>
                      {classroom.name}
                      {openModal ? (
                        <div className="modal absolute top-5 w-[30%]">
                          <div className="modal-content ">
                            <div className="relativerounded-lg shadow bg-gray-700">
                              <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
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
                                  Edit Classroom
                                </h3>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    Classroom Id
                                  </label>
                                  <input
                                    defaultValue={currentClassroom?.classroomId}
                                    className=" border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                    placeholder=""
                                    readOnly
                                  />
                                </div>
                                <div>
                                  <label className="block mb-2 text-sm font-medium text-gray-900 text-white flex">
                                    Classroom Name
                                  </label>
                                  <input
                                    value={currentClassroom?.name}
                                    onChange={(e) =>
                                      setCurrentClassroom({
                                        ...currentClassroom,
                                        name: e.target.value,
                                      })
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium text-gray-900 text-white flex">
                                    Capacity
                                  </label>
                                  <input
                                    value={currentClassroom?.capacity}
                                    onChange={(e) =>
                                      setCurrentClassroom({
                                        ...currentClassroom,
                                        capacity: e.target.value,
                                      })
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  />
                                </div>
                                <div className="flex justify-between">
                                  <div className="flex items-start"></div>
                                </div>
                                <div className="flex flex-row p-4 gap-5 items-end">
                                  <button
                                    type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                    onClick={() => SaveClassroom()}
                                  >
                                    Save
                                  </button>
                                  <button
                                    type="submit"
                                    className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
                                    onClick={() => setOpenModal(false)}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                            <button>Close</button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td>{classroom.capacity}</td>
                    <td>
                      {/* <div>
                      <Actionbt classroomId={classroom.classroomId}></Actionbt>
                    </div> */}
                      <div>
                        {" "}
                        <button
                          type="button"
                          id="Delete"
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-red-600 hover:bg-red-700 focus:ring-red-900"
                          onClick={() => onDeleteClassroom(classroom)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          id="Edit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
                          onClick={() => {
                            setOpenModal(!openModal)
                            setCurrentClassroom(classroom)
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {classrooms?.data?.length ? (
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
                  <img src={PreIcon} className="h-3 w-3" alt="arrPrev" />
                </Pagination.PrevButton>

                <div className="flex items-center justify-center mx-6">
                  {classrooms?.data?.length > 0 ? (
                    <Pagination.PageButton
                      activeClassName="bg-blue-button border-0 text-white "
                      inactiveClassName="border"
                      className="flex justify-center items-center rounded-lg border-solid  border-primary mx-1 w-10 h-10 cursor-pointer font-medium"
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
                    page > classrooms?.data?.length
                      ? "cursor-pointer"
                      : "cursor-not-allowed"}`}
                >
                  <img src={NextIcon} className="h-3 w-3" alt="arrNext" />
                </Pagination.NextButton>
              </Pagination>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Room
