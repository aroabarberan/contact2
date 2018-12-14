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
      .then(this.props.addContacts)
      .catch(console.log)
  }

  render () {
    return (
      <div sytle={{ diplay: 'none' }}></div>
    )
  }
}

ContactLoaderComponent.propTypes = {
  addContacts: PropTypes.func.isRequired,
}

export default ContactLoaderComponent
