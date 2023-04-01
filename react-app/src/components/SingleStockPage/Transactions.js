import React from "react";

import "./Transactions.css";
// import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsByTicker } from "../../store/transactions";



function Transactions({ ticker }) {
    const dispatch = useDispatch()
    const transactions = useSelector (state => state.transactions)

    useEffect(() => {
        dispatch(getTransactionsByTicker(ticker));
    }, [dispatch, ticker]);


    let transactionsObj = transactions?.transactions


    if (!transactionsObj) return <div></div>


    let transactionsArray = Object.values(transactionsObj)



  return (
    <div className="transactions">
      {transactionsArray?.map((transaction) => (
        <div className="transaction-card" key={transaction.id}>
          <div>
            <p>{transaction.transaction_type.toUpperCase() } - {transaction.stock_id}</p>
            <p>{transaction.date}</p>
          </div>
          <div>
            <p>{transaction.total_expense}</p>
            <p>
              {transaction.quantity} at {transaction.price_at_time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Transactions;
