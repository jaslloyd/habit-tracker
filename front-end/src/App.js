import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Sidebar from 'react-sidebar';
import Navbar from './components/Navbar';
import Main from './components/Main';
import authHelper from './Auth';
import './App.css';
import './BrightTheme.css';

class App extends Component {
  state = {
    sidebarState: authHelper.isAuthenticated(),
    styles: {
      sidebar: {
        backgroundColor: '#112f3b',
        width: '225px',
        boxShadow: '2px 0 10px 0 rgba(0, 0, 0, 0.12), 2px 0 15px 0 rgba(0, 0, 0, 0.09)',
      },
    },
    isDarkTheme: false,
  };

  onSetSidebarState = state => {
    this.setState({
      sidebarState: state,
    });
  };

  onLogout = () => {
    console.log(this.props.history);
    authHelper.signout(() => {
      // this.props.history.push('/login')
    });
  };

  toggleTheme = () => {
    if (!this.state.isDarkTheme === true) {
      document.querySelector('body').classList.remove('bright-theme');
    } else {
      document.querySelector('body').classList.add('bright-theme');
    }
    this.setState({ isDarkTheme: !this.state.isDarkTheme });
  };

  render() {
    const sidebarContent = (
      <div className="mt-4">
        <div className="text-center">
          <img
            src="https://media.licdn.com/dms/image/C5103AQFG1GXNVSdI0w/profile-displayphoto-shrink_200_200/0?e=1533168000&v=beta&t=iPpcTlY_7v4X9xlCuvtujSjRF_6GRHr5lgO_tdDQ1rE"
            alt=""
            height="100"
            width="100"
            className="img-thumbnail"
          />
        </div>
        <ul className="nav flex-column mt-4">
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/dashboard">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/challenge">
              Challenges
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/summary">
              Summary
            </NavLink>
          </li>
        </ul>
      </div>
    );

    return (
      <Sidebar
        sidebar={sidebarContent}
        open={this.state.sidebarState}
        docked={this.state.sidebarState}
        onSetOpen={this.onSetSidebarState}
        styles={this.state.styles}
      >
        {authHelper.isAuthenticated() && (
          <Navbar
            openSideBar={this.onSetSidebarState}
            sideBarState={this.state.sidebarState}
            handleLogout={this.onLogout}
            toggle={this.toggleTheme}
          />
        )}
        <div className="col-12">
          <Main />
        </div>
      </Sidebar>
    );
  }
}
export default App;
