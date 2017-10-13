import React from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import './App.css';

const App = () => (
    <div>
      <Navbar />
      <div className="container-fluid">
        <Main />
      </div>
    </div>
)
export default App;
