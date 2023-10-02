import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Layout/Sidebar";
import teacherTypes from "../constants/teacherTypes";
import { useEffect, useRef, useState } from "react";
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  updateTeacher,
} from "../store/thunks/teacher";
import DropdownSelectIcon from "../assets/svg/select_dropdown_icon.svg";

import LoadingSpinner from "../constants/commons/loading-spinner/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import { sizeOptions } from "../constants/commons/commons";
import { Pagination } from "react-headless-pagination";
import { getAllClassrooms } from "../store/thunks/classroom";
import classroomTypes from "../constants/classroomTypes";
import ReactSelect from "react-select";

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [isShowSelect, setIsShowSelect] = useState(false);
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    keyword: "",
  });
  const [currentTeacher, setCurrentTeacher] = useState({});
  const datate = useSelector((state) => state.teacher);
  console.log(datate);
  const teachers = datate?.contents[teacherTypes.GET_TEACHERS]?.data;
  const pagination = datate?.paginations[teacherTypes.GET_TEACHERS];
  const popupSelect = useRef(null);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [addData, setAddData] = useState({
    proctoringId: "",
    proctoringName: "",
    proctoringLocation: "",
    compensation: 0,
  });
  const [loadings, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = classrooms?.map((classroom) => ({
    value: classroom.classroomId,
    label: classroom.classroomId + " : " + classroom.name,
  }));

  const UpdateTeacher = () => {
    dispatch(updateTeacher(currentTeacher));
    setOpenModal(false);
  };

  const AddTeacher = () => {
    dispatch(createTeacher(addData));
    setOpenModalAdd(false);
  };

  const onDeleteTeacher = (data) => {
    dispatch(deleteTeacher(data));
    setTimeout(() => dispatch(getAllTeachers(param)), 2000);
  };
  useEffect(() => {
    if (
      datate?.loadings[teacherTypes.GET_TEACHERS] ||
      datate?.loadings[teacherTypes.CREATE_TEACHER] ||
      datate?.loadings[teacherTypes.UPDATE_TEACHER] ||
      datate?.loadings[teacherTypes.DELETE_TEACHER]
    )
      setLoading(true);
    else setLoading(false);
  }, [datate, param]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getAllTeachers(param));
    }, 500);
    dispatch(getAllClassrooms({ page: 1, pageSize: 999 }));
    return () => clearTimeout(delayDebounceFn);
  }, [param.keyword, dispatch, param]);
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
                      });
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
            <div className="justify-center w-full">Proctoring Management</div>
            <button
              type="button"
              id="Add"
              className="focus:outline-none text-white focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-900"
              onClick={() => setOpenModalAdd(true)}
            >
              Add
            </button>
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
                          setParam({ ...param, pageSize: Number(item.value) });
                          setIsShowSelect(false);
                        }}
                        key={item.value}
                      >
                        Show {item.value} items
                      </li>
                    );
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
                    ProctoringId
                  </th>
                  <th scope="col" className="px-6 py-3">
                    proctoringName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    proctoringLocation
                  </th>
                  <th scope="col" className="px-6 py-3">
                    compensation
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {teachers?.data?.map((teacher) => (
                  <tr
                    className="bg-white border-b  border-gray-700"
                    key={teacher.proctoringId}
                  >
                    <td className="px-6 py-4">{teacher.proctoringId}</td>
                    <td className="px-6 py-4">
                      {teacher.proctoringName}
                      {openModal ? (
                        <div className="modal absolute top-5 w-[30%] z-20">
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
                                  Edit proctoring
                                </h3>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    proctoring Id
                                  </label>
                                  <input
                                    defaultValue={currentTeacher?.proctoringId}
                                    className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                    placeholder=""
                                    readOnly
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium text-white flex">
                                    Proctoring Name
                                  </label>
                                  <input
                                    value={currentTeacher?.proctoringName}
                                    onChange={(e) =>
                                      setCurrentTeacher({
                                        ...currentTeacher,
                                        proctoringName: e.target.value,
                                      })
                                    }
                                    className=" border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium text-white flex">
                                    proctoring Location
                                  </label>
                                  {/* <input
                                    value={currentTeacher?.protoringLocation}
                                    onChange={(e) =>
                                      setCurrentTeacher({
                                        ...currentTeacher,
                                        protoringLocation: e.target.value,
                                      })
                                    }
                                    className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  /> */}
                                  <ReactSelect
                                    options={options}
                                    isMulti={false}
                                    defaultValue={
                                      selectedOption
                                        ? options.find(
                                            (option) =>
                                              option.value === selectedOption
                                          )
                                        : null
                                    }
                                    onChange={(selectedOption) => {
                                      // Update the proctoringLocation in the currentTeacher state
                                      setCurrentTeacher((prevTeacher) => ({
                                        ...prevTeacher,
                                        proctoringLocation: selectedOption
                                          ? selectedOption.value
                                          : null,
                                      }));

                                      // Update the selectedOption state
                                      setSelectedOption(
                                        selectedOption
                                          ? selectedOption.value
                                          : null
                                      );
                                    }}
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium text-white flex">
                                    Compensation
                                  </label>
                                  <input
                                    value={currentTeacher?.compensation}
                                    onChange={(e) =>
                                      setCurrentTeacher({
                                        ...currentTeacher,
                                        compensation: e.target.value,
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
                                    onClick={() => UpdateTeacher()}
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
                      {openModalAdd ? (
                        <div className="modal absolute top-5 w-[30%] z-20">
                          <div className="modal-content ">
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
                                  Add proctoring
                                </h3>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    proctoring Id
                                  </label>
                                  <input
                                    className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                    placeholder="C-XXX"
                                    onChange={(e) =>
                                      setAddData({
                                        ...addData,
                                        proctoringId: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    Proctoring Name
                                  </label>
                                  <input
                                    onChange={(e) =>
                                      setAddData({
                                        ...addData,
                                        proctoringName: e.target.value,
                                      })
                                    }
                                    className=" border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    proctoringLocation
                                  </label>
                                  <ReactSelect
                                    options={options}
                                    isMulti={false}
                                    onChange={(data) => {
                                      // Update the selectedOption state
                                      setSelectedOption(
                                        selectedOption
                                          ? selectedOption.value
                                          : null
                                      );
                                      setAddData({
                                        ...addData,
                                        proctoringLocation: data.value,
                                      });
                                    }}

                                    ////////////////////////////////
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    compensation
                                  </label>
                                  <input
                                    onChange={(e) =>
                                      setAddData({
                                        ...addData,
                                        compensation: e.target.value,
                                      })
                                    }
                                    className=" border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  />
                                </div>
                                <div className="flex justify-between">
                                  <div className="flex items-start"></div>
                                </div>
                                <div className="flex flex-row p-4 gap-5 items-end">
                                  <button
                                    type="submit"
                                    className="w-full text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                    onClick={() => AddTeacher()}
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
                    </td>
                    <td className="px-6 py-4">{teacher.proctoringLocation}</td>
                    <td className="px-6 py-4">{teacher.compensation}$</td>
                    <td>
                      <div className="">
                        {" "}
                        <button
                          type="button"
                          id="Delete"
                          className="focus:outline-none text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-red-600 hover:bg-red-700 focus:ring-red-900"
                          onClick={() => onDeleteTeacher(teacher)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          id="Edit"
                          className="text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
                          onClick={() => {
                            setOpenModal(!openModal);
                            setCurrentTeacher(teacher);
                            setSelectedOption(teacher.proctoringLocation);
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
            <div className="sticky bottom-0 bg-white p-2">
              {teachers?.data?.length ? (
                <Pagination
                  currentPage={pagination.currentPage - 1}
                  setCurrentPage={(page) => {
                    setParam({ ...param, page: page + 1 });
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
                    {teachers?.data?.length > 0 ? (
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
                      page > teachers?.data?.length
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
  );
};
export default TeacherDashboard;
