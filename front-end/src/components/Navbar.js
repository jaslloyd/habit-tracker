import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import authHelper from '../Auth';

const Navbar = ({openSideBar, sideBarState, handleLogout}) => (
  <Fragment>
    {
      authHelper.isAuthenticated() && 
      <Fragment>
        <button className="custom-button" onClick={() => openSideBar(!sideBarState)}>
        {
          sideBarState.toString() === "true" 
          ?
          //<i>Close</i>
          <i className="fas fa-caret-left"></i>
          :
          // <i>Open</i> (i tags dont wory well...)
          <i className="fas fa-caret-right"></i>
        }
        </button>
      </Fragment>
    }
    <nav className="navbar navbar-expand-lg navbar-bg-color navbar-lg navbar-dark">
      <Link to="/" className="navbar-brand">Habit Tracker</Link>
      {
        authHelper.isAuthenticated() &&
        <Fragment>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="ml-auto navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="" onClick={() => handleLogout()}>Logout</a>
              </li>
            </ul>
          </div>
        </Fragment>
      }
    </nav>
  </Fragment>
);

export default Navbar;
