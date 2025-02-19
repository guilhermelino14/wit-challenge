import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Box } from '@mui/material';
import { TemperatureChartProps } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureChart = ({ temperatures, unit, labels }: TemperatureChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Temperature Throughout the Day',
      },
    },
  };

  const data = {
    labels: labels || temperatures.map((_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: `Temperature (${unit === "metric" ? "°C" : "°F"})`,
        data: temperatures,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.4,
      },
    ],
  };

  return (
    <Box sx={{ width: '100%', height: '400px' }}>
      <Line options={options} data={data} />
    </Box>
  );
};

export default TemperatureChart;
