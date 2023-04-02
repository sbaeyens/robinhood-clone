import React from "react";
import "./BuySellWidget.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addTransaction } from "../../store/transactions";
import { getTransactionsByTicker } from "../../store/transactions";
import { updatePortfolio } from "../../store/portfolio";
import { addInvestment, fetchStockInvestment, editInvestment, deleteInvestment } from "../../store/investments";
import { addCommas } from "../../Utils";



function BuySellWidget({ ticker, stockData, currentPrice, portfolio}) {
  const dispatch = useDispatch();
  const investments = useSelector((state) => state.investments);

  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState("Buy");
  // const [price, setPrice] = useState(currentPrice);
  const [totalPrice, setTotalPrice] = useState(currentPrice * quantity);
  const [currentShares, setCurrentShares] = useState(0);
  const [confirm, setConfirm] = useState(false)
  const [disbleInput, setDisableInput] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setTotalPrice(currentPrice * quantity);
  }, [quantity, currentPrice]);

  useEffect(() => {
    dispatch(fetchStockInvestment(ticker));
  }, [dispatch, ticker]);

  // console.log("investments", investments)
  if (investments.ticker !== undefined) {
    let shareQuantity = investments.ticker.quantity;
    console.log("shareQuantity", shareQuantity);
    setCurrentShares(shareQuantity);
  }

  useEffect(() => {
    if (!investments) {
      return
    }
    if (Object.values(investments).length) {
      setCurrentShares(investments[ticker].quantity);
    }
  }, [investments, ticker]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorObj = {};

    let newTransaction = {
      quantity: Number(quantity),
      price_at_time: Number(currentPrice),
      total_expense: Number(totalPrice),
      transaction_type: type,
    };

    await dispatch(addTransaction(ticker, newTransaction));

    //logic for posting, editing, or deleting from INVESTMENTS goes here:

    //BUYING:
    //if 0 shares, POST to investments:
    if (
      type === "Buy" &&
      currentShares === 0 &&
      Object.values(errors).length === 0
    ) {
      await dispatch(addInvestment(ticker, newTransaction))
    }

    //if shares && order === total, DELETE from investments:
    else if (type === "Sell" && Number(currentShares) === Number(quantity)) {
      console.log("firing delete thunk")
      await dispatch(deleteInvestment(ticker))
      setCurrentShares(0);
    }

    //if shares, PUT to investments:
    else if (currentShares > 0) {
      await dispatch(editInvestment(ticker, newTransaction))
    }



    await dispatch(getTransactionsByTicker(ticker));
    await dispatch(updatePortfolio(newTransaction));
    // dispatch(getUserPortfolio());

    setConfirm(false);
    setQuantity(0)

  };

  // const onClickTypeHandler = () => {
  //   type === "Buy" ? setType("Sell") : setType("Buy");
  // };


  /////// HANDLERS
  const onClickReviewHandler = () => {
    let errorObj = {};

    if (quantity <= 0) {
      errorObj.type = "Not Enough Shares";
      errorObj.message = "Enter at least 0.000001 shares.";
    }
    if (
      investments &&
      type === "Sell" &&
      quantity > investments[ticker].quantity
    ) {
      errorObj.type = "Not Enough Shares";
      errorObj.message = `You can sell at most ${investments[ticker].quantity} share(s) of ${ticker}`;
    }
    if (type === "Buy" && quantity > portfolio.balance) {
      errorObj.type = "Not Enough Buying Power";
      errorObj.message =
        "You don't have enough buying power in your brokerage account to place this order.";
    }

    if (Object.values(errorObj).length) {
      setErrors(errorObj);
    } else {
      setConfirm(true);
    }
    setDisableInput(true);
  };

  const onClickEditHandler = () => {
    setConfirm(false);
    setDisableInput(false);
  };

  const onClickDismissHandler = () => {
    setDisableInput(false);
    setErrors({});
  };

  const onClickTypeHandler = () => {
    if (!confirm && !Object.values(errors).length) {
      type === "Buy" ? setType("Sell") : setType("Buy");
    } else if (confirm || Object.values(errors).length) {
      return;
    }
  };

  /////// Buttons

  //Sell form button (hidden if you do not own stock) ------------------------------------------------------
  let sellFormButton;
  if (currentShares > 0) {
    sellFormButton = (
      <div
        onClick={onClickTypeHandler}
        className={
          type === "sell" ? "transaction-btn selected" : "transaction-btn"
        }
      >
        Sell {ticker}
      </div>
    );
  }

  // Buy/Sell confirm button -------------------------------------------------------------------------------
  let confirmBtn;
  if (!confirm && !Object.values(errors).length) {
    confirmBtn = (
      <div className="review-button-div">
        {
          <button
            className="review-button bold"
            type="button"
            onClick={onClickReviewHandler}
          >
            Review Order
          </button>
        }
      </div>
    );
  }
  if (Object.values(errors).length) {
    confirmBtn = (
      <div>
        <div>
          <div className="error-message-div bold">
            <span className="info-icon error-icon bold">!</span>
            {errors.type}
          </div>
          <div className="error-message-div">{errors.message}</div>
        </div>
        <div className="review-button-div">
          {
            <button
              className="review-button bold"
              type="button"
              onClick={onClickDismissHandler}
            >
              Dismiss
            </button>
          }
        </div>
      </div>
    );
  }
  if (confirm) {
    confirmBtn = (
      <div>
        <div>
          Order Summary
          <span className="info-icon bold">?</span>
        </div>
        <div className="review-text">
          {`You are placing a good for day market order to ${type} ${quantity} share(s) of ${ticker}.`}
        </div>
        <div className="review-button-div">
          {
            <button className="review-button">
              {type === "Buy" ? "Buy" : "Sell"}
            </button>
          }
        </div>
        <div className="review-button-div">
          <button
            className="review-button edit-button"
            onClick={onClickEditHandler}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

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
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="current-price">
            <p>Market Price</p>
            <p>${addCommas(Number(currentPrice).toFixed(2))}</p>
          </div>
          <div className="estimated-cost">
            <p>Estimated Cost</p>
            <p>${addCommas(Number(totalPrice).toFixed(2))}</p>
          </div>
          <div>{confirmBtn}</div>
          <div>
            {type === "Buy"
              ? `$${addCommas(
                  Number(portfolio?.balance).toFixed(2)
                )} buying power available`
              : `${investments ? currentShares : 0} Share(s) available`}
          </div>
        </form>
      </div>
    </div>
  );
}

export default BuySellWidget;
