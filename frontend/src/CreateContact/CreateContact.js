import React, { Component } from 'react';

class GetContact extends Component {
  constructor() {
    super()
    this.state = {
      contacts: [{
        user: '',
        name: '',
        phone: ''
      }]
    }
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
  }
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });

    } else {
      this.setState({ profile: userProfile });
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  submit(evt) {
    evt.preventDefault();
    const { name, phone } = this.state
    const sub = this.state.profile.sub
    const { getAccessToken } = this.props.auth;
    console.log(getAccessToken())
    
    fetch('http://localhost:3010/api/contacts', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + getAccessToken(),
      },
      body: JSON.stringify({ sub, name, phone }),
    })
      .then(res => res.text())
      .then(console.log)

    this.setState(({ contacts }) => ({ contacts: [...contacts, { name, phone }] }));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <div>
            <label>Name</label>
            <input type="text" name='name' onChange={this.handleChange} />
          </div>
          <div>
            <label>Phone</label>
            <input type="text" name='phone' onChange={this.handleChange} />
          </div>
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default GetContact;
