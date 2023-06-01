import React, { useState } from "react";
import "./Transfers.css";
import DropdownSelect from "./DropdownSelect";

function Transfers() {
const [transferType, setTransferType] = useState("Deposit")
const [amount, setAmount] = useState("10000");
const [btnState, setBtnState] = useState(true);

    const dropdownHandler = () => {
        setBtnState(!btnState)
        console.log("btnState", btnState)
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
                <span>{transferType}</span>
                <div>
                  <i className="fas fa-caret-down" />
                </div>
              </div>
            </div>
            <div className="dd-box">
              {!btnState && (
                <div className="dropdown-container">
                                <DropdownSelect transferType={transferType} />
                </div>
              )}
            </div>
            <div className="review-btn-holder">
              <button className="review-button bold">Complete Transfer</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Transfers;
