import React from "react";
import "./StockChart.css";
// import { Line } from "chart.js";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
// import axios from "axios"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPortfolio } from "../../store/portfolio"
import { fetchStockChartData, fetchStockDetails } from "../../Utils";
// import { useParams } from "react-router-dom";
import { addCommas } from "../../Utils";

// const API_KEY = process.env.REACT_APP_POLYGON_API_KEY;
// const BASE_URL = "https://api.polygon.io/v2/";

function StockChart({ticker}) {
  const dispatch = useDispatch();

  // const [buyingPower, setBuyingPower] = useState("");
  const [stockChartData, setStockChartData] = useState(null);
  const [dateRange, setDateRange] = useState(90);
  const [currentPrice, setCurrentPrice] = useState(0)
  const [stockName, setStockName] = useState("");
  // const [activeclass, setActiveClass] = useState("")
  const [isActive, setActive] = useState(false);
    const [portfolioGain, setPortfolioGain] = useState((0).toFixed(2));
    const [portfolioPercent, setPortfolioPercent] = useState(0);
    const [rangeText, setRangeText] = useState("All Time");


  // const user = useSelector((state) => state.session?.user);
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

      if (dateRange === 2) {
        setRangeText("Past Day");
      } else if (dateRange === 7) {
        setRangeText("Past Week");
      } else if (dateRange === 30) {
        setRangeText("Past Month");
      } else if (dateRange === 90) {
        setRangeText("Past 3 Months");
      } else if (dateRange === 365) {
        setRangeText("Past Year");
      } else {
        setRangeText("All Time");
      }

      // labels = labels.slice(-1 * dateRange);
      // prices = prices.slice(-1 * dateRange);

      // console.log("dates for portfolio hist", labels);

      let mostRecentRecord = prices[prices.length - 1];
      console.log("mostRecentRecord", mostRecentRecord);
      // setPortfolioTotal(mostRecentRecord);
      let gain = (prices[prices.length - 1] - prices[0]).toFixed(2);
      setPortfolioGain(gain);
      let percentGain = ((gain / prices[0]) * 100).toFixed(2);
      setPortfolioPercent(percentGain);


      console.log(labels)
      console.log(prices)
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
    if (dateRange === 2) {
      setRangeText("Past Day");
    } else if (dateRange === 7) {
      setRangeText("Past Week");
    } else if (dateRange === 30) {
      setRangeText("Past Month");
    } else if (dateRange === 90) {
      setRangeText("Past 3 Months");
    } else if (dateRange === 365) {
      setRangeText("Past Year");
    } else {
      setRangeText("All Time");
    }

    async function runFetchStockDetails() {
      const data = await fetchStockDetails(ticker);
      let openPrice = data.ticker.prevDay.c;
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
        <h1>${addCommas(Number(currentPrice).toFixed(2))}</h1>
        <p>
          +${portfolioGain} (+{portfolioPercent}%) {rangeText}
        </p>
      </div>
      <div className="line-chart">
        {stockChartData && <Line data={stockChartData} options={options} />}
      </div>
      <div className="timeline-container">
        <div className="timeline-buttons-container">
          <div
            className={`timeline-button ${dateRange === 7 ? "active" : ""}`}
            onClick={() => {
              setDateRange(7);
              toggleClass();
            }}
          >
            1W
          </div>
          <div
            className={`timeline-button ${dateRange === 30 ? "active" : ""}`}
            onClick={() => {
              setDateRange(30);
              toggleClass();
            }}
          >
            1M
          </div>
          <div
            name="3M"
            className={`timeline-button ${dateRange === 90 ? "active" : ""}`}
            // onClick={handleChange("3M")}
            onClick={() => {
              setDateRange(90);
              toggleClass();
            }}
          >
            3M
          </div>
          <div
            className={`timeline-button ${dateRange === 365 ? "active" : ""}`}
            onClick={() => {
              setDateRange(365);
              toggleClass();
            }}
          >
            1Y
          </div>
          <div
            className={`timeline-button ${
              dateRange === 365 * 5 ? "active" : ""
            }`}
            onClick={() => {
              setDateRange(365 * 5);
              toggleClass();
            }}
          >
            ALL
          </div>
        </div>
      </div>
      <div className="buying-power-container">
        <h2>Buying Power</h2>
        <h2>${addCommas(Number(portfolio?.balance).toFixed(2))}</h2>
      </div>
    </div>
  );
}

export default StockChart;
