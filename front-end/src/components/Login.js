import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import authHelper from './Auth';

class Login extends Component {
  state = {
    user: {
      email: '',
      name: '',
      password: '',
      redirectToReferrer: false,
    },
    userObj: {},
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = e.target;

    this.setState({ userObj: {
      username: username.value,
      password: password.value,
    } });

    const resultsObj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.userObj),
    };

    const result = await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/Users/login`, resultsObj)).json();
    result.id && authHelper.authenticate(() => {
      localStorage.setItem('knownComputer', true);
      this.setState({ redirectToReferrer: true });
    });
  }

  render() {
    console.log(process.env.REACT_APP_API_ENPOINT);
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }
    return (
      <div id="login">
        <form className="card-box" style={{ width: '500px' }} onSubmit={this.onSubmit}>
          <h1 className="text-center">Login</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Enter Username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
