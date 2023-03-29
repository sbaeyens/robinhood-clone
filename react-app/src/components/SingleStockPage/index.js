import React from "react";
import WatchlistWidget from "../WatchlistWidget";
import StockChart from "../StockChart";
import "./SingleStockPage.css";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStockChartData } from "../../Utils";
import BuySellWidget from "./BuySellWidget"
import { fetchStockDetails } from "../../Utils";

const API_KEY = process.env.REACT_APP_POLYGON_API_KEY;
const BASE_URL = "https://api.polygon.io/v2/";

function SingleStockPage() {
    const [stockData, setStockData] = useState({});


    let { ticker } = useParams();

      useEffect(() => {
        async function runFetchStockDetails() {
          const data = await fetchStockDetails(ticker.toUpperCase());
          console.log("Stockdetails from useEffect", data);

          setStockData(data);
        }
        runFetchStockDetails();
      }, [ticker]);


  return (
    <div className="app-body">
      <div className="app-container">
        <StockChart />
            <BuySellWidget stockData={stockData} />
      </div>
    </div>
  );
}

export default SingleStockPage;
