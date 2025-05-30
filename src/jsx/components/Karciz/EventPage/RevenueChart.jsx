import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

class RevenueChart extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
      ],
      datasets: [
        {
          label: "My First dataset",
          data: [15, 40, 55, 40, 25, 35, 40, 50, 85, 95, 54, 35, 15],
          borderColor: "#13B497",
          borderWidth: "0",
          backgroundColor: [
            "#B41313",
            "#6C0303",
            "#B41313",
            "#6C0303",
            "#B41313",
            "#6C0303",
            "#B41313",
            "#6C0303",
            "#B41313",
            "#6C0303",
            "#B41313",
            "#6C0303",
            "#B41313",
            "#6C0303",
            "#B41313",
            "#6C0303",
            "#B41313",
            "#6C0303",
            "#B41313",
            "#6C0303",
          ],

          hoverBackgroundColor: "#B41313",
          barThickness: 6,
        },
      ],
    };
    const options = {
      plugins: {
        legend: false,
        responsive: true,
        maintainAspectRatio: false,
      },
      scales: {
        y: {
          display: false,
          min: 0,
          max: 100,
          beginAtZero: true,

          ticks: {
            stepSize: 100,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
        x: {
          display: false,
          barPercentage: 0.1,
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
        },
      },
    };

    return (
      <>
        <Bar data={data} height={85} options={options} />
      </>
    );
  }
}

export default RevenueChart;
