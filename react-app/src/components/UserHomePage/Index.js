import React from "react";
import WatchlistWidget from "../WatchlistWidget";
import StockChart from "../StockChart";
import "./UserHomePage.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function UserHomePage() {

    const user = useSelector((state) => state.session?.user);
    const history = useHistory()

    if (!user) {

    }

    return (
        <div className="app-body">
            <div className="app-container">
                <StockChart />
                <WatchlistWidget />
            </div>
        </div>
    )
}

export default UserHomePage;
