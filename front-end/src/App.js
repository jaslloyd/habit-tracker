import React, { Fragment } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import './App.css';

const App = () => (
  <Fragment>
    <Navbar />
    <div className="container-fluid">
      <Main />
    </div>
  </Fragment>
);
export default App;
