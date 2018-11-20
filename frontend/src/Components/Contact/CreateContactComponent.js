import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, Field } from 'formik';
import { QUERIES } from "../../querys";
import {
  Divider, Button, Dialog, DialogTitle, withStyles
} from '@material-ui/core';



const handleSubmit = (props) => (values, actions) => {
  console.log(values)

  const sub = props.auth.userProfile.sub;
  const token = props.auth.getAccessToken();
  const formData = new FormData();

  formData.append('sub', sub)
  formData.append('avatar', values.avatar)
  formData.append('name', values.name)
  formData.append('phone', values.phone)
  formData.append('favourite', values.favourite)

  fetch(QUERIES.contact, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: formData,
  })
    .then(res => res.json())
    .then(contact => props.addContact(contact))
    .catch(console.log);
  this.handleClose();
}

class CreateContact extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleFile = (setFieldValue) => (evt) => {
    setFieldValue("avatar", evt.currentTarget.files[0]);
  }
  handleSubmit = (props) => (values, actions) => {
    console.log(values)
  
    const sub = props.auth.userProfile.sub;
    const token = props.auth.getAccessToken();
    const formData = new FormData();
  
    formData.append('sub', sub)
    formData.append('avatar', values.avatar)
    formData.append('name', values.name)
    formData.append('phone', values.phone)
    formData.append('favourite', values.favourite)
  
    fetch(QUERIES.contact, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(contact => props.addContact(contact))
      .catch(console.log);
    this.handleClose();
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="fab" color="secondary" aria-label="Add"
          className={classes.buttonAdd} onClick={this.handleOpen}>
          <AddIcon />
        </Button>

        <Formik
          initialValues={{ name: '', phone: '', avatar: null, favourite: 0 }}
          onSubmit={handleSubmit(this.props)}
          render={({ values, setFieldValue }) => (
            <div>
              <Button variant="fab" color="secondary" aria-label="Add"
                className={classes.absolute} onClick={this.handleOpen}>
                <AddIcon />
              </Button>
              <Form>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Create new contact</DialogTitle>
                  <Divider />
                  <input type='file' name='avatar' onChange={this.handleFile(setFieldValue)} />
                  <Field type="text" name="name" value={values.name} />
                  <Field type="text" name="phone" value={values.phone} />
                  <button onClick={this.handleClose} color="primary">Cancel</button>
                  <button onClick={this.handleSubmit(this.props)} color="primary" type="submit">Save</button>
                </Dialog>
              </Form>
            </div>
          )}
        />
        {/* <Formik
          initialValues={{ name: '', phone: '', avatar: null, favourite: 0 }}
          onSubmit={handleSubmit(this.props)}
          render={({ values, setFieldValue }) => (
            <Form>
              <input type='file' name='avatar' onChange={this.handleFile(setFieldValue)} />
              <Field type="text" name="name" value={values.name} />
              <Field type="text" name="phone" value={values.phone} />
              <button type="submit">Save</button>
            </Form>
          )}
        /> */}
      </div>
    );
  }
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  buttonAdd: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateContact);



// import React from 'react';
// import PropTypes from 'prop-types';
// import AddIcon from '@material-ui/icons/Add';
// import { QUERIES } from "../../querys";
// // import { MySnackbarContentWrapper } from "../Components/SnackbarComponent";
// import {
//   Divider, Button, TextField, Dialog, DialogTitle,
//   DialogActions, DialogContent, withStyles, DialogContentText
// } from '@material-ui/core';


// class CreateContact extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       open: false,
//     }
//   }

//   handleOpen = () => {
//     this.setState({ open: true });
//   }

//   handleClose = () => {
//     this.setState({ open: false });
//   }

//   changeAvatar = evt => {
//     let files = evt.target.files || evt.dataTransfer.files;
//     if (!files.length)
//       return;
//     this.createImage(files[0]);
//   }

//   createImage = file => {
//     let reader = new FileReader();
//     reader.onload = (evt) => {
//       this.props.updateForm({
//         avatar: evt.target.result
//       });
//     };
//     reader.readAsDataURL(file);
//   }

//   handleChange = (evt) => {
//     this.props.updateForm({
//       avatar: this.props.form.create.avatar,
//       name: this.props.form.create.name,
//       phone: this.props.form.create.phone,
//       favourite: 0,
//       [evt.target.name]: evt.target.value
//     });
//   }

//   submit = (evt) => {
//     evt.preventDefault();
//     const { avatar, name, phone, favourite } = this.props.form.create;
//     const sub = this.props.auth.userProfile.sub;
//     const token = this.props.auth.getAccessToken();

//     // var formData = new FormData();
//     // formData.append("avatar",avatar);

//     fetch(QUERIES.contact, {
//       method: "POST",
//       headers: {
//         'Accept': 'application/json',
//         'Content-type': 'multipart/form-data',
//         'Authorization': 'Bearer ' + token,
//       },
//       body: JSON.stringify({ sub, avatar, name, phone, favourite }),
//       // body: formData,
//     })
//       .then(res => res.json())
//       .then(console.log)
//       .then(data => this.props.addContact(data.contact))
//       .catch(console.log);
//     this.handleClose();
//   }

//   render() {
//     const { classes } = this.props;
//     return (
//       <div>
//         <Button variant="fab" color="secondary" aria-label="Add"
//           className={classes.buttonAdd} onClick={this.handleOpen}>
//           <AddIcon />
//         </Button>
//         <Dialog
//           open={this.state.open}
//           onClose={this.handleClose}
//           aria-labelledby="form-dialog-title"
//         >
//           <DialogTitle id="form-dialog-title">Create new contact</DialogTitle>
//           <Divider />

//           <DialogContent>
//             <TextField
//               margin="normal"
//               name="avatar"
//               label="Avatar"
//               type="file"
//               onChange={this.changeAvatar}
//             />
//           </DialogContent>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="normal"
//               name="name"
//               label="Name"
//               type="text"
//               onChange={this.handleChange}
//             />
//           </DialogContent>
//           <DialogContent>
//             <TextField
//               margin="normal"
//               name="phone"
//               label="Phone"
//               type="text"
//               onChange={this.handleChange}
//             />
//           </DialogContent>
//           <DialogContentText name="favourite" label="Favourite" type="text" onChange={this.handleChange} />
//           <DialogActions>
//             <Button onClick={this.handleClose} color="primary">Cancel</Button>
//             <Button onClick={this.submit} color="primary">Save</Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     );
//   }
// }
// const styles = theme => ({
//   paper: {
//     position: 'absolute',
//     width: theme.spacing.unit * 50,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing.unit * 4,
//   },
//   buttonAdd: {
//     position: 'absolute',
//     bottom: theme.spacing.unit * 2,
//     right: theme.spacing.unit * 3,
//   },
// });

// CreateContact.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(CreateContact);
