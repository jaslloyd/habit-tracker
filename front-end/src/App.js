import React, { Fragment, Component } from 'react';
import Sidebar from 'react-sidebar';
import Navbar from './components/Navbar';
import Main from './components/Main';
import './App.css';

const App = () => (
  <Fragment>
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 br-1">
          <h1>Blah</h1>
        </div>
        <div className="col-9">
          <Navbar />
          <Main />
        </div>
      </div>
    </div>
  </Fragment>
);

class App2 extends Component {

  state = {
    sidebarOpen: true,
    styles: {
      sidebar: {
        backgroundColor: '#112f3b',
        width: '225px'
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
    <div className="mt-2">
      <img src="http://via.placeholder.com/100x100" alt="" class="img-thumbnail mr-2 ml-2" /  >
      <ul class="nav flex-column mt-4">
          <li class="nav-item">
            <a class="nav-link active" href="#">Dashboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Challenges</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Summary</a>
          </li>
      </ul>
    </div>
    return (
      <Sidebar sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               docked="true"
               onSetOpen={this.onSetSidebarOpen}
               shadow="true"
               styles={this.state.styles}>
         <div className="col-12">
          <Main />
         </div>
      </Sidebar>
    )
  }
}
export default App2;
