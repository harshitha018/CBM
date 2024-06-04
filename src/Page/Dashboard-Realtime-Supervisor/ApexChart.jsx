import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

// Function to generate time series data based on hours
function generateHourlyTimeSeries(baseval, count, yrange) {
  let i = 0;
  const series = [];
  while (i < count) {
    const x = baseval;
    const y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 3600000; // Increment by 1 hour (in milliseconds)
    i++;
  }
  return series;
}

const ApexChart = () => {
  const [series] = useState([
    {
      name: "Ready",
      data: generateHourlyTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        20,
        {
          min: 10,
          max: 60,
        }
      ),
    },
    {
      name: "Not Ready",
      data: generateHourlyTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        20,
        {
          min: 10,
          max: 20,
        }
      ),
    },
    {
      name: "Call Status",
      data: generateHourlyTimeSeries(
        new Date("11 Feb 2017 GMT").getTime(),
        20,
        {
          min: 10,
          max: 15,
        }
      ),
    },
  ]);

  const [options] = useState({
    chart: {
      type: "area",
      height: 140, // Maintain the same chart height
      stacked: true,
      background:
        "#FFFFFF",

      events: {
        selection: function (chart, e) {
          console.log(new Date(e.xaxis.min));
        },
      },
    },
    colors: ["#00E396", "#FF0000", "#fde047"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: "#000000", // Change legend text color to white
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM",
          day: "dd",
          hour: "hh:mm tt", // Format to display hours with AM/PM notation
        },
        style: {
          colors: "#000000", // Change x-axis label color to white
        },
      },
      axisBorder: {
        color: "#000000", // Change x-axis border color to white
      },
      axisTicks: {
        color: "#000000", // Change x-axis ticks color to white
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#000000", // Change y-axis label color to white
        },
      },
      axisBorder: {
        color: "#000000", // Change y-axis border color to white
      },
      axisTicks: {
        color: "#000000", // Change y-axis ticks color to white
      },
    },
    tooltip: {
      theme: "dark", // Change tooltip to dark theme
      x: {
        format: "dd MMM yyyy hh:mm tt", // Tooltip format with AM/PM notation
      },
    },
    theme: {
      mode: "dark", // Ensure the overall theme is dark
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={140}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
