import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
        <div id="login">
          <form className="card-box" style={{width: '500px'}}>
          <h1 className="text-center">Login</h1>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" placeholder="Enter Username" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
    );
  }
}

export default Login;
