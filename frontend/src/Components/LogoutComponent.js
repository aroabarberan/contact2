import React from 'react';

class LogoutComponent extends React.Component {

  goTo = (route) => {
    this.props.history.replace(`/${route}`);
  }

  login = () => {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
          {isAuthenticated() && (this.goTo(this, '/'))}
        <button onClick={this.login}>Log In</button>
      </div>
    );
  }
}

export default LogoutComponent