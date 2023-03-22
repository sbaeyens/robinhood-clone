import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from "./HOOD.svg"

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
    <div className="nav-wrapper">
      <div className="nav-logo">
        <NavLink exact to="/">
          <img src={logo} width={25} alt="logo" />
        </NavLink>
      </div>
      <div className="nav-search">
          <input
            className="nav-search-bar"
            type="search"
            placeholder="Search"
          />
      </div>
      <div className="nav-links-container">
        <div className="nav-link">My Portfolio</div>
        <div className="nav-link">Purchase History</div>
        <div className="nav-link">My Lists</div>
        {isLoaded && (
          <div>
            <ProfileButton user={sessionUser} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
