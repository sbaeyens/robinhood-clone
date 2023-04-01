import React from "react";
import "./WatchlistWidget.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState} from "react";
import { thunkGetAllWatchlistsUserId } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import CreateListModal from "../CreateListModal";


//
import OptionsModalButton from "./WatchlistModals/OptionsModalButton";
// import WatchlistModalButton from "./WatchlistModals/WatchlistModal";
import RenameWatchlistModal from "./WatchlistModals/RenameWatchlistModal";
import DeleteWatchlistModal from "./WatchlistModals/DeleteWatchlistModal";


function WatchlistWidget() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
  const watchlists = useSelector((state) => state.watchlists);

  // USE STATE
    const [openDropdown, setOpenDropdown] = useState(null);

  // USE EFFECTS
  useEffect(() => {
    if (user) {
      dispatch(thunkGetAllWatchlistsUserId(user.id));
    }
  }, [dispatch, user]);

  let tempStockList = ["AAPL", "GOOG", "AMZN"];

  // *FIRST RENDER
  if (!user) return null; // If no user
  if (!watchlists) return null;
  const watchlistArray = Object.values(watchlists);


    const handleDropdown = (e) => {
      // Edit menu dropdown toggle handler
      e.stopPropagation();
      // close any other dropdowns
      if (openDropdown && openDropdown !== e.target) {
        openDropdown.nextElementSibling?.classList.remove("showModal");
      }

      // toggle current dropdown
      e.target.nextElementSibling?.classList.toggle("showModal");

      // update openDropdown state
      setOpenDropdown(openDropdown === e.target ? null : e.target);
    };

    const stopPropagation = (e) => {
      e.stopPropagation();
    };

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
              modalComponent={<CreateListModal />}
            ></OpenModalButton>
          </div>
        </div>
        <div className="watchlist-content">
          {/* <div className="watchlist-row"> */}
          {watchlistArray.map((list) => (
            <div key={list.name}>
              <div className="watchlist-row">
                <div className="watchlist-name">{list.name}</div>
                <i className="as fa-user" onClick={(e) => handleDropdown(e)} />
                <div
                  className="watchlist-list-edit-dropdown"
                  onClick={(e) => stopPropagation(e)}
                >
                  <OptionsModalButton
                    modalComponent={
                      <RenameWatchlistModal list={list} />
                    }
                    buttonText={"Edit"}
                  />
                  <OptionsModalButton
                    modalComponent={
                      <DeleteWatchlistModal list={list} />
                    }
                    buttonText={"Delete"}
                  />
                </div>
                <div>V</div>
              </div>
              {list.stocks.map((stock) => {
                return (
                  <div className="watchlist-row" key={stock.ticker}>
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
