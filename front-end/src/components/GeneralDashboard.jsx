import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GeneralDashboard extends Component {

  state = {

  }

  componentDidMount() {

  }


  render() {
    return (
      <div id="dashboard">
        <h1>GeneralDashboard</h1>
        {this.props.children}
      </div>
    );
  }
}

GeneralDashboard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GeneralDashboard;
