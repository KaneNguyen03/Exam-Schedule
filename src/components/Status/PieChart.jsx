import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
////////////////////////////////////////////////////////////////
import { useSelector } from "react-redux";
import examslotTypes from "../../constants/examslotTypes";
import semesterTypes from "../../constants/semesterTypes";
import courseTypes from "../../constants/courseTypes";
import majorTypes from "../../constants/majorTypes";

////////////////////////////////

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend);

function PieChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  // từ / Major /semesterID / couser / Exam slots
  const dataexsl = useSelector((state) => state.examslot);
  const dataco = useSelector((state) => state.course);
  const datase = useSelector((state) => state.semester);
  const datamj = useSelector((state) => state.major);
  const examslots = dataexsl?.contents[examslotTypes.GET_EXAMSLOTS]?.data?.data;
  const courses = dataco?.contents[courseTypes.GET_COURSES]?.data?.data;
  const semesters = datase?.contents[semesterTypes.GET_SEMESTERS]?.data?.data;
  const majors = datamj?.contents[majorTypes.GET_MAJORS]?.data?.data;
  const slotsCount = {};

  examslots?.forEach((examSlot) => {
    const courseId = examSlot.courseId;
    const course = courses?.find((course) => course.courseId === courseId);
    const semester = semesters?.find(
      (semester) => semester.semesterId === course.semesterId
    );

    const major = majors?.find((major) => major.majorId === semester.majorId);

    if (course && semester && major) {
      const semesterId = semester.semesterId; // Include semesterId
      const majorId = major.majorId; // Include majorId
      const key = `${courseId}-${semesterId}-${majorId}`;

      // Kiểm tra xem khóa đã tồn tại trong bảng thống kê chưa, nếu chưa thì tạo mới
      slotsCount[key] = (slotsCount[key] || 0) + 1;
      //console.log("🚀 ~ file: PieChart.jsx:58 ~ slotsCount:", slotsCount);
    }
  });
  function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.8)`;
  }
  const values = Object.values(slotsCount);
  const labels = Object.keys(slotsCount);
  const backgroundColors = labels.map(() => randomColor());
  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Exam current cases",
  //       data: values,
  //       backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)"],
  //       borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  const data = {
    labels,
    datasets: labels.map((label, index) => ({
      label: label,
      data: [values[index]],
      backgroundColor: [backgroundColors[index]],
      borderColor: [backgroundColors[index].replace("0.8", "1")],
      borderWidth: 1,
    })),
  };

  return <Pie options={options} data={data} />;
}

export default PieChart;
