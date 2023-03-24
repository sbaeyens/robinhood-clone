import React from "react";
import "./WatchlistWidget.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { thunkGetAllWatchlistsUserId } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import CreateListModal from "../CreateListModal";


function WatchlistWidget() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const watchlists = useSelector((state) => state.watchlists);
  // console.log("watchlists", watchlists)

  useEffect(() => {
    dispatch(thunkGetAllWatchlistsUserId(user.id));
  }, [dispatch]);

  let tempStockList = ["AAPL", "GOOG", "AMZN"];

  // *FIRST RENDER
  if (!user) return null; // If no user
  if (!watchlists) return null;
  const watchlistArray = Object.values(watchlists);

  console.log("userid in watchlist widget", user.id);
  console.log("");

  return (
    <div className="watchlists">
      <div className="watchlist-container">
        <div className="watchlist-header">
          <p>Stocks</p>
        </div>
        <div className="watchlist-content">
          <div className="watchlist-row">STCK</div>
          <div className="watchlist-row">MKTG</div>
        </div>
        <div className="watchlist-header">
          <p>Lists</p>
          <div>
            <OpenModalButton
              buttonText={"+"}
              modalClass={"add-list-button"}
              modalComponent={
                <CreateListModal />
              }
            ></OpenModalButton>
          </div>
        </div>
        <div className="watchlist-content">
          {/* <div className="watchlist-row"> */}
          {watchlistArray.map((list) => (
            <div key={list.name}>
              <div className="watchlist-row">
                <div className="watchlist-name">{list.name}</div>
                <div>edit</div>
                <div>V</div>
              </div>
              {list.stocks.map((stock) => {
                return (
                  <div className="watchlist-row">
                    <div>{stock.ticker}</div>
                  </div>
                );
              })}
            </div>
          ))}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default WatchlistWidget;
