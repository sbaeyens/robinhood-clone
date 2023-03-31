import React from "react";
import "./BuySellWidget.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addTransaction } from "../../store/transactions";
import { getTransactionsByTicker } from "../../store/transactions";
import { getUserPortfolio, updatePortfolio } from "../../store/portfolio";
import { fetchStockInvestment } from "../../store/investments";



function BuySellWidget({ ticker, stockData, currentPrice, portfolio}) {
  const dispatch = useDispatch();
  const investments = useSelector((state) => state.investments);

  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState("Buy");
  const [price, setPrice] = useState(currentPrice)
  const [totalPrice, setTotalPrice] = useState(currentPrice*quantity)
  const [currentShares, setCurrentShares] = useState(0)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setTotalPrice(currentPrice*quantity)
  }, [quantity, currentPrice])

  useEffect(() => {
    dispatch(fetchStockInvestment(ticker));
  }, [dispatch, ticker])

  // console.log("investments", investments)
  if (investments.ticker !== undefined) {
    let shareQuantity = investments.ticker.quantity;
    console.log("shareQuantity", shareQuantity)
    setCurrentShares(shareQuantity);
  }

  useEffect(() => {
    if (Object.values(investments).length) {
      setCurrentShares(investments[ticker].quantity);
    }
  },[investments])

  const handleSubmit = async (e) => {

    let errorObj = {};

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
    if (type === "Buy" && currentShares === 0 && Object.value(errors).length === 0) {

    }

      //if shares, PUT to investments:
    if (type === "Buy" && currentShares > 0) {

    }

      //SELLING:
      //if shares && order is less than total, PUT to investments:

      //if shares && order === total, DELETE from investments:

    dispatch(getTransactionsByTicker(ticker));
    dispatch(updatePortfolio(newTransaction))
      // dispatch(getUserPortfolio());

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
          <div>{currentShares} share(s) available</div>
        </form>
      </div>
    </div>
  );
}

export default BuySellWidget;
