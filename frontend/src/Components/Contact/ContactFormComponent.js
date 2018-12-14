import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Call, Email, Note } from '@material-ui/icons'
import { Formik, Field } from 'formik';
import { DialogContent, TextField, DialogActions, Button, Grid } from '@material-ui/core';
import { DynamicList } from '@ivanbeldad/dynamic-list'
import { QUERIES } from '../../querys';

class ContactFormComponent extends React.Component {
  state = {
    disablePreview: false,
  }

  handleSubmit = (values, actions) => {
    const { auth, addContact, editContact } = this.props;
    let {
      id, name, last_name, favourite,
      second_name, second_last_name, nickname,
      direction, city, province, job,
      phones, emails, notes
    } = values;

    phones = phones.filter(p => !!p.phone);
    emails = emails.filter(e => !!e.email);
    notes = notes.filter(n => !!n.title);

    const method = id ? 'PUT' : 'POST';
    let query = QUERIES.contact;
    if (id) {
      query += id;
    }

    fetch(query, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + auth.getAccessToken(),
      },
      body: JSON.stringify({
        id, name, last_name, favourite, second_name, second_last_name,
        nickname, direction, city, province, job, phones, emails, notes
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (id) {
          editContact(data.contact);
        } else {
          addContact(data.contact);
        }
      })
      .catch(console.log);

    this.handleClose();
  }

  handleClose = () => {
    const { handleClose } = this.props;
    handleClose();
    this.setState({ disablePreview: false });
  }

  enableEdit = (evt) => {
    evt.preventDefault();
    this.setState({ disablePreview: true })
  }

  render() {
    const { classes, contactInfo, preview } = this.props;
    const { disablePreview } = this.state;

    let contactValues = { ...contactInfo };
    contactValues.phones = [...contactInfo.phones];
    contactValues.emails = [...contactInfo.emails];
    contactValues.notes = [...contactInfo.notes];

    const disabled = preview && !disablePreview;

    return (
      <Fragment>
        <Formik
          initialValues={contactValues}
          onSubmit={this.handleSubmit}
          validate={({ name }) => {
            if (!name) return { name: 'Required' };
            return {};
          }}
          render={props => (
            <Fragment>
              <DialogContent>
                <Field name="id" value={props.id} style={{ display: 'none' }} />
                <Grid container spacing={32}>
                  <Grid item xs={6}>
                    <Field
                      name="name"
                      value={props.name}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          color='secondary'
                          autoFocus
                          margin="normal"
                          label={props.errors.name || 'Name'}
                          type="text"
                          error={!!props.errors.name}
                          variant='outlined'
                          fullWidth
                          disabled={disabled}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="second_name"
                      value={props.second_name}
                      render={({ field }) => (
                        <TextField {...field} disabled={disabled} margin="normal" label="Second name" type="text" variant='outlined' fullWidth />
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={32}>
                  <Grid item xs={6}>
                    <Field
                      name="last_name"
                      value={props.last_name}
                      render={({ field }) => (
                        <TextField {...field}
                          margin="normal" disabled={disabled}
                          label="Last Name" type="text" variant='outlined' fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      name="second_last_name"
                      value={props.second_last_name}
                      render={({ field }) => (
                        <TextField {...field} disabled={disabled} margin="normal" label="Second Last name" type="text" variant='outlined' fullWidth />
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={32}>
                  <Grid item xs={5}>
                    <Field
                      name="nickname"
                      value={props.nickname}
                      render={({ field }) => (
                        <TextField {...field} disabled={disabled} margin="normal" label="Nickname" type="text" variant='outlined' fullWidth />
                      )}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <Field
                      name="job"
                      value={props.job}
                      render={({ field }) => (
                        <TextField {...field} disabled={disabled} margin="normal" label="Job" type="text" variant='outlined' fullWidth />
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={32}>
                  <Grid item xs={12}>
                    <Field
                      name="direction"
                      value={props.direction}
                      render={({ field }) => (
                        <TextField {...field} disabled={disabled} margin="normal" label="Address" type="text" variant='outlined' fullWidth />
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={32}>
                  <Grid item xs={12}>
                    <Field
                      name="city"
                      value={props.city}
                      render={({ field }) => (
                        <TextField {...field} disabled={disabled} margin="normal" label="City" type="text" variant='outlined' fullWidth />
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={32}>
                  <Grid item xs={12}>
                    <Field
                      name="province"
                      value={props.province}
                      render={({ field }) => (
                        <TextField {...field} disabled={disabled} margin="normal" label="Province" type="text" variant='outlined' fullWidth />
                      )}
                    />
                  </Grid>
                </Grid>

                <DynamicList
                  name='phones'
                  initialValue={{ phone: '', tag: '' }}
                  sectionIcon={<Call />}
                  render={(fields) => {
                    const [phone, tag] = fields;
                    return (
                      <Grid container spacing={16} style={{ marginTop: 8, marginBottom: 8 }}>
                        <Grid item xs={7}>
                          <TextField {...phone} disabled={disabled} placeholder='Phone' fullWidth />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField {...tag} disabled={disabled} placeholder='Tag' fullWidth />
                        </Grid>
                      </Grid>
                    )
                  }}
                />
                <DynamicList
                  name='emails'
                  initialValue={{ email: '', tag: '' }}
                  sectionIcon={<Email />}
                  style={{ width: '100%' }}
                  render={(fields) => {
                    const [email, tag] = fields;
                    return (
                      <Grid container spacing={16} style={{ marginTop: 8, marginBottom: 8 }}>
                        <Grid item xs={7}>
                          <TextField {...email} disabled={disabled} placeholder='Email' fullWidth />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField {...tag} disabled={disabled} placeholder='Tag' fullWidth />
                        </Grid>
                      </Grid>
                    )
                  }}
                />
                <DynamicList
                  name='notes'
                  initialValue={{ title: '', description: '' }}
                  sectionIcon={<Note />}
                  render={(fields) => {
                    const [title, description] = fields;
                    return (
                      <Grid container spacing={16} style={{ marginTop: 8, marginBottom: 8 }}>
                        <Grid item xs={7}>
                          <TextField {...title} disabled={disabled} placeholder='Note Title' fullWidth />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField {...description} disabled={disabled} placeholder='Description' fullWidth />
                        </Grid>
                      </Grid>
                    )
                  }}
                />
              </DialogContent>

              <DialogActions className={classes.actions}>
                {disabled ? (
                  <div>
                    <Button onClick={this.handleClose} color="default" style={{ marginRight: 16 }}>
                      Close
                    </Button>
                    <Button onClick={this.enableEdit} color='primary' variant='contained' type='button'>
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button onClick={this.handleClose} color="default" style={{ marginRight: 16 }}>
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" onClick={props.handleSubmit} variant='contained'>
                      Save
                    </Button>
                  </div>
                )}
              </DialogActions>
            </Fragment>
          )}
        />
      </Fragment>
    )
  }
}

const styles = theme => ({
  blue: {
    color: 'blue',
  },
  actions: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit,
  }
})

ContactFormComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
  contactInfo: PropTypes.shape(),
  auth: PropTypes.shape().isRequired,
  addContact: PropTypes.func.isRequired,
  editContact: PropTypes.func.isRequired,
  preview: PropTypes.bool,
}

ContactFormComponent.defaultProps = {
  preview: false,
  contactInfo: {
    phones: [],
    emails: [],
    notes: [],
    name: '',
    last_name: '',
    favourite: 0,
    second_name: '',
    second_last_name: '',
    nickname: '',
    direction: '',
    city: '',
    province: '',
    job: '',
  }
}

export default withStyles(styles)(ContactFormComponent)
