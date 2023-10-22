import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import BarChart from "../BarChart";
import LineChart from "../Status/LineChart";
import PieChart from "../Status/PieChart";
import { makeRoles } from "../../utils/common";
import useAuth from "../../hooks/useAuth";

const Dashboard = ({
  classrooms,
  courses,
  teachers,
  students,
  examschedules,
  examslots,
  majors,
  allusers,
}) => {
  const location = useLocation();
  const history = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const refreshParam = searchParams.get("refresh");
    if (refreshParam) {
      setRefreshKey((prevKey) => prevKey + 1);
      // Xóa tham số 'refresh' khỏi URL sau khi làm mới dữ liệu
      searchParams.delete("refresh");
      history.replace({ search: searchParams.toString() });
    }
  }, [location.search, history]);
  return (
    <div className="W-full items-center mt-4">
      <main>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {[...makeRoles([1, 2])].includes(user.roleId) && (
          <>
            <div className=" justify-between mt-8 grid grid-cols-4 ">
              <Link to="/proctoring">
                <div className=" bg-white rounded-lg shadow-md">
                  <h2 className="text-inherit font-bold p-4">Proctoring</h2>
                  <p className="p-4">{teachers?.length}</p>
                </div>
              </Link>
              <Link to="/student">
                <div className=" bg-white rounded-lg shadow-md">
                  <h2 className="text-inherit font-bold p-4">StudentList</h2>
                  <p className="p-4">{students?.length}</p>
                </div>
              </Link>
              <Link to="/room">
                <div className=" bg-white rounded-lg shadow-md">
                  <h2 className="text-inherit font-bold p-4">Classrooms</h2>
                  <p className="p-4">{classrooms?.length}</p>
                </div>
              </Link>
              <Link to="/alluser">
                <div className=" bg-white rounded-lg shadow-md">
                  <h2 className="text-inherit font-bold p-4">User</h2>
                  <p className="p-4">{allusers?.length}</p>
                </div>
              </Link>
            </div>
            <div className=" justify-between mt-3 grid grid-cols-4">
              <Link to="/course">
                <div className=" bg-white rounded-lg shadow-md ">
                  <h2 className="text-inherit font-bold p-4">Course</h2>
                  <p className="p-4">{courses?.length}</p>
                </div>
              </Link>
              <Link to="/examschedule">
                <div className=" bg-white rounded-lg shadow-md">
                  <h2 className="text-inherit font-bold p-4">Exam Schedule</h2>
                  <p className="p-4">{examschedules?.length}</p>
                </div>
              </Link>
              <Link to="/examslot">
                <div className=" bg-white rounded-lg shadow-md">
                  <h2 className="text-inherit font-bold p-4">Exam Slot</h2>
                  <p className="p-4">{examslots?.length}</p>
                </div>
              </Link>
              <Link to="/major">
                <div className=" bg-white rounded-lg shadow-md">
                  <h2 className="text-inherit font-bold p-4">Major</h2>
                  <p className="p-4">{majors?.length}</p>
                </div>
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 ">
              {/* First Column */}
              <div className="lg:w-full">
                <BarChart key={refreshKey} />
                <p>Protoring</p>
              </div>

              {/* Second Column */}
              <div className="place-content-center w-2/3 ">
                <PieChart key={refreshKey} />
                <p>Exam slot on semester</p>
              </div>
            </div>
          </>
        )}
        {[...makeRoles([3, 4])].includes(user.roleId) && (
          <>
            <div className="flex flex-row justify-between mt-3 grid grid-cols-4">
              <div className=" bg-white rounded-lg shadow-md ">
                <h2 className="text-inherit font-bold p-4">Course</h2>
                <p className="p-4">{courses?.length}</p>
              </div>
              <Link to="/examschedule">
                <div className=" bg-white rounded-lg shadow-md">
                  <h2 className="text-inherit font-bold p-4">Exam Schedule</h2>
                  <p className="p-4">{examschedules?.length}</p>
                </div>
              </Link>
              <div className=" bg-white rounded-lg shadow-md">
                <h2 className="text-inherit font-bold p-4">Exam Slot</h2>
                <p className="p-4">{examslots?.length}</p>
              </div>
              <div className=" bg-white rounded-lg shadow-md">
                <h2 className="text-inherit font-bold p-4">Major</h2>
                <p className="p-4">{majors?.length}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 overflow-auto">
              <div className="">
                <p>Protoring</p>
                <BarChart key={refreshKey} />
              </div>
              <div>
                <LineChart key={refreshKey} />
              </div>
            </div>
          </>
        )}
        {[...makeRoles([5])].includes(user.roleId) && (
          <>
            <div className="flex flex-row justify-between mt-3 grid grid-cols-2">
              <div className=" bg-white rounded-lg shadow-md ">
                <h2 className="text-inherit font-bold p-4">Course</h2>
                <p className="p-4">{courses?.length}</p>
              </div>
              <Link to="/examschedule">
                <div className=" bg-white rounded-lg shadow-md">
                  <h2 className="text-inherit font-bold p-4">Exam Schedule</h2>
                  <p className="p-4">{examschedules?.length}</p>
                </div>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

Dashboard.propTypes = {
  classrooms: PropTypes.array,
  courses: PropTypes.array,
  teachers: PropTypes.array,
  students: PropTypes.array,
  examschedules: PropTypes.array,
  examslots: PropTypes.array,
  majors: PropTypes.array,
  allusers: PropTypes.array,
  //semesters: PropTypes.array,
};

export default Dashboard;
