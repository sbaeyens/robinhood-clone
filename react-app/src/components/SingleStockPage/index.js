import React from "react";
// import WatchlistWidget from "../WatchlistWidget";
import StockChart from "../StockChart";
import "./SingleStockPage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchStockChartData } from "../../Utils";
import BuySellWidget from "./BuySellWidget"
import { fetchStockDetails } from "../../Utils";
import Transactions from "./Transactions";
import { getUserPortfolio } from "../../store/portfolio";

// const API_KEY = process.env.REACT_APP_POLYGON_API_KEY;
// const BASE_URL = "https://api.polygon.io/v2/";

function SingleStockPage() {
  const dispatch = useDispatch()
  const portfolio = useSelector((state) => state.portfolio);
  const [stockData, setStockData] = useState({});
  const [currentPrice, setCurrentPrice] = useState(0);
  const [stockName, setStockName] = useState("");

  console.log("FIRING FROM SINGLE STOCK PAGE")
    let { ticker } = useParams();

      useEffect(() => {
        async function runFetchStockDetails() {
          const data = await fetchStockDetails(ticker.toUpperCase());
          let openPrice = data.ticker.day.o;
          let change = data.ticker.todaysChange;
          let currentPrice = openPrice + change;

          setCurrentPrice(currentPrice);
          setStockData(data);
        }
        runFetchStockDetails();
      }, [ticker]);

    useEffect(() => {
      if (!ticker) {
        return;
      }
      async function runFetchStockDetails() {
        const data = await fetchStockDetails(ticker);
        let openPrice = data.ticker.day.o;
        let change = data.ticker.todaysChange;
        let currentPrice = openPrice + change;

        setCurrentPrice(currentPrice);
        setStockName(data.ticker.ticker);
      }
      runFetchStockDetails();
    }, [ticker]);

    useEffect(() => {
      dispatch(getUserPortfolio());
    }, [dispatch]);


  return (
    <div className="app-body-single">
      <div className="app-container-single">
        <div className="app-left">
          <StockChart ticker={ticker} />
          <Transactions ticker={ticker} />
        </div>
        <div className="app-right">
          <BuySellWidget ticker={ticker} stockData={stockData} currentPrice={currentPrice} portfolio={portfolio} />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default SingleStockPage;
