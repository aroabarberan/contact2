// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';
// import AddIcon from '@material-ui/icons/Add';


// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }


// class CreateContact extends Component {
//   constructor() {
//     super()
//     this.state = {
//       open: false,
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.submit = this.submit.bind(this)
//   }
  
//   componentWillMount() {
//     this.setState({ profile: {} });
//     const { userProfile, getProfile } = this.props.auth;
//     if (!userProfile) {
//       getProfile((err, profile) => {
//         this.setState({ profile });
//       });

//     } else {
//       this.setState({ profile: userProfile });
//     }
//   }

//   handleOpen = () => {
//     this.setState({ open: true });
//   }

//   handleClose = () => {
//     this.setState({ open: false });
//   }

//   handleChange(evt) {
//     this.props.updateForm({
//       sub: '',
//       name: this.props.name,
//       phone: this.props.phone,
//       [evt.target.name]: evt.target.value
//     });
//   }

//   submit(evt) {
//     evt.preventDefault()
//     const { name, phone } = this.props
//     const sub = this.state.profile.sub
//     const { getAccessToken } = this.props.auth;

//     fetch('http://localhost:3010/api/addContacts', {
//       method: "POST",
//       headers: {
//         'Accept': 'application/json',
//         'Content-type': 'application/json',
//         'Authorization': 'Bearer ' + getAccessToken(),
//       },
//       body: JSON.stringify({ sub, name, phone }),
//     })
//       .then(res => res.text())
//       .then(console.log)

//       this.props.addContact({ sub, name, phone })
//   }

//   render() {
    
//     const { classes } = this.props;
//     return (
//       <div>
//         <Button variant="fab" color="secondary" aria-label="Add"
//           className={classes.absolute} onClick={this.handleOpen}>
//           <AddIcon />
//         </Button>

//         <Modal
//           aria-labelledby="simple-modal-title"
//           aria-describedby="simple-modal-description"
//           open={this.state.open}
//           onClose={this.handleClose}
//         >
//           <div style={getModalStyle()} className={classes.paper}>
//             <Typography variant="subtitle1" id="simple-modal-description">
//               <form onSubmit={this.submit}>
//                 <div>
//                   <label>Name</label>
//                   <input type="text" name='name' onChange={this.handleChange} />
//                 </div>
//                 <div>
//                   <label>Phone</label>
//                   <input type="text" name='phone' onChange={this.handleChange} />
//                 </div>
//                 <button>Send</button>
//               </form>
//             </Typography>
//           </div>
//         </Modal>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   contacts: state.contacts,
//   sub: state.contacts.form.create.sub,
//   name: state.contacts.form.create.name,
//   phone: state.contacts.form.create.phone
// })

// const styles = theme => ({
//   paper: {
//     position: 'absolute',
//     width: theme.spacing.unit * 50,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing.unit * 4,
//   },
//   absolute: {
//     position: 'absolute',
//     // bottom: theme.spacing.unit * 2,
//     bottom: theme.spacing.unit * 6,
//     right: theme.spacing.unit * 1,
//   },
// });


// CreateContact.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(CreateContact);

import React, { Component } from 'react';

class CreateContact extends Component {
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
    
    fetch('http://localhost:3010/api/addContacts', {
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

export default(CreateContact);
