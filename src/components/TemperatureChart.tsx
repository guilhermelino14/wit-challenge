import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
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

  const data = {
    labels: labels || temperatures.map((_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: `Temperature (${unit === "metric" ? "°C" : "°F"})`,
        data: temperatures,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Line data={data} />
    </div>
  );
};

export default TemperatureChart;
