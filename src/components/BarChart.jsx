import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "All information available in the current semester",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
