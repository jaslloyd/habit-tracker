import React from 'react';

function Navbar(){
    return (
        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="">Habit Tracker</a>
      
        <div  className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">Link</a>
            </li>
          </ul>

        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="{{ url('/login') }}">Login</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="{{ url('/register') }}">Register</a>
          </li>
        </ul>
        </div>
      </nav>
    );
}

export default Navbar;