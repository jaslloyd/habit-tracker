import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './navbar.css';

const NavbarCustom: React.SFC<{handleLogout: Function, toggleTheme: Function }> = ({ handleLogout, toggleTheme }) => (
  <nav>
    <div className="nav__left">
      <Link to="/" className="nav__title">
        Habit Tracker
      </Link>
    </div>
    <ul className="nav__items">
      <li>
        <NavLink activeClassName="active" className="nav__link" to="/dashboard">
            Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" className="nav__link" to="/challenge">
            Challenges
        </NavLink>
      </li>
      <li>
        <a className="nav__link" href="" onClick={() => handleLogout()}>
          Logout
        </a>
      </li>
      <li>
        <button className="btn btn__theme" onClick={() => toggleTheme()}>
          <i className="fas fa-lightbulb" />
        </button>
      </li>
    </ul>
  </nav>
);

export default NavbarCustom;
