import React, { Component } from "react";

class Login extends Component {
    
  render() {
    return (
      <div>
        <header className="page_header flex-row">
          <h1 className="page_title">Quote</h1>
          <input className="search-bar" placeholder="Search" />
          <div className="navigations">
            <i className="fa fa-quote-left" aria-hidden="true" />
            <span className="home-login">Login</span>
            <i className="fa fa-quote-right" aria-hidden="true" />
          </div>
        </header>

        <section className="page">
          <div className="container flex-row">
            <div className="container-right flex-column" />
            <div className="container-center flex-column">
              <h1 className="flex-column home-welcome-header">
                Welcome to Quote!
              </h1>
              <br />
              <div className="g-signin2" data-onsuccess="onSignIn" />
            </div>
            <div className="container-left flex-column" />
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
