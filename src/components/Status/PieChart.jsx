import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  //Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Pie } from "react-chartjs-2"
////////////////////////////////////////////////////////////////
import { useSelector } from "react-redux"
import examslotTypes from "../../constants/examslotTypes"

////////////////////////////////

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend)

function PieChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  }
  // từ / Major /semesterID / couser / Exam slots
  const dataexsl = useSelector((state) => state.examslot)
  const examslots = dataexsl?.contents[examslotTypes.GET_EXAMSLOTS]?.data?.data
  const slotsCount = {}

  examslots?.forEach((examSlot) => {
    const examSlotId = examSlot.examSlotId

    if (examSlotId) {
      const key = `${examSlotId}`

      // Kiểm tra xem khóa đã tồn tại trong bảng thống kê chưa, nếu chưa thì tạo mới
      slotsCount[key] = (slotsCount[key] || 0) + 1
    }
  })
  function randomColor() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgba(${r}, ${g}, ${b}, 0.8)`
  }

  const values = Object.values(slotsCount)
  const labels = Object.keys(slotsCount)
  const backgroundColors = labels?.map(() => randomColor())

  const data = {
    labels,
    datasets: [
      {
        label: "Exam current cases",
        data: values,
        backgroundColor: backgroundColors, // Assign the generated colors here
        borderColor: backgroundColors?.map((color) => color.replace("0.8", "1")),
        borderWidth: 1,
      },
    ],
  }

  return <Pie options={options} data={data} />
}

export default PieChart
