import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);
  const {isLoggedIn, currentUser} = currentUserState;

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Medium
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" exact>
              Home
            </NavLink>
          </li>
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink to="/articles/new" className="nav-link">
                  <i className="ion-compose"></i>
                  &nbsp;New Article
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/settings" className="nav-link">
                  <i className="ion-gear-a"></i>
                  &nbsp;Setting
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={`/profiles/${currentUser.username}`} className="nav-link">
                  <img className="user-pic" src={currentUser.image} alt=""/>
                  &nbsp;{currentUser.username}
                </NavLink>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Sing in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Sing up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
