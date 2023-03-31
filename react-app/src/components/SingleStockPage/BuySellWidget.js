import React from "react";
import "./BuySellWidget.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addTransaction } from "../../store/transactions";



function BuySellWidget({ ticker, stockData, currentPrice, portfolio}) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState("Buy");
  const [price, setPrice] = useState(currentPrice)
  const [totalPrice, setTotalPrice] = useState(currentPrice*quantity)

  useEffect(() => {
    setTotalPrice(currentPrice*quantity)
  }, [quantity, currentPrice])

  const handleSubmit = async (e) => {

    let newTransaction = {
      quantity: Number(quantity),
      price_at_time: Number(currentPrice),
      total_expense: Number(totalPrice),
      transaction_type: type
    }

    dispatch(addTransaction(ticker, newTransaction));

    //logic for posting, editing, or deleting from INVESTMENTS goes here:

      //BUYING:
      //if 0 shares, POST to investments:

      //if shares, PUT to investments:

      //SELLING:
      //if shares && order is less than total, PUT to investments:

      //if shares && order === total, DELETE from investments:


    e.preventDefault();

  };

  const onClickTypeHandler = () => {
    type === "Buy" ? setType("Sell") : setType("Buy");

  };




  return (
    <div className="buy-sell-widget">
      <div className="buy-sell-widget-container">
        <div className="buy-sell-button-div">
          <div
            onClick={onClickTypeHandler}
            className={
              type === "Buy" ? "transaction-btn selected" : "transaction-btn"
            }
          >
            Buy
          </div>

          <div
            onClick={onClickTypeHandler}
            className={
              type === "Sell" ? "transaction-btn selected" : "transaction-btn"
            }
          >
            Sell
          </div>
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
          <div className="current-price">
            <p>Market Price</p>
            <p>${currentPrice}</p>
          </div>
          <div className="estimated-cost">
            <p>Estimated Cost</p>
            <p>${totalPrice}</p>
          </div>
          <div className="button-container">
            <button type="submit" className="purchase-button">
              Purchase Stock
            </button>
          </div>
          <div>${portfolio.balance } buying power available</div>
          <div>{} share(s) available</div>
        </form>
      </div>
    </div>
  );
}

export default BuySellWidget;
