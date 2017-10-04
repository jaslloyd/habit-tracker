import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
    return (
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <Link to="/" className="navbar-brand">Habit Tracker</Link>
        <div  className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            <Link to="/" className="nav-link">Dashboard<span className="sr-only">(current)</span></Link>
            </li>
          </ul>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
}

export default Navbar;