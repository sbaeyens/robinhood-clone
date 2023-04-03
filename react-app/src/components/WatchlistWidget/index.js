import React from "react";
import "./WatchlistWidget.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef} from "react";
import { thunkGetAllWatchlistsUserId } from "../../store/watchlists";
import OpenModalButton from "../OpenModalButton";
import CreateListModal from "../CreateListModal";
import {NavLink} from "react-router-dom"


//
import OptionsModalButton from "./WatchlistModals/OptionsModalButton";
// import WatchlistModalButton from "./WatchlistModals/WatchlistModal";
import RenameWatchlistModal from "./WatchlistModals/RenameWatchlistModal";
import DeleteWatchlistModal from "./WatchlistModals/DeleteWatchlistModal";
import SingleWatchlist from "./SingleWatchlist";


function WatchlistWidget() {
  const dropdownRef = useRef();
  let [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
  const watchlists = useSelector((state) => state.watchlists);
  const investments = useSelector((state) => state.investments);

  const [investmentsData, setInvestmentsData] = useState([]);

  // USE STATE
  const [openDropdown, setOpenDropdown] = useState(null);

  // USE EFFECTS
  useEffect(() => {
    if (user) {
      dispatch(thunkGetAllWatchlistsUserId(user.id));
    }
  }, [dispatch, user]);

  let tempStockList = ["AAPL", "GOOG", "AMZN"];

  let investmentsArray = [];
  useEffect(() => {
    console.log("INSIDE USE EFFECT");
    console.log("investment value", investments);
    if (investments) {
      investmentsArray = Object.values(investments);
      console.log("investmentsArray", investmentsArray);
      setInvestmentsData(investmentsArray);
    }
  }, [investments]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // *FIRST RENDER
  if (!user) return null; // If no user
  if (!watchlists) return null;
  let watchlistArray = [];
  if (watchlists) {
    watchlistArray = Object.values(watchlists);
  }


  // Event Handlers ------------------------------------------------------------------------------------------------------------
  const openMenu = () => {

    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => setShowMenu(false);

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

  return (
    <div className="watchlists">
      <div className="watchlist-container">
        <div className="watchlist-header">
          <p>Stocks</p>
        </div>
        <div className="inv-list">
          {investmentsData.map((inv) => (
            <NavLink
              key={inv.stock_id}
              to={`/stocks/${inv.stock_id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="inv-card">
                <div className="inv-tick-share">
                  <div className="stock-ticker bold">{inv.stock_id}</div>
                  <div>{inv.quantity} Share(s)</div>
                </div>
                <div className="inv-chart-pic"></div>
                <div className="inv-price-change">
                  <div>${Number(0).toFixed(2)}</div>
                  <div>+0.00%</div>
                </div>
              </div>
            </NavLink>
          ))}
          {/* <div className="watchlist-row">STCK</div>
          <div className="watchlist-row">MKTG</div> */}
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
          {watchlistArray.map((list) => (
            <SingleWatchlist list={list} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WatchlistWidget;
