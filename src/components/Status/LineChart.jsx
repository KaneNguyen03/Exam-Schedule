import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import teacherTypes from "../../constants/teacherTypes";
import { useSelector } from "react-redux";
//import { components } from "react-select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const datate = useSelector((state) => state.teacher);
  const teachers = datate?.contents[teacherTypes.GET_TEACHERS]?.data?.data;

  const teacherCounts = {};
  teachers?.forEach((teacher) => {
    const name = teacher.proctoringName;
    if (teacherCounts[name]) {
      teacherCounts[name] += 1;
    } else {
      teacherCounts[name] = 1;
    }
  });

  const labels = teachers?.map((teacher) => teacher.proctoringName);
  const counts = Object.values(teacherCounts);
  const compensations = counts.map((count) => count * 4.25);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "compensations in semesters",
        data: compensations,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-row justify-center">
      <Line options={options} data={data} />
    </div>
  );
}

export default LineChart;
