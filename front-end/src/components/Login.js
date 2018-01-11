import React, { Component } from 'react';
import authHelper from './Auth';
import { Redirect } from 'react-router-dom';

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

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target;

    this.setState({ userObj: {
      username: username.value,
      password: password.value,
    } });

    this.login()
      .then(results => results.id && authHelper.authenticate(() => {
        localStorage.setItem('knownComputer', true);
        this.setState({ redirectToReferrer: true });
      })); // This is the user id that we can use for requests
  }

  login(userObj) {
    return fetch(`${process.env.REACT_APP_API_ENPOINT}/api/Users/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.userObj),
    })
      .then(response => response.json())
      .catch(e => console.log(e));
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
