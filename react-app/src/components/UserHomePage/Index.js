import React from "react";
import WatchlistWidget from "../WatchlistWidget";
import StockChart from "../StockChart";
import "./UserHomePage.css";

function UserHomePage() {

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
