// import React, { Component } from 'react';
// import { connect } from "react-redux";
// import { addContact } from "../Actions/ContactAction";

// const url_getContact = 'http://localhost:3010/api/private'

// class GetContact extends Component {

//   componentWillMount() {
//     this.setState({ profile: {} });

//     const { userProfile, getProfile } = this.props.auth;
//     if (!userProfile) {
//       getProfile((err, profile) => {
//         this.setState({ profile });
//         const { getAccessToken } = this.props.auth;

//         fetch(url_getContact,
//           {
//             method: "POST",
//             headers: {
//               'Accept': 'application/json',
//               'Content-type': 'application/json',
//               'Authorization': 'Bearer ' + getAccessToken(),
//             },
//             body: JSON.stringify({ sub: this.state.profile.sub }),
//           })
//           .then(res => res.json())
//           .then(contacts => contacts.map(contact => this.props.addContact(contact)))
//           .catch(console.log)
//       });

//     } else {
//       this.setState({ profile: userProfile });
//     }

//   }
//   render() {

//     return (
//       <div>
//         <p>contacts</p>
//         <div>
//           {this.props.contacts.contacts.map((c, i) =>
//             <div key={i}>
//               <p>Name: {c.name}</p>
//               <p>Phone: {c.phone}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }
// const mapStateToProps = state => ({
//   contacts: state.contacts,
// })

// const mapDispatchToProps = dispatch => ({
//   addContact: contact => {
//     dispatch(addContact(contact))
//   },
// })


// export default connect(mapStateToProps, mapDispatchToProps)(GetContact)

import React, { Component } from 'react';
import { connect } from "react-redux";
import { Divider } from '@material-ui/core';

import { addContact } from "../Actions/ContactAction";

const url_getContact = 'http://localhost:3010/api/private'

class GetContact extends Component {

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

    return (
      <div>
        {this.props.contacts.contacts.map((c, i) =>
          <div key={i}>
            <p>Name: {c.name}</p>
            <p>Phone: {c.phone}</p>
            <Divider />
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  contacts: state.contacts,
})

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(GetContact)

