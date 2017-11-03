import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){
    return (
        <nav className="navbar sticky-top navbar-toggleable-md navbar-inverse" style={{'backgroundColor': '#3bafda'}}>
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <Link to="/" className="navbar-brand">Habit Tracker</Link>
        <div  className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            </li>
          </ul>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link active">Dashboard<span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link to="/summary" className="nav-link">Summary</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
}

export default Navbar;