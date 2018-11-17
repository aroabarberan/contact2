import React from 'react';

class Logout extends React.Component {

  goTo = (route) => {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
          {isAuthenticated() && (this.goTo('contacts'))}
        <button onClick={this.login.bind(this)}>Log In</button>
      </div>
    );
  }
}

export default Logout