import React from "react";
import "./BuySellWidget.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";



function BuySellWidget({stockData}) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState("buy");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  console.log("stockData", stockData);

  const onClickTypeHandler = () => {
    type === "buy" ? setType("sell") : setType("buy");
  };




  return (
    <div className="buy-sell-widget">
      <div className="buy-sell-widget-container">
              <div>
                  {type === "buy" && (
                      <div
                          onClick={onClickTypeHandler}
                          className={
                              type === "buy" ? "transaction-btn selected" : "transaction-btn"
                          }
                      >
                          Buy
                      </div>)}
                  {type == "sell" && (
                      <div
                          onClick={onClickTypeHandler}
                          className={
                              type === "sell" ? "transaction-btn selected" : "transaction-btn"
                          }
                      >
                          Sell
                      </div>)}

        </div>
        <div className="order-type">
          <p> Order Type</p>
          <p> Buy Market Order</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="share-quantity">
            <p>Shares</p>

            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="estimated-cost">
            <p>Estimated Cost</p>
            <p>${quantity * 45}</p>
          </div>
          <div className="button-container">
            <button type="submit" className="purchase-button">
              Purchase Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BuySellWidget;
