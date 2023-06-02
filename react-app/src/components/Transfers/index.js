import React, { useState, useEffect } from "react";
import "./Transfers.css";
import { useDispatch, useSelector } from "react-redux";
import DropdownSelect from "./DropdownSelect";
import { getUserPortfolio, updatePortfolio } from "../../store/portfolio";
import { addTransfer } from "../../store/transfers";


function Transfers() {
const dispatch = useDispatch();
const portfolio = useSelector((state) => state.portfolio);
const [type, setType] = useState("Deposit")
const [amount, setAmount] = useState("10000");
const [btnState, setBtnState] = useState(true);

    useEffect(() => {
      dispatch(getUserPortfolio());
    }, [dispatch]);

    const dropdownHandler = () => {
        setBtnState(!btnState)
        console.log("btnState", btnState)
    }

    const buttonHandler = () => {
        console.log("type", type)
    }

    const getData = (data) => {
        console.log("coming from dropdown", data)
        // console.log("transferType from getData BEFORE", transferType)
        setType(data)
        // console.log("transferType from getData AFTER", transferType);

    }

    const submitTransfer = () => {
        let transferDetails = {
            portfolioID: portfolio.id,
            transferType: type,
            amount,
            date: new Date()
        }
        console.log("transferDetails", transferDetails)

        dispatch(addTransfer(transferDetails))

        let updateBalanceDetails = {
            transaction_type: (type === "Deposit") ? "Sell" : "Buy",
            total_expense: Number(amount),
        }
        console.log("updateBalanceDetails", updateBalanceDetails)

        dispatch(updatePortfolio(updateBalanceDetails))
    }

    return (
      <div className="transfers-page">
        <div className="transfers-container">
          <div className="transfers-header">Transfer Money</div>
          <div className="transfer-options">
            <div className="t-option">
              <span>Amount</span>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="t-option">
              <span>Transfer Types</span>
              <div
                className={
                  btnState
                    ? "t-dropdown-selector"
                    : "t-dropdown-selector-clicked"
                }
                onClick={dropdownHandler}
              >
                <span>{type}</span>
                <div>
                  <i className="fas fa-caret-down" />
                </div>
              </div>
            </div>
            <div className="dd-box">
              {!btnState && (
                <div className="dropdown-container">
                                <DropdownSelect onSubmit={getData} />
                </div>
              )}
            </div>
            <div className="review-btn-holder">
              <button className="review-button bold" onClick={submitTransfer}>Complete Transfer</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Transfers;
