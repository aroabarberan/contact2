import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { QUERIES } from '../../querys';

class ContactLoaderComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    fetch(QUERIES.contact, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
    })
      .then(res => res.json())
      .then(contacts => contacts.map(contact => this.props.addContact(contact)))
      .catch(console.log)
  }

  render () {
    return (
      <div sytle={{ diplay: 'none' }}></div>
    )
  }
}

ContactLoaderComponent.propTypes = {
  addContact: PropTypes.func.isRequired,
}

export default ContactLoaderComponent
