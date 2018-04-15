import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import authHelper from '../Auth';

const Navbar = ({openSideBar, sideBarState}) => (
  <Fragment>
    <button className="custom-button" onClick={() => openSideBar(!sideBarState)}>
        <i className="fas fa-caret-left"></i>
    </button>
    <nav className="navbar navbar-expand-lg navbar-bg-color navbar-lg navbar-dark">
      <Link to="/" className="navbar-brand">Habit Tracker</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="ml-auto navbar-nav">
          <li className="nav-item">
            {authHelper.isAuthenticated() && <Link to="/login" className="nav-link">Login</Link> }
          </li>
        </ul>
      </div>
    </nav>
  </Fragment>
);

export default Navbar;
