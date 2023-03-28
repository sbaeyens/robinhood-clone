import React, { useDebugValue } from "react";
import "./StockChart.css";
// import { Line } from "chart.js";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPortfolio } from "../../store/portfolio"
import { fetchStockChartData } from "../../Utils";
import { useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_POLYGON_API_KEY;
const BASE_URL = "https://api.polygon.io/v2/";

function StockChart() {
  const dispatch = useDispatch();

  const [buyingPower, setBuyingPower] = useState("");
  const [stockChartData, setStockChartData] = useState(null);
  const [dateRange, SetDateRange] = useState(90);

  const user = useSelector((state) => state.session.user);
  const portfolio = useSelector((state) => state.portfolio);
  let { ticker } = useParams();
  console.log("ticker", ticker);

  // const getStockData = async (ticker) => {

  //       let response = await fetch(`${BASE_URL}aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-01-09?apiKey=${API_KEY}`);
  //       let data = await response.json()
  //       console.log("inside the async function", data)
  //       setStockData(data.results)
  //       return data
  //   }

  //   useEffect(() => {
  //     fetchStockChartData(ticker, 30, setStockChartData)
  //   }, []);
  // console.log("stock chart Data,", stockChartData)

  useEffect(() => {
    async function fetchChartData() {
      const data = await fetchStockChartData(ticker.toUpperCase(), dateRange);
      const labels = data.results.map((result) =>
        new Date(result.t).toLocaleDateString()
      );
      const prices = data.results.map((result) => result.c);
      setStockChartData({
        labels,
        datasets: [
          {
            data: prices,
            backgroundColor: "none",
            borderColor: "#5AC53B",
            borderWidth: 2,
            pointBorderColor: "rgba(0, 0, 0, 0)",
            pointBackgroundColor: "rgba(0, 0, 0, 0)",
            pointHoverBackgroundColor: "#5AC53B",
            pointHoverBorderColor: "#000000",
            pointHoverBorderWidth: 4,
            pointHoverRadius: 6,
            tension: 0.0,
            fill: false,
          },
        ],
      });
    }
    fetchChartData();
  }, [dateRange, ticker]);

  useEffect(() => {
    dispatch(getUserPortfolio());
  }, [dispatch]);

  // let APPL = getStockData("APPL").then((answer) => answer.data)
  // console.log("AAPL data", APPL)
  console.log("stockChartData from component", stockChartData);

  console.log("portfolio from component", portfolio);
  // console.log("checking stockData", stockData)

  const data = [
    {
      x: 0,
      y: 10,
    },
    {
      x: 5,
      y: 50,
    },
    {
      x: 10,
      y: 2,
    },
    {
      x: 15,
      y: 10,
    },
    {
      x: 20,
      y: 14,
    },
  ];

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
          drawOnChartArea: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
          drawOnChartArea: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: false,
    },
  };

  return (
    <div className="chart-container">
      <div className="value-summary">
        <h1>$50,000</h1>
        <p>+$55.55 (+0.05%) Today</p>
      </div>
      <div className="line-chart">
        {stockChartData && <Line data={stockChartData} options={options} />}
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
        <h2>${portfolio?.balance}</h2>
      </div>
    </div>
  );
}

export default StockChart;
