import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import authHelper from '../../services/auth-helper';
import FormGroup from '../../components/FormGroup';
import './login.css';
import '../formComponents.css';

interface LoginProps {
  location: {
    state: {
      from: {
        pathname: string;
      }
    };
  }
}

interface LoginState {
  redirectToReferrer: boolean;
  msg: string;
  msgClass: string;
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      msg: '',
      msgClass: ''
    }
  }

  // Adding the regular : React.ChangeEvent<HTMLInputElement> type to this wont work as it cannot recognize username and password. 
  onSubmit = async (e: any) => {
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

    const result = await (await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, resultsObj)).json();
    console.log(result);
    if (result.token) {
      console.log(result.token);
      authHelper.authenticate(result.token).then(() => this.setState({ redirectToReferrer: true }));
    } else {
      this.setState({ msg: 'Login Failed: Please check your credentials', msgClass: 'alert-danger' });
    }
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div className="login__container">
        <h1 className="text-center mb-3">Habit Tracker</h1>
        <div className="login__container__item">
          <form className="card__box" onSubmit={this.onSubmit}>
            <h1>Login</h1>
            {this.state.msg && <div className={`alert ${this.state.msgClass}`}>{this.state.msg}</div>}
            <div className="login__oauth__container">
              <a href={`${process.env.REACT_APP_API_ENDPOINT}/auth/google`} className="btn btn__social btn__gmail">
                Sign in with Gmail
              </a>
              <a href={`${process.env.REACT_APP_API_ENDPOINT}/auth/github`} className="btn btn__social btn__github">
                Sign in with GitHub
              </a>
              <hr />
            </div>
            <FormGroup>
              <label htmlFor="username">Username</label>
              <input type="text" className="form__control" id="username" placeholder="Enter Username" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="password">Password</label>
              <input type="password" className="form__control" id="password" placeholder="Password" />
            </FormGroup>
            <div className="login__btns__container">
              <Link to="/demo" className="demo__link">
                Demo Mode
              </Link>
              <button type="submit" className="btn btn__submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
