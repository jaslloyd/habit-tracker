// import React, { Component } from 'react';
import * as React from "react";
import Navbar from "./components/Navbar";
import Routes from "./router/Routes";
import authHelper from "./services/auth-helper";
import "./App.css";
import "./BrightTheme.css";

interface AppState {
  isDarkTheme: boolean;
}

interface AppProps {
  history: string[];
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isDarkTheme: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem("theme") === "dark") {
      this.toggleTheme();
    }
  }

  onLogout = (): void => {
    authHelper.signout().then(_ => {
      this.props.history.push("/login");
    });
  };

  toggleTheme = () => {
    this.setState(
      prevState => ({ isDarkTheme: !prevState.isDarkTheme }),
      () => {
        if (this.state.isDarkTheme === true) {
          this.attachThemeToBody("dark", "bright");
        } else {
          this.attachThemeToBody("bright", "dark");
        }
      }
    );
  };

  private attachThemeToBody(themeToAdd: string, themeToRemove: string) {
    const bodyElement = document.body;
    bodyElement.classList.remove(`${themeToRemove}-theme`);
    bodyElement.classList.add(`${themeToAdd}-theme`);
    localStorage.setItem("theme", themeToAdd);
  }

  render() {
    return (
      <React.Fragment>
        {authHelper.isAuthenticated() && (
          <Navbar handleLogout={this.onLogout} toggleTheme={this.toggleTheme} />
        )}
        <div style={{ flex: "0 0 100%", padding: "0 15px" }}>
          <Routes />
        </div>
      </React.Fragment>
    );
  }
}
export default App;
