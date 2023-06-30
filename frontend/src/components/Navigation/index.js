import React from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({isLoaded}) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <nav>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      <li>
        <NavLink exact to="/spots/new">
          Create a New Spot
        </NavLink>
      </li>
    </nav>
  );
}

export default Navigation;
