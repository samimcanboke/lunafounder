import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const data = {
  defaultFontFamily: "Poppins",
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "My First dataset",
      data: [25, 20, 60, 41, 66, 45, 80],
      borderColor: "rgba(19,180,151,1)",
      borderWidth: "2",
      backgroundColor: "transparent",
      pointBackgroundColor: "rgba(19,180,151,1)",
      tension: 0.4,
    },
    {
      label: "My First dataset",
      data: [5, 20, 15, 41, 35, 65, 80],
      borderColor: "transparent",
      borderWidth: "2",
      backgroundColor: "transparent",
      pointBackgroundColor: "transparent",
      tension: 0.4,
    },
  ],
};

const options = {
  plugins: {
    legend: false,
    tooltips: {
      intersect: false,
    },
    hover: {
      intersect: true,
    },
  },
  scales: {
    y: {
      ticks: {
        beginAtZero: true,
        max: 100,
        min: 0,
        stepSize: 20,
        padding: 10,
      },
    },

    x: {
      ticks: {
        padding: 5,
      },
    },
  },
};
class DualLine extends Component {
  render() {
    return <Line data={data} options={options} height={150} />;
  }
}

export default DualLine;
