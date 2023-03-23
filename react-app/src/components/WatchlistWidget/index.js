import React from "react";
import "./WatchlistWidget.css";

function WatchlistWidget() {

  let tempStockList = ["AAPL", "GOOG", "AMZN"]

  return (
    <div className="watchlists">
      <div className="watchlist-container">
        <div className="watchlist-header">
          <p>Stocks</p>
        </div>
        <div className="watchlist-content">
          <div className="watchlist-row">
            {tempStockList.map((stock) => (
              <div className="stock">
                <p>{stock}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="watchlist-header">
          <p>Lists</p>
        </div>
        <div className="watchlist-content">
          <div className="watchlist-row">

          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchlistWidget;
