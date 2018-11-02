import React, { Component } from 'react';
import Edit from '@material-ui/icons/Edit';
import ListItemComposition from '../Containers/ListItemCompositionContainer';


const url_getContact = 'http://localhost:3010/api/contacts';


class Contact extends Component {

  componentWillMount() {
    this.setState({ profile: {} });

    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
        const { getAccessToken } = this.props.auth;

        fetch(url_getContact,
          {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Bearer ' + getAccessToken(),
            },
            body: JSON.stringify({ sub: this.state.profile.sub }),
          })
          .then(res => res.json())
          .then(contacts => contacts.map(contact => this.props.addContact(contact)))
          .catch(console.log)
      });

    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.contacts.contacts.map((contact, i) =>
          <div key={i}>
            <p>{contact.name} {contact.phone}</p>
            <ListItemComposition idContact={contact.id}/>
            <Edit onClick={this.props.editContact} />
          </div>
        )}
      </div>
    );
  }
}

export default Contact;
