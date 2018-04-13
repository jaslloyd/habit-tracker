import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import Navbar from './components/Navbar';
import Main from './components/Main';
import authHelper from './Auth';
import './App.css';
import './BrightTheme.css';

class App extends Component {

  state = {
    sidebarOpen: true,
    styles: {
      sidebar: {
        backgroundColor: '#112f3b',
        width: '225px',
        boxShadow: '2px 0 10px 0 rgba(0, 0, 0, 0.12), 2px 0 15px 0 rgba(0, 0, 0, 0.09)'
        
      }
    }
  }

  onSetSidebarOpen = (open) => {
    this.setState({
      sidebarOpen: open
    })
  }

  render() {
    var sidebarContent =
    <div className="mt-4">
      <div className="text-center">
        <img src="http://via.placeholder.com/100x100" alt="" class="img-thumbnail" /  >
      </div>
      <ul class="nav flex-column mt-4">
          <li class="nav-item">
              {authHelper.isAuthenticated() && <Link to="/dashboard" className="nav-link active">Dashboard<span className="sr-only">(current)</span></Link>}
          </li>
          <li class="nav-item">
            {authHelper.isAuthenticated() && <Link to="/challenge" className="nav-link">Challenges</Link> }
          </li>
          <li class="nav-item">
            {authHelper.isAuthenticated() && <Link to="/summary" className="nav-link">Summary</Link> }
          </li>
      </ul>
    </div>

    return (
      <Sidebar sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               docked="true"
               onSetOpen={this.onSetSidebarOpen}
               styles={this.state.styles}>
        
         <Navbar />
         <div className="col-12">
          <Main />
         </div>
      </Sidebar>
    )
  }
}
export default App;
