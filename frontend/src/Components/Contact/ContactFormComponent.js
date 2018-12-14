import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Call, Email, Note } from '@material-ui/icons'
import { Formik, Field } from 'formik';
import { DialogContent, TextField, DialogActions, Button } from '@material-ui/core';
import { DynamicList } from '@ivanbeldad/dynamic-list'
import { QUERIES } from '../../querys';

class ContactFormComponent extends React.Component {
  handleSubmit = (values, actions) => {
    const { auth, addContact, handleClose } = this.props;
    let {
      name, last_name, favourite,
      second_name, second_last_name, nickname,
      direction, city, province, job,
      phones, emails, notes
    } = values;

    fetch(QUERIES.contact, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + auth.getAccessToken(),
      },
      body: JSON.stringify({
        name, last_name, favourite, second_name, second_last_name,
        nickname, direction, city, province, job, phones, emails, notes
      }),
    })
      .then(res => res.json())
      .then(data => addContact(data.contact))
      .catch(console.log);

    handleClose();
  }

  render() {
    const { classes, contactInfo, handleClose } = this.props;
    let contactValues = { ...contactInfo };
    contactValues.phones = [...contactInfo.phones];
    contactValues.emails = [...contactInfo.emails];
    contactValues.notes = [...contactInfo.notes];

    console.log(contactInfo);
    return (
      <div className={classes.root}>
        <Formik
          initialValues={contactValues}
          onSubmit={this.handleSubmit}
          render={props => (
            <form>
              <DialogContent>
                <Field name="id" value={props.id} style={{ display: 'none' }} />
                <Field
                  name="name"
                  value={props.name}
                  render={({ field }) => (
                    <TextField {...field} autoFocus margin="normal" label="Name" type="text" />
                  )}
                />
                <Field
                  name="last_name"
                  value={props.last_name}
                  render={({ field }) => (
                    <TextField {...field} margin="normal" label="Last Name" type="text" />
                  )}
                />
                <Field
                  name="second_name"
                  value={props.second_name}
                  render={({ field }) => (
                    <TextField {...field} margin="normal" label="Second name" type="text" />
                  )}
                />
                <Field
                  name="second_last_name"
                  value={props.second_last_name}
                  render={({ field }) => (
                    <TextField {...field} margin="normal" label="Second last name" type="text" />
                  )}
                />
                <Field
                  name="nickname"
                  value={props.nickname}
                  render={({ field }) => (
                    <TextField {...field} margin="normal" label="Nickname" type="text" />
                  )}
                />
                <Field
                  name="direction"
                  value={props.direction}
                  render={({ field }) => (
                    <TextField {...field} margin="normal" label="Direction" type="text" />
                  )}
                />
                <Field
                  name="city"
                  value={props.city}
                  render={({ field }) => (
                    <TextField {...field} margin="normal" label="City" type="text" />
                  )}
                />
                <Field
                  name="province"
                  value={props.province}
                  render={({ field }) => (
                    <TextField {...field} margin="normal" label="Province" type="text" />
                  )}
                />
                <Field
                  name="job"
                  value={props.job}
                  render={({ field }) => (
                    <TextField {...field} margin="normal" label="Job" type="text" />
                  )}
                />
              </DialogContent>
              <DynamicList
                name='phones'
                initialValue={{ phone: '', tag: '' }}
                sectionIcon={<Call />}
                render={(fields) => {
                  const [phone, tag] = fields;
                  return (
                    <div>
                      <TextField {...phone} placeholder='Phone' />
                      <TextField {...tag} placeholder='Tag' />
                    </div>
                  )
                }}
              />
              <DynamicList
                name='emails'
                initialValue={{ email: '', tag: '' }}
                sectionIcon={<Email />}
                render={(fields) => {
                  const [email, tag] = fields;
                  return (
                    <div>
                      <TextField {...email} placeholder='Email' />
                      <TextField {...tag} placeholder='Tag' />
                    </div>
                  )
                }}
              />
              <DynamicList
                name='notes'
                initialValue={{ note: '', title: '' }}
                sectionIcon={<Note />}
                render={(fields) => {
                  const [note, title] = fields;
                  return (
                    <div>
                      <TextField {...note} placeholder='Note' />
                      <TextField {...title} placeholder='Title' />
                    </div>
                  )
                }}
              />
              <DialogActions>
                <Button onClick={handleClose} color="primary">Cancel</Button>
                <Button type="submit" color="primary" onClick={props.handleSubmit}>Save</Button>
              </DialogActions>
            </form>
          )}
        />
      </div>
    )
  }
}

const styles = theme => ({
  root: {
  }
})

ContactFormComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
  contactInfo: PropTypes.shape(),
  auth: PropTypes.shape().isRequired,
  addContact: PropTypes.func.isRequired,
  editContact: PropTypes.func.isRequired,
}

ContactFormComponent.defaultProps = {
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
