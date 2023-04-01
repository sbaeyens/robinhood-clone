import React from "react";
import WatchlistWidget from "../WatchlistWidget";
// import StockChart from "../StockChart";
// import HomeChart from "./HomeChart";
import "./UserHomePage.css";
// import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchHistory, clearHistoryState } from "../../store/portfolioHistory";
import HomeChart from "./HomeChart";

function UserHomePage() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session?.user);
    // const history = useHistory()

    useEffect(() => {

      dispatch(fetchHistory());
      return () => {

        dispatch(clearHistoryState());
      };
    }, [dispatch]);

    if (!user) {

    }

    return (
        <div className="app-body">
            <div className="app-container">
                <HomeChart />
                <WatchlistWidget />
            </div>
        </div>
    )
}

export default UserHomePage;
