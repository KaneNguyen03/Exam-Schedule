import Sidebar from "../components/Layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import majorTypes from "../constants/majorTypes";
import {
  getAllMajors,
  createMajor,
  updateMajor,
  deleteMajor,
} from "../store/thunks/major";
//
import DropdownSelectIcon from "../assets/svg/select_dropdown_icon.svg";
import { Pagination } from "react-headless-pagination";
import { sizeOptions } from "../constants/commons/commons";
import LoadingSpinner from "../constants/commons/loading-spinner/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import { getAllSemesters } from "../store/thunks/semester";
import semesterTypes from "../constants/semesterTypes";
import ReactSelect from "react-select";
import major from "../store/slices/major";
//

const MajorDashboard = () => {
  const dispatch = useDispatch();
  //
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [isShowSelect, setIsShowSelect] = useState(false);
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    keyword: "",
  });
  //
  const [currentMajor, setCurrentMajor] = useState({
    majorId: "",
    majorName: "",
    semesters: [],
  });

  const datamj = useSelector((state) => state.major);
  const datase = useSelector((state) => state.semester);
  //const datasep = useSelector((state) => state.semesters);
  const majors = datamj?.contents[majorTypes.GET_MAJORS]?.data;

  const pagination = datamj?.paginations[majorTypes.GET_MAJORS];
  const popupSelect = useRef(null);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [addData, setAddData] = useState({
    majorId: "",
    majorName: "",
    semesters: [],
  });

  const [loadings, setLoading] = useState(true);

  const UpdateMajor = () => {
    dispatch(updateMajor(currentMajor));
    setOpenModal(false);
  };

  const AddMajor = () => {
    dispatch(createMajor(addData));
    setOpenModalAdd(false);
  };

  const onDeleteMajor = (data) => {
    dispatch(deleteMajor(data));
    setTimeout(() => dispatch(getAllMajors(param)), 2000);
  };

  useEffect(() => {
    if (
      datamj?.loadings[majorTypes.GET_MAJORS] ||
      datamj?.loadings[majorTypes.UPDATE_MAJOR] ||
      datamj?.loadings[majorTypes.DELETE_MAJOR] ||
      datamj?.loadings[majorTypes.CREATE_MAJOR]
    )
      setLoading(true);
    else setLoading(false);
  }, [datamj, param]);

  useEffect(() => {
    dispatch(getAllSemesters());
  }, [dispatch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getAllMajors(param));
    }, 500);

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
          {/* <div className="main-content flex flex-col flex-grow p-4">
            <h1 className="font-bold text-2xl text-gray-700">Dashboard</h1>
            <div>
              <div className="grid grid-cols-2 gap-4 place-content-around h-48 w-fit font-bold  ">
                <div className="flex border border-black rounded-lg cursor-pointer">
                  <img
                    src="https://icon-library.com/images/teacher-icon-png/teacher-icon-png-17.jpg"
                    alt=""
                    className="w-12 h-12  bg-red-400 hover:bg-red-500 rounded-l-lg "
                  />
                  <div>
                    <h4>Number of Teachers</h4>
                    <p>50</p>
                  </div>
                </div>
                <div className="flex border border-black  rounded-lg cursor-pointer">
                  <img
                    src="https://icon-library.com/images/student-icon-transparent/student-icon-transparent-26.jpg"
                    alt=""
                    className="w-12 h-12  bg-green-400 hover:bg-green-500 rounded-l-lg "
                  />
                  <div>
                    <h4>Number of Students</h4>
                    <p>100</p>
                  </div>
                </div>
                <div className="flex border border-black rounded-lg cursor-pointer ">
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/home-decor-and-interior/32/Storage_boxes-512.png"
                    alt=""
                    className="w-12 h-12  bg-blue-400 hover:bg-blue-500 rounded-l-lg "
                  />
                  <div>
                    <h4>Number of Courses</h4>
                    <p>10</p>
                  </div>
                </div>
                <div className="flex border  border-black rounded-lg cursor-pointer">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/35/35920.png"
                    alt=""
                    className="w-12 h-12  bg-purple-400 hover:bg-purple-500 rounded-l-lg "
                  />
                  <div>
                    <h4>Number of Subjects</h4>
                    <p>20</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="flex justify-around text-slate-800 font-semibold text-3xl p-10 pb-0">
            <div className="justify-center w-full">Major List</div>
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
          {/*table*/}

          <div className="grid gap-4 pt-7 m-1">
            <table className="w-full text-sm text-left text-gray-500 text-gray-400">
              <thead className="text-xs text-gray-300 uppercase bg-gray-50 bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    MajorId
                  </th>
                  <th scope="col" className="px-6 py-3">
                    MajorName
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {majors?.data?.map((major) => (
                  <tr
                    className="bg-white border-b bg-gray-800 border-gray-700"
                    key={major.majorId}
                  >
                    <td className="px-6 py-4">{major.majorId}</td>

                    <td className="px-6 py-4">
                      {major.majorName}

                      {openModal ? (
                        <div className="modal absolute top-5 w-[30%] z-20">
                          <div className="modal-content ">
                            <div className="relative rounded-lg shadow bg-gray-700">
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
                                  Edit Major List
                                </h3>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    Major Id
                                  </label>
                                  <input
                                    defaultValue={currentMajor.majorId}
                                    className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                    placeholder=""
                                    readOnly
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium text-white flex">
                                    Major Name
                                  </label>
                                  <input
                                    value={currentMajor.majorName}
                                    onChange={(e) =>
                                      setCurrentMajor({
                                        ...currentMajor,
                                        majorName: e.target.value,
                                      })
                                    }
                                    className=" border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                  />
                                </div>
                                <div>
                                  {/**
                                   * Select the semester
                                   *
                                   */}
                                  {/* <select
                                  value={currentSeptember?.semesterId}
                                  onChange={(e) =>
                                    setCurrentMajor({
                                      ...currentSeptember,
                                      semesters : e.target.value,
                                    })
                                  }
                                  className=" border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                >
                                  
                                  {semesters?.data?.map((semester) => (
                                    <option
                                      key={semester.semesterId}
                                      value={semester.semesterId}
                                    >
                                      {semester.semesterName}
                                    </option>
                                  ))}
                                </select> */}
                                </div>

                                <div className="flex justify-between">
                                  <div className="flex items-start"></div>
                                </div>
                                <div className="flex flex-row p-4 gap-5 items-end">
                                  <button
                                    type="submit"
                                    className=" text-white  focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                    onClick={() => UpdateMajor()}
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
                                  Add Major
                                </h3>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    Major Id
                                  </label>
                                  <input
                                    className=" border  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                    onChange={(e) =>
                                      setAddData({
                                        ...addData,
                                        majorId: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <label className="mb-2 text-sm font-medium  text-white flex">
                                    Major Name
                                  </label>
                                  <input
                                    onChange={(e) =>
                                      setAddData({
                                        ...addData,
                                        majorName: e.target.value,
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
                                    onClick={() => AddMajor()}
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

                    <td>
                      <div className="">
                        {" "}
                        <button
                          type="button"
                          id="Delete"
                          className="focus:outline-none text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-red-600 hover:bg-red-700 focus:ring-red-900"
                          onClick={() => onDeleteMajor(major)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          id="Edit"
                          className="text-white  focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800"
                          onClick={() => {
                            setOpenModal(!openModal);
                            setCurrentMajor(major);
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
            {/**Data */}
            <div className="sticky bottom-0 bg-white p-2">
              {majors?.data?.length ? (
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
                    {majors?.data?.length > 0 ? (
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
                      page > majors?.data?.length
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

export default MajorDashboard;
