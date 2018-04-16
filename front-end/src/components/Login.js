import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import authHelper from '../Auth';
import FormGroup from './FormGroup';

class Login extends Component {
  state = {
    redirectToReferrer: false,
    userObj: {},
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = e.target;

    const resultsObj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    };

    const result = await (await fetch(`${process.env.REACT_APP_API_ENPOINT}/api/Users/login`, resultsObj)).json();
    if (result.id) {
      authHelper.authenticate(() => {
        localStorage.setItem('knownComputer', true);
        this.setState({ redirectToReferrer: true });
      });
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }
    return (
      <div id="login">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <form className="card-box" onSubmit={this.onSubmit}>
              <h1 className="text-center">Login</h1>
              <FormGroup>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter Username" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" />
              </FormGroup>
              <div className="row">
                <div className="col-md-3">
                  <Link to="/demo" className="demo-link">Demo Mode</Link>
                </div>
                <div className="col-md-3 ml-auto">
                  <button type="submit" className="ml-auto btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

export default Login;
