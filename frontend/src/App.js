import React, { Component } from 'react';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <div>
          <div>
            <div>
              <a href="#">Auth0 - React</a>
            </div>
            <button
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </button>
            {
              !isAuthenticated() && (
                <button
                  onClick={this.login.bind(this)}
                >
                  Log In
                  </button>
              )
            }
            {
              isAuthenticated() && (
                <button
                  onClick={this.goTo.bind(this, 'profile')}
                >
                  Profile
                  </button>
              )
            }
            {
              isAuthenticated() && (
                <button
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                  </button>
              )
            }
               {
              isAuthenticated() && (
                <button
                  onClick={this.goTo.bind(this, 'getContact')}
                >
                  GetContact
                  </button>
              )
            }
            {
              isAuthenticated() && (
                <button
                  onClick={this.goTo.bind(this, 'createContact')}
                >
                  CreateContact
                  </button>
              )
            }
            
          </div>
        </div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
