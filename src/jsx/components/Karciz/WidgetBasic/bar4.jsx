import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-streaming";
var createReactClass = require("create-react-class");

/* const onRefresh = chart => {
  const now = Date.now();
  chart.data.datasets.forEach(dataset => {
    dataset.data.push({
      x: now,
      y: Math.random() * 100,
    });
  });
}; */

const data = {
  labels: [
    "4",
    "1",
    "2",
    " ",
    "4",
    "5",
    "6",
    "9",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
  ],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(105,255,147,1)",
      strokeColor: "rgba(105,255,147,1)",
      pointColor: "rgba(0,0,0,0)",
      pointStrokeColor: "rgba(105,255,147,1)",
      pointHighlightFill: "rgba(105,255,147,1)",
      pointHighlightStroke: "rgba(105,255,147,1)",
      data: [],
    },
  ],
};

const options = {
  type: "bar",
  scales: {
    y: {
      display: false,
    },

    x: {
      display: false,

      realtime: {
        onRefresh: function () {
          data.datasets[0].data.push({
            x: Date.now(),
            y: Math.random() * 100,
          });
        },
        delay: 2000,
        duration: 20000,
        refresh: 1000,
      },
    },
  },

  plugins: {
    tooltips: {
      enabled: false,
    },
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
    streaming: {
      frameRate: 0, // chart is drawn 30 times every second
    },
  },
};

export default createReactClass({
  displayName: "LineExample",
  render() {
    return (
      <div>
        <Bar data={data} options={options} height={180} />
      </div>
    );
  },
});
