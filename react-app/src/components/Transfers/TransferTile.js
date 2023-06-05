import React from "react";
import "./Transfers.css";
// import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getTransactionsByTicker } from "../../store/transactions";
import { addCommas } from "../../Utils";
import { compareAsc, differenceInCalendarDays, format } from "date-fns";


function TransferTile({ transfer }) {
  const dispatch = useDispatch();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="transfer-tile">
      <div className="tt-left">
        <span className="tt-summary">
          {capitalizeFirstLetter(transfer.transfer_type)}{" "}
          {transfer.transfer_type === "deposit" ? "to" : "from"} brokerage
          account from bank
        </span>
        <span className="tt-date">
          {format(new Date(transfer.date), "MMMM dd")}
        </span>
      </div>
      <div className="tt-right">
        <span
          className={
            transfer.transfer_type === "deposit"
              ? "tt-amount-green"
              : "tt-amount-red"
          }
        >
          {transfer.transfer_type === "deposit" ? "+" : "-"}$
          {addCommas(Number(transfer.amount).toFixed(2))}
        </span>
      </div>
    </div>
  );
}

export default TransferTile;
