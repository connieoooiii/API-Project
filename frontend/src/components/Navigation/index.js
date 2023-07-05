import React from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({isLoaded}) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar">
      <li className="list">
        <div className="cloud-nav">
          <NavLink exact to="/">
            <i className="fa-solid fa-cloud"></i>
          </NavLink>
        </div>
      </li>
      {isLoaded && (
        <li className="profile-button">
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </div>
  );
}

export default Navigation;
