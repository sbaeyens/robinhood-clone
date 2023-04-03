import React from "react";
import "./WatchlistWidget.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { thunkGetAllWatchlistsUserId } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import CreateListModal from "../CreateListModal";
import { NavLink } from "react-router-dom";

//
import OptionsModalButton from "./WatchlistModals/OptionsModalButton";
// import WatchlistModalButton from "./WatchlistModals/WatchlistModal";
import RenameWatchlistModal from "./WatchlistModals/RenameWatchlistModal";
import DeleteWatchlistModal from "./WatchlistModals/DeleteWatchlistModal";

function SingleWatchlist({list}) {
  const dropdownRef = useRef();
  let [showMenu, setShowMenu] = useState(false);
  let [showStocks, setShowStocks] = useState(false);
  let [rotate, setRotate] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
//   const watchlists = useSelector((state) => state.watchlists);
//   const investments = useSelector((state) => state.investments);

  const [investmentsData, setInvestmentsData] = useState([]);

  // USE STATE
  const [openDropdown, setOpenDropdown] = useState(null);

//   // USE EFFECTS
//   useEffect(() => {
//     if (user) {
//       dispatch(thunkGetAllWatchlistsUserId(user.id));
//     }
//   }, [dispatch, user]);

//   let tempStockList = ["AAPL", "GOOG", "AMZN"];

//   let investmentsArray = [];
//   useEffect(() => {
//     console.log("INSIDE USE EFFECT");
//     console.log("investment value", investments);
//     if (investments) {
//       investmentsArray = Object.values(investments);
//       console.log("investmentsArray", investmentsArray);
//       setInvestmentsData(investmentsArray);
//     }
//   }, [investments]);

  useEffect(() => {
    if (!showMenu) return;

    // const closeMenu = (e) => {
    //   if (!dropdownRef.current.contains(e.target)) {
    //     setShowMenu(false);
    //   }
    // };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // *FIRST RENDER
  if (!user) return null; // If no user
//   if (!watchlists) return null;
//   let watchlistArray = [];
//   if (watchlists) {
//     watchlistArray = Object.values(watchlists);
//   }

  // Event Handlers ------------------------------------------------------------------------------------------------------------
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => setShowMenu(false);

  const onClickWatch = () => {
    setShowStocks(!showStocks);
    setRotate(!rotate);
  };

  // Modal Icons ------------------------------------------------------------------------------------------------------------
  const editIcon = <i className="fas fa-cog watchlist-drop-icon" />;
  const deleteIcon = <i className="far fa-times-circle watchlist-drop-icon" />;

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

    console.log("list from listArr", list)

  return (
    <div key={list.name}>
      <div className="watchlist-row">
        <div className="watchlist-name">{list.name}</div>
        <div className="watchlist-buttons-container">
          <div className="watchlist-option-div">
            <div className="watchlist-button-div">
              <i
                className="fas fa-ellipsis-h watchlist-button"
                onClick={openMenu}
              />
            </div>
            <div
              ref={dropdownRef}
              className={
                showMenu
                  ? `watchlist-drop-options`
                  : `watchlist-drop-options hidden`
              }
            >
              <div className="watchlist-drop-div bold">
                <OpenModalButton
                  buttonText="Edit"
                  onItemClick={closeMenu}
                  modalComponent={<RenameWatchlistModal list={list} />}
                  modalClass="watchlist-modal-btn bold"
                  modalIcon={editIcon}
                />
              </div>
              <div className="watchlist-drop-div bold">
                <OpenModalButton
                  buttonText="Delete"
                  onItemClick={closeMenu}
                  modalComponent={<DeleteWatchlistModal list={list} />}
                  modalClass="watchlist-modal-btn bold"
                  modalIcon={deleteIcon}
                />
              </div>
            </div>
          </div>
          <div className="watchlist-button-div" onClick={onClickWatch}>
            <i
              className={
                !rotate
                  ? "fas fa-chevron-up watchlist-button"
                  : "fas fa-solid fa-chevron-down"
              }
            />
          </div>
        </div>
      </div>

      {showStocks
        ? list.stocks.map((stock) => {
            return (
              <div className="watchlist-row" key={stock.ticker}>
                <div>{stock.ticker}</div>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default SingleWatchlist;
