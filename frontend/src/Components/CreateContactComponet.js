import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { MySnackbarContentWrapper } from "../Components/SnackbarComponent";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


class CreateContact extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
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

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChange(evt) {
    this.props.updateForm({
      name: this.props.form.create.name,
      phone: this.props.form.create.phone,
      [evt.target.name]: evt.target.value
    });
  }

  submit(evt) {
    evt.preventDefault();
    const { name, phone } = this.props.form.create;
    const sub = this.state.profile.sub;
    const token = this.props.auth.getAccessToken();

    fetch('http://localhost:3010/api/addContacts', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ sub, name, phone }),
    })
      .then(res => res.text())
      .then();

    this.props.addContact({ sub, name, phone });
    this.handleClose();

  }


  render() {

    const { classes } = this.props;
    return (
      <div>
        <Button variant="fab" color="secondary" aria-label="Add"
          className={classes.absolute} onClick={this.handleOpen}>
          <AddIcon />
        </Button>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="subtitle1" id="simple-modal-description">
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
            </Typography>
          </div>
        </Modal>
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
  absolute: {
    position: 'absolute',
    // bottom: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 6,
    right: theme.spacing.unit * 1,
  },
});

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateContact);
