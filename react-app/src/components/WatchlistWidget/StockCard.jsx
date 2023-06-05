import React from 'react'
import "./WatchlistWidget.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { thunkGetAllWatchlistsUserId } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import CreateListModal from "../CreateListModal";
import { NavLink } from "react-router-dom";
import { fetchStockDetails } from "../../Utils";

function StockCard({ inv }) {
    const [price, setPrice] = useState(0)
    const [change, setChange] = useState(0)

    useEffect(() => {
      if (!inv) {
        return;
      }

        async function runFetchStockDetails() {
          const data = await fetchStockDetails(inv.stock_id);
          let openPrice = data.ticker.prevDay.c;

          let change = data.ticker.todaysChange;
          let currentPrice = openPrice + change;

          console.log("prices from useEffect", openPrice, change, currentPrice);
          console.log("data from useEffect", data);
          inv.currentPrice = currentPrice;
            inv.change = change;

            setPrice(currentPrice)
            setChange(change)

          console.log("inv2", inv);
          // setCurrentPrice(currentPrice);
          // setStockName(data.ticker.ticker);
        }
        // console.log("investmentsArray", investmentsArray);
        // setInvestmentsData([...investmentsArray]);
        runFetchStockDetails();
    }, [inv]);

  return (
    <div>
      <NavLink
        key={inv.stock_id}
        to={`/stocks/${inv.stock_id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="inv-card">
          <div className="inv-tick-share">
            <div className="stock-ticker bold">{inv.stock_id}</div>
            <div>{inv.quantity} Share(s)</div>
          </div>
          <div className="inv-chart-pic"></div>
          <div className="inv-price-change">
            <div>${Number(price).toFixed(2)}</div>
                      <div>{ change>0?"+" : ""}{Number(change).toFixed(2)}%</div>
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default StockCard
