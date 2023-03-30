import React, { useDebugValue } from "react";
import "./StockChart.css";
// import { Line } from "chart.js";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPortfolio } from "../../store/portfolio"
import { fetchStockChartData, fetchStockDetails } from "../../Utils";
import { useParams } from "react-router-dom";

const API_KEY = process.env.REACT_APP_POLYGON_API_KEY;
const BASE_URL = "https://api.polygon.io/v2/";

function StockChart({ticker}) {
  const dispatch = useDispatch();

  const [buyingPower, setBuyingPower] = useState("");
  const [stockChartData, setStockChartData] = useState(null);
  const [dateRange, setDateRange] = useState(90);
  const [currentPrice, setCurrentPrice] = useState(0)
  const [stockName, setStockName] = useState("");
  // const [activeclass, setActiveClass] = useState("")
  const [isActive, setActive] = useState(false);


  const user = useSelector((state) => state.session?.user);
  const portfolio = useSelector((state) => state.portfolio);



  useEffect(() => {
    if (!ticker) {
      return
    }
    async function fetchChartData() {
      const data = await fetchStockChartData(ticker, dateRange);
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
    if (!ticker) {
      return;
    }
    async function runFetchStockDetails() {
      const data = await fetchStockDetails(ticker);
      let openPrice = data.ticker.day.o;
      let change = data.ticker.todaysChange;
      let currentPrice = openPrice + change;

      setCurrentPrice(currentPrice)
      setStockName(data.ticker.ticker)
    }
    runFetchStockDetails();

  }, [dateRange, ticker]);

  useEffect(() => {
    dispatch(getUserPortfolio());
  }, [dispatch]);



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

  // const handleChange = (e) => {
  //   console.log("e from handleChange function", e)
  // }

   const toggleClass = () => {
     setActive(!isActive);
   };

  return (
    <div className="chart-container">
      <div className="value-summary">
        <h1>{stockName}</h1>
        <h1>{currentPrice}</h1>
        <p>+$55.55 (+0.05%) Today</p>
      </div>
      <div className="line-chart">
        {stockChartData && <Line data={stockChartData} options={options} />}
      </div>
      <div className="timeline-container">
        <div className="timeline-buttons-container">
          <div
            className={isActive ? "timeline-button active" : "timeline-button"}
            onClick={() => {
              setDateRange(2);
              toggleClass();
            }}
          >
            1D
          </div>
          <div
            className={isActive ? "timeline-button active" : "timeline-button"}
            onClick={() => {
              setDateRange(7);
              toggleClass();
            }}
          >
            1W
          </div>
          <div
            className={isActive ? "timeline-button active" : "timeline-button"}
            onClick={() => {
              setDateRange(30);
              toggleClass();
            }}
          >
            1M
          </div>
          <div
            name="3M"
            className={isActive ? "timeline-button active" : "timeline-button"}
            // onClick={handleChange("3M")}
            onClick={() => {
              setDateRange(90);
              toggleClass();
            }}
          >
            3M
          </div>
          <div
            className={isActive ? "timeline-button active" : "timeline-button"}
            onClick={() => {
              setDateRange(365);
              toggleClass();
            }}
          >
            1Y
          </div>
          <div
            className={isActive ? "timeline-button active" : "timeline-button"}
            onClick={() => {
              setDateRange(365*5);
              toggleClass();
            }}
          >
            ALL
          </div>
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
