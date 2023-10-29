import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import BarChart from "../BarChart"
import LineChart from "../Status/LineChart"
import PieChart from "../Status/PieChart"
import { makeRoles } from "../../utils/common"
import useAuth from "../../hooks/useAuth"
import { Bar, Line, Pie } from "react-chartjs-2"

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
  const { user } = useAuth()

  const examSlotData = {
    labels: [],
    datasets: [
      {
        label: "Compensation",
        data: [],
        backgroundColor: [],
      },
    ],
  }

  // Đảm bảo rằng dữ liệu thời gian được tính toán đúng đơn vị
  const startTimes = examslots?.map(
    (slot) => new Date(`1970-01-01T${slot.startTime}`)
  )
  const endTimes = examslots?.map(
    (slot) => new Date(`1970-01-01T${slot.endTime}`)
  )

  // Tạo dữ liệu cho biểu đồ đường
  const timeData = {
    labels: examslots?.map((slot) => slot.examSlotName),
    datasets: [
      {
        label: "Start Time",
        data: startTimes?.map((time) => time.getHours()), // Hiển thị theo giờ
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "End Time",
        data: endTimes?.map((time) => time.getHours()), // Hiển thị theo giờ
        borderColor: "rgba(192, 75, 192, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  }

  // Xử lý dữ liệu từ examslots
  examslots?.forEach((examSlot) => {
    examSlotData.labels.push(examSlot.examSlotName)
    const compensation = examSlot.listProctoring.reduce(
      (totalCompensation, proctor) =>
        totalCompensation + parseFloat(proctor.compensation),
      0
    )
    examSlotData.datasets[0].data.push(compensation)

    // Tạo màu sắc ngẫu nhiên cho cột biểu đồ
    const randomColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 0.6)`
    examSlotData.datasets[0].backgroundColor.push(randomColor)
  })

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-6 mt-8">
        {[...makeRoles([1, 2])].includes(user.roleId) && (
          <>
            <Link to="/proctoring" className="dashboard-card">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-inherit font-bold">Proctoring</h2>
                <p className="mt-4">{teachers?.length}</p>
              </div>
            </Link>
            <Link to="/student" className="dashboard-card">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-inherit font-bold">Student List</h2>
                <p className="mt-4">{students?.length}</p>
              </div>
            </Link>
            <Link to="/room" className="dashboard-card">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-inherit font-bold">Classrooms</h2>
                <p className="mt-4">{classrooms?.length}</p>
              </div>
            </Link>
            <Link to="/alluser" className="dashboard-card">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-inherit font-bold">User</h2>
                <p className="mt-4">{allusers?.length}</p>
              </div>
            </Link>
          </>
        )}
        {[...makeRoles([4])].includes(user.roleId) && (
          <>
            <BarChart></BarChart>
          </>
        )}
        {[...makeRoles([3])].includes(user.roleId) && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 dashboard-card">
              <h2 className="text-inherit font-bold">Course</h2>
              <p className="mt-4">{courses?.length}</p>
            </div>
            <Link to="/examschedule" className="dashboard-card">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-inherit font-bold">Exam Schedule</h2>
                <p className="mt-4">{examschedules?.length}</p>
              </div>
            </Link>
            <div className="bg-white rounded-lg shadow-md p-6 dashboard-card">
              <h2 className="text-inherit font-bold">Exam Slot</h2>
              <p className="mt-4">{examslots?.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 dashboard-card">
              <h2 className="text-inherit font-bold">Major</h2>
              <p className="mt-4">{majors?.length}</p>
            </div>
          </>
        )}
        {[...makeRoles([5])].includes(user.roleId) && (
          <>
            <div className="bg-white rounded-lg shadow-md p-6 dashboard-card">
              <h2 className="text-inherit font-bold">Course</h2>
              <p className="mt-4">{courses?.length}</p>
            </div>
            <Link to="/examschedule" className="dashboard-card">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-inherit font-bold">Exam Schedule</h2>
                <p className="mt-4">{examschedules?.length}</p>
              </div>
            </Link>
          </>
        )}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 dashboard-card">
          <h2 className="text-inherit font-bold">Exam Slot Chart</h2>
          <Bar data={examSlotData} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 dashboard-card">
          <h2 className="text-inherit font-bold">Time Chart</h2>
          <Line data={timeData} />
        </div>
      </div>
    </div>
  )
}

Dashboard.propTypes = {
  classrooms: PropTypes.array,
  courses: PropTypes.array,
  teachers: PropTypes.array,
  students: PropTypes.array,
  examschedules: PropTypes.array,
  examslots: PropTypes.array,
  majors: PropTypes.array,
  allusers: PropTypes.array,
}

export default Dashboard
