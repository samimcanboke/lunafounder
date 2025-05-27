import React from "react";
import ReactApexChart from "react-apexcharts";

class HomeSalesRevenueChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // only keep options, remove hard‑coded series
      options: {
        chart: {
          height: 400,
          type: "area",
          group: "social",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        xaxis: {
          categories: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          labels: {
            style: {
              colors: "green",
              fontSize: "14px",
              fontFamily: "Poppins",
              fontWeight: 100,
            },
            rotate: -45,
          },
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          min: 0,
          max: 1000000,
          tickAmount: 5,
          labels: {
            minWidth: 20,
            offsetX: -16,
            style: {
              colors: "green",
              fontSize: "14px",
              fontFamily: "Poppins",
              fontWeight: 100,
            },
            formatter: function (value) {
              return (value / 1000).toFixed(0) + "k";
            },
          },
        },
        fill: {
          colors: ["#fff"],
          type: "gradient",
          opacity: 1,
          gradient: {
            shade: "light",
            shadeIntensity: 1,
            colorStops: [
              [
                {
                  offset: 0,
                  color: "#fff",
                  opacity: 0,
                },
                {
                  offset: 0.6,
                  color: "var(--primary)",
                  opacity: 0,
                },
                {
                  offset: 100,
                  color: "var(--primary)",
                  opacity: 0,
                },
              ],
              [
                {
                  offset: 0,
                  color: "var(--primary)",
                  opacity: 0.4,
                },
                {
                  offset: 50,
                  color: "var(--primary)",
                  opacity: 0.25,
                },
                {
                  offset: 100,
                  color: "var(--primary)",
                  opacity: 0,
                },
              ],
            ],
          },
        },
        colors: ["var(--primary)"],
        grid: {
          borderColor: "rgba(221, 221, 221,0.1)",
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          enabled: false,
        },
        stroke: {
          width: 3,
          color: "red",
          curve: "smooth",
        },
        responsive: [
          {
            breakpoint: 1602,
            options: {
              markers: {
                hover: {
                  size: 7,
                },
              },
              chart: {
                height: 230,
                width: "100%",
              },
            },
          },
        ],
      },
    };
  }

  render() {
    // build categories & series from incoming prop
    const data = this.props.data || {};
    const categories = Object.keys(data);
    const seriesData = categories.map((m) => data[m]);

    const options = {
      ...this.state.options,
      xaxis: {
        ...this.state.options.xaxis,
        categories,
      },
    };

    return (
      <div id="activity">
        <ReactApexChart
          options={options}
          series={[{ name: "Revenue", data: seriesData }]}
          type="area"
          height={300}
          width="100%"
        />
      </div>
    );
  }
}

export default HomeSalesRevenueChart;
