import React from "react";
import WatchlistWidget from "../WatchlistWidget";
import StockChart from "../StockChart";
import "./UserHomePage.css";

function UserHomePage() {

    return (
      <div className="app-body">
        <div className="app-container">
          {/* <div className="home-left-body"> */}
            <StockChart />
          {/* </div> */}
            {/* <div className="home-right-panel"> */}
          <WatchlistWidget />
          {/* </div> */}
        </div>
      </div>
    );
}

export default UserHomePage;
