import React, { useDebugValue } from "react";
import "./StockChart.css";
// import { Line } from "chart.js";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const API_KEY = process.env.REACT_APP_POLYGON_API_KEY;
const BASE_URL = "https://api.polygon.io/v2/";

function StockChart() {


    const [stockData, setStockData] = useState([])



    const getStockData = async (ticker) => {

        let response = await fetch(`${BASE_URL}aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-01-09?apiKey=${API_KEY}`);
        let data = await response.json()
        console.log("inside the async function", data)
        setStockData(data.results)
        return data
    }

    useEffect(() => {
        getStockData("AAPL")
    }, []);

    // let APPL = getStockData("APPL").then((answer) => answer.data)
    // console.log("AAPL data", APPL)

    console.log("checking stockData", stockData)

    const data = [
      {
        x: 0,
        y: 10
      },
      {
        x: 5,
        y: 50
      },
      {
        x: 10,
        y: 2
      },
      {
        x: 15,
        y: 10
      },
      {
        x: 20,
        y: 14
      }
    ];

    const options = {
      plugins: {
        legend: false,
      },
      scales: {
        y: {
          min: -20,
          max: 150,
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
        },
      },
    };

  return (
    <div className="chart-container">
      <div className="value-summary">
        <h1>$50,000</h1>
        <p>+$55.55 (+0.05%) Today</p>
      </div>
      <div className="line-chart">
        <Line
          data={{
            labels: [0, 5, 10, 15, 20], //map x to this
            datasets: [
              {
                type: "line",
                data: data, //map y to this
                backgroundColor: "black",
                borderColor: "#5AC53B",
                borderWidth: 2,
                pointBorderColor: "rgba(0, 0, 0, 0)",
                pointBackgroundColor: "rgba(0, 0, 0, 0)",
                pointHoverBackgroundColor: "#5AC53B",
                pointHoverBorderColor: "#000000",
                pointHoverBorderWidth: 4,
                pointHoverRadius: 6,
                data: data,
              },
            ],
          }}
          options={options}
        />
      </div>
      <div className="timeline-container">
        <div className="timeline-buttons-container">
          <div className="timeline-button">1D</div>
          <div className="timeline-button active">1W</div>
          <div className="timeline-button">1M</div>
          <div className="timeline-button">3M</div>
          <div className="timeline-button">1Y</div>
          <div className="timeline-button">ALL</div>
        </div>
      </div>
      <div className="buying-power-container">
        <h2>Buying Power</h2>
        <h2>$22,222.22</h2>

      </div>
    </div>
  );
}

export default StockChart;
