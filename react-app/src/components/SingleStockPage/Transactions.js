import React from "react";
import "./Transactions.css";
// import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsByTicker } from "../../store/transactions";
import { addCommas } from "../../Utils";




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
            <p className="transaction-top-text">
              {transaction.transaction_type} - {transaction.stock_id}
            </p>
            <p className="transaction-bottom-text">{transaction.date}</p>
          </div>
          <div className="transaction-summary">
            <p className="transaction-top-text">
              ${addCommas(Number(transaction.total_expense).toFixed(2))}
            </p>
            <p className="transaction-bottom-text">
              {transaction.quantity} share(s) at $
              {addCommas(Number(transaction.price_at_time).toFixed(2))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Transactions;
