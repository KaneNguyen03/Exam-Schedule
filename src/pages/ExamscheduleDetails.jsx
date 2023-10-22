import React, { useState } from "react"
import Sidebar from "../components/Layout/Sidebar"
import useAuth from "../hooks/useAuth"

const ExamscheduleDetails = () => {
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    keyword: "",
  })
  const { user } = useAuth()
  return (
    <div className="">
      {/* {loadings && <LoadingSpinner />} */}
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
                {/* {convertDataExamSlots?.map((examschedule) => (
                    <tr
                      className="bg-white border-b  border-gray-700"
                      key={examschedule?.examscheduleId}
                    >
                      <td className="px-6 py-4">{examschedule.courseId}</td>
                      <td className="px-6 py-4">{examschedule.classroomId}</td>
                      <td className="px-6 py-4">
                        {examschedule?.start
                          .toString()
                          .split(" ")
                          .slice(1, 4)
                          .join(" ")}
                      </td>
                      <td className="px-6 py-4">
                        {examschedule?.start
                          .toString()
                          .split(" ")[4]
                          .split(":")
                          .slice(0, 2)
                          .join(":")}
                      </td>
                      <td className="px-6 py-4">
                        {examschedule?.end
                          .toString()
                          .split(" ")[4]
                          .split(":")
                          .slice(0, 2)
                          .join(":")}
                      </td>
                    </tr>
                  ))} */}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ExamscheduleDetails
