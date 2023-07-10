import React, {useState, useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";
import {useHistory} from "react-router-dom";

function ProfileButton({user}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-wrap">
      <div className="create-spot-nav">
        {user && <Link to="/spots/new">Create a New Spot</Link>}
      </div>
      <button className="p-s" onClick={openMenu}>
        <i id="lines " className="fa-solid fa-bars"></i>
        <i id="u-icon" className="fa-solid fa-user"></i>
      </button>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="ul-div">
            <li className="hello">
              Hello, {user.firstName}
              <div className="yo-email"> {user.email}</div>
            </li>

            <li className="hello">
              <Link to="/spots/current">Manage Spots</Link>
            </li>
            <li className="bye">
              <button onClick={logout}>Log Out</button>
            </li>
          </div>
        ) : (
          <div className="ul-div">
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
