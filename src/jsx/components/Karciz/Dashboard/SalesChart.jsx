import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import { Chart, Filler } from "chart.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

Chart.register(Filler);

class SalesChart extends Component {
  render() {
    const data = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "My First dataset",
          data: [0, 4, 2, 5, 6],
          backgroundColor: ["rgba(19, 180, 151, 0.1)"],
          borderColor: "#13B497",
          fill: true,
          pointBackgroundColor: "#13B497",
          pointBorderColor: "#13B497",
          borderWidth: 4,
          tension: 0.5,

          pointHoverBackgroundColor: "#13B497",
          pointHoverBorderColor: "#13B497",
        },
      ],
    };
    const options = {
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          intersect: false,
          mode: "nearest",

          padding: 10,
          caretPadding: 10,
        },
        responsive: !0,
        hover: {
          mode: "index",
        },
      },
      maintainAspectRatio: !1,
      /* title: {
				display: !1
			}, */
      /* tooltips: {
				intersect: !1,
				mode: "nearest",
				xPadding: 10,
				yPadding: 10,
				caretPadding: 10
			}, */
      /* legend: {
				display: false
			}, */

      /* hover: {
				mode: "index"
			}, */
      scales: {
        x: {
          display: !1,
          gridLines: !1,
          scaleLabel: {
            display: !0,
            labelString: "Month",
          },
        },
        y: {
          display: !1,
          gridLines: !1,
          scaleLabel: {
            display: !0,
            labelString: "Value",
          },
          ticks: {
            beginAtZero: false,
          },
        },
      },
      elements: {
        point: {
          radius: 0,
          borderWidth: 0,
        },
        line: {
          tension: 0,
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 5,
          bottom: 0,
        },
      },
    };

    return (
      <>
        <Line data={data} height={60} options={options} />
      </>
    );
  }
}

export default SalesChart;
