import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import teacherTypes from "../constants/teacherTypes"
import { useSelector } from "react-redux"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
function BarChart() {
  const datate = useSelector((state) => state.teacher)
  const teachers = datate?.contents[teacherTypes.GET_TEACHERS]?.data?.data

  const teacherCounts = {}
  teachers?.forEach((teacher) => {
    const name = teacher.proctoringName
    if (teacherCounts[name]) {
      teacherCounts[name] += 1
    } else {
      teacherCounts[name] = 1
    }
  })

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  }
  //{teachers?.data?.map((teacher) => (tần xuất xuất hiện của tên giảng viên trong danh sách protoring) )}
  //
  const labels = Object.keys(teacherCounts)
  const counts = Object.values(teacherCounts)
  const compensations = counts?.map((count) => count * 4.25)
  //
  const data = {
    labels,
    datasets: [
      {
        label: "hours",
        data: counts,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: "compensations",
        data: compensations,
        backgroundColor: "rgba(53, 162, 235, 1)",
      },
    ],
  }

  return <Bar options={options} data={data} />
}

export default BarChart
