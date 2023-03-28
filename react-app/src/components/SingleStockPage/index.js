import React from "react";
import WatchlistWidget from "../WatchlistWidget";
import StockChart from "../StockChart";
import "./SingleStockPage.css";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockChartData } from "../../Utils";

const API_KEY = process.env.REACT_APP_POLYGON_API_KEY;
const BASE_URL = "https://api.polygon.io/v2/";

function SingleStockPage() {

    let { ticker } = useParams();

    const [stockData, setStockData] = useState([]);

    let singleDayData = fetchStockChartData(ticker, 2)
    console.log(singleDayData)

      const getStockData = async (ticker) => {
        let response = await fetch(
          `${BASE_URL}aggs/ticker/${ticker}/range/1/day/2023-01-09/2023-01-09?apiKey=${API_KEY}`
        );
        let data = await response.json();
        console.log("inside the async function", data);
        setStockData(data.results);
        return data;
      };

      useEffect(() => {
        getStockData("AAPL");
      }, []);

  return (
    <div className="app-body">
      <div className="app-container">
        <StockChart />
        <WatchlistWidget />
      </div>
    </div>
  );
}

export default SingleStockPage;
