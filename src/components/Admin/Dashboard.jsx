import React from "react"
import { Bar } from "react-chartjs-2"
import PropTypes from "prop-types"
import LoadingSpinner from "../../constants/commons/loading-spinner/LoadingSpinner"

const BarChart = ({ data }) => {
  const chartData = {
    labels: [
      "Proctoring",
      "StudentList",
      "Exam rooms",
      "Semester",
      "Number of Courses",
      "Major",
      "Exam Slot",
      "Exam Schedule",
    ],
    datasets: [
      {
        label: "Data",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  }

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return <Bar data={chartData} options={chartOptions} />
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
}

const Dashboard = ({
  classrooms,
  courses,
  teachers,
  students,
  examschedules,
  examslots,
  majors,
  semesters,
  allusers,
  loadings,
  reproctoring,
  
}) => {
  return (
    <div className="h-full p-8">
      {loadings && <LoadingSpinner />}
      <div className="text-slate-800 font-semibold text-3xl">Dashboard</div>
      <div className="grid grid-cols-2 gap-8 justify-items-center p-24">
        <div className="border border-black rounded-lg cursor-pointer w-64 font-medium text-base">
          <div className="flex">
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              {/* Your icon here */}
            </span>
            <div>
              <h4>Proctoring</h4>
              <p>{teachers?.length}</p>
            </div>
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              {/* Your icon here */}
            </span>
            <div>
              <h4>Student List</h4>
              <p>{students?.length}</p>
            </div>
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              {/* Your icon here */}
            </span>
            <div>
              <h4>Exam Rooms</h4>
              <p>{classrooms?.length}</p>
            </div>
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              {/* Your icon here */}
            </span>
            <div>
              <h4>Semester</h4>
              <p>{semesters?.length}</p>
            </div>
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              {/* Your icon here */}
            </span>
            <div>
              <h4>Number of Courses</h4>
              <p>{courses?.length}</p>
            </div>
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              {/* Your icon here */}
            </span>
            <div>
              <h4>Major</h4>
              <p>{majors?.length}</p>
            </div>
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              {/* Your icon here */}
            </span>
            <div>
              <h4>Exam Slot</h4>
              <p>{examslots?.length}</p>
            </div>
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              {/* Your icon here */}
            </span>
            <div>
              <h4>Exam Schedule</h4>
              <p>{examschedules?.length}</p>
            </div>
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              {/* Your icon here */}
            </span>
            <div>
              <h4>Number of Courses</h4>
              <p>{courses?.length}</p>
            </div>
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              {/* Your icon here */}
            </span>
            <div>
              <h4>Major</h4>
              <p>{majors?.length}</p>
            </div>
            <span className="flex items-center justify-center text-lg text-gray-400 p-1">
              {/* Your icon here */}
            </span>
            <div>
              <h4>Exam Slot</h4>
              <p>{examslots?.length}</p>
            </div>
          </div>
          {/**BarChart đã xóa */}
        </div>
        {/* ... Other chart components ... */}
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
  semesters: PropTypes.array,
  loadings: PropTypes.bool.isRequired,
  registers: PropTypes.array,
  reproctoring: PropTypes.array,
}

export default Dashboard

// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import PropTypes from "prop-types";
// import LoadingSpinner from "../../constants/commons/loading-spinner/LoadingSpinner";

// const Dashboard = ({
//   classrooms,
//   courses,
//   teachers,
//   students,
//   examschedules,
//   examslots,
//   majors,
//   semesters,
//   loadings,
// }) => {
//   const [chartData, setChartData] = useState({
//     labels: [
//       "Proctoring",
//       "StudentList",
//       "Exam rooms",
//       "Semester",
//       "Number of Courses",
//       "Major",
//       "Exam Slot",
//       "Exam Schedule",
//     ],
//     datasets: [
//       {
//         label: "Data",
//         data: [
//           teachers?.length || 0,
//           students?.length || 0,
//           examschedules?.length || 0,
//           examslots?.length || 0,
//           classrooms?.length || 0,
//           courses?.length || 0,
//           majors?.length || 0,
//           semesters?.length || 0,
//         ],
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//         borderRadius: 10,
//       },
//     ],
//   });

//   const chartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   useEffect(() => {
//     // Update chart data when any of the data arrays change
//     const newChartData = {
//       ...chartData,
//       datasets: [
//         {
//           ...chartData.datasets[0],
//           data: [
//             teachers?.length || 0,
//             students?.length || 0,
//             examschedules?.length || 0,
//             examslots?.length || 0,
//             classrooms?.length || 0,
//             courses?.length || 0,
//             majors?.length || 0,
//             semesters?.length || 0,
//           ],
//         },
//       ],
//     };
//     setChartData(newChartData);
//   }, [
//     teachers,
//     students,
//     examschedules,
//     examslots,
//     classrooms,
//     courses,
//     majors,
//     semesters,
//   ]);

//   return (
//     <div className="h-full p-8">
//       {loadings && <LoadingSpinner />}
//       <div className="text-slate-800 font-semibold text-3xl">Dashboard</div>
//       <div className="grid grid-cols-2 gap-8 justify-items-center p-24">
//         <div className="border border-black rounded-lg cursor-pointer w-64 font-medium text-base">
//           <div className="flex">
//             <span className="flex items-center justify-center text-lg text-gray-400 p-1">
//               {/* Your icon here */}
//             </span>
//             <div>
//               <h4>Data Dashboard</h4>
//               <p>{chartData?.length}</p>
//             </div>
//           </div>
//           <div className="chart-container">
//             <Bar data={chartData} options={chartOptions} />
//           </div>
//         </div>
//         {/* ... Other chart components ... */}
//       </div>
//     </div>
//   );
// };

// Dashboard.propTypes = {
//   classrooms: PropTypes.array,
//   courses: PropTypes.array,
//   teachers: PropTypes.array,
//   students: PropTypes.array,
//   examschedules: PropTypes.array,
//   examslots: PropTypes.array,
//   majors: PropTypes.array,
//   semesters: PropTypes.array,
//   loadings: PropTypes.bool.isRequired,
// };

// export default Dashboard;
