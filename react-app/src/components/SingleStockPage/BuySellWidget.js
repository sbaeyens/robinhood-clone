import React from "react";
import "./BuySellWidget.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addTransaction } from "../../store/transactions";



function BuySellWidget({ticker, stockData}) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);
  const [type, setType] = useState("Buy");
  const [price, setPrice] = useState(0)

  const handleSubmit = async (e) => {

    let newTransaction = {
      quantity: Number(quantity),
      price_at_time: Number(33),
      total_expense: Number(66),
      transaction_type: type
    }

    dispatch(addTransaction(ticker, newTransaction));
    e.preventDefault();

  };

  const onClickTypeHandler = () => {
    type === "Buy" ? setType("Sell") : setType("Buy");

  };




  return (
    <div className="buy-sell-widget">
      <div className="buy-sell-widget-container">
              <div>
                  {type === "Buy" && (
                      <div
                          onClick={onClickTypeHandler}
                          className={
                              type === "Buy" ? "transaction-btn selected" : "transaction-btn"
                          }
                      >
                          Buy
                      </div>)}
                  {type == "Sell" && (
                      <div
                          onClick={onClickTypeHandler}
                          className={
                              type === "Sell" ? "transaction-btn selected" : "transaction-btn"
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
            <p>${quantity * price}</p>
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
