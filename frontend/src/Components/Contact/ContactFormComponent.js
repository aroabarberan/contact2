import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Call, Email, Note } from '@material-ui/icons'
import { Formik, Field } from 'formik';
import { DialogContent, TextField, DialogActions, Button, Grid } from '@material-ui/core';
import { DynamicList } from '@ivanbeldad/dynamic-list'
import * as Yup from 'yup'
import { QUERIES } from '../../querys';

const textType = Yup.string()
  .matches(/^([a-zA-Záéíóúñ -])*$/, 'Only allowed characters, dashes and spaces');

const noSemicolon = Yup.string()
  .matches(/^([^;]*)$/, 'No semicolons');

const contactSchema = Yup.object().shape({
  name: textType.required('Required'),
  second_name: textType,
  last_name: textType,
  second_last_name: textType,
  nickname: textType,
  direction: noSemicolon,
  city: noSemicolon,
  province: noSemicolon,
  job: noSemicolon,
  phones: Yup.array().of(Yup.object().shape({
    phone: Yup.string().matches(/^((\+)?[0-9 ]{5,15})?$/, 'Only numbers and minimum 5'),
    tag: noSemicolon,
  })),
  emails: Yup.array().of(Yup.object().shape({
    email: Yup.string().email('Must be an email'),
    tag: noSemicolon,
  })),
  notes: Yup.array().of(Yup.object().shape({
    title: noSemicolon,
    description: noSemicolon,
  }))
});

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

    console.log(values);

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
          validationSchema={contactSchema}
          render={props => (
            <Fragment>
              <DialogContent>
                <Field name="id" value={props.id} style={{ display: 'none' }} />
                <Grid container spacing={16} style={{ marginTop: 0 }}>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="name"
                      value={props.name}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          color='secondary'
                          autoFocus
                          margin="normal"
                          type="text"
                          variant='outlined'
                          fullWidth
                          disabled={disabled}
                          label={props.errors.name || 'Name'}
                          error={!!props.errors.name}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="second_name"
                      value={props.second_name}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          disabled={disabled}
                          margin="normal"
                          type="text"
                          variant='outlined'
                          fullWidth
                          label={props.errors.second_name || 'Second name'}
                          error={!!props.errors.second_name}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="last_name"
                      value={props.last_name}
                      render={({ field }) => (
                        <TextField {...field}
                          margin="normal" disabled={disabled}
                          type="text"
                          variant='outlined'
                          fullWidth
                          label={props.errors.last_name || 'Last Name'}
                          error={!!props.errors.last_name}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      name="second_last_name"
                      value={props.second_last_name}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          disabled={disabled}
                          margin="normal"
                          type="text"
                          variant='outlined'
                          fullWidth
                          label={props.errors.second_last_name || 'Second Last name'}
                          error={!!props.errors.second_last_name}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Field
                      name="nickname"
                      value={props.nickname}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          disabled={disabled}
                          margin="normal"
                          type="text"
                          variant='outlined'
                          fullWidth
                          label={props.errors.nickname || 'Nickname'}
                          error={!!props.errors.nickname}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <Field
                      name="job"
                      value={props.job}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          disabled={disabled}
                          margin="normal"
                          type="text"
                          variant='outlined'
                          fullWidth
                          label={props.errors.job || 'Job'}
                          error={!!props.errors.job}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="direction"
                      value={props.direction}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          disabled={disabled}
                          margin="normal"
                          type="text"
                          variant='outlined'
                          fullWidth
                          label={props.errors.direction || 'Address'}
                          error={!!props.errors.direction}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="city"
                      value={props.city}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          disabled={disabled}
                          margin="normal"
                          type="text"
                          variant='outlined'
                          fullWidth
                          label={props.errors.city || 'City'}
                          error={!!props.errors.city}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="province"
                      value={props.province}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          disabled={disabled}
                          margin="normal"
                          type="text"
                          variant='outlined'
                          fullWidth
                          label={props.errors.province || 'Province'}
                          error={!!props.errors.province}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <DynamicList
                  name='phones'
                  initialValue={{ phone: '', tag: '' }}
                  sectionIcon={<Call />}
                  render={(fields, errors) => {
                    const [phone, tag] = fields;
                    const [phoneError, tagError] = errors;
                    return (
                      <Grid container spacing={16} style={{ marginTop: 8, marginBottom: 8 }}>
                        <Grid item xs={12} md={7}>
                          <TextField
                            {...phone}
                            disabled={disabled}
                            placeholder='Phone'
                            fullWidth
                            error={!!phoneError}
                            label={phoneError}
                          />
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <TextField
                            {...tag}
                            disabled={disabled}
                            placeholder='Tag'
                            fullWidth
                            error={!!tagError}
                            label={tagError}
                          />
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
                  render={(fields, errors) => {
                    const [email, tag] = fields;
                    const [emailError, tagError] = errors;
                    return (
                      <Grid container spacing={16} style={{ marginTop: 8, marginBottom: 8 }}>
                        <Grid item xs={12} md={7}>
                          <TextField
                            {...email}
                            disabled={disabled}
                            placeholder='Email'
                            fullWidth
                            error={!!emailError}
                            label={emailError}
                          />
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <TextField
                            {...tag}
                            disabled={disabled}
                            placeholder='Tag'
                            fullWidth
                            error={!!tagError}
                            label={tagError}
                          />
                        </Grid>
                      </Grid>
                    )
                  }}
                />
                <DynamicList
                  name='notes'
                  initialValue={{ title: '', description: '' }}
                  sectionIcon={<Note />}
                  render={(fields, errors) => {
                    const [title, description] = fields;
                    const [titleError, descriptionError] = errors;
                    return (
                      <Grid container spacing={16} style={{ marginTop: 8, marginBottom: 8 }}>
                        <Grid item xs={12} md={7}>
                          <TextField
                            {...title}
                            disabled={disabled}
                            placeholder='Note Title'
                            fullWidth
                            error={!!titleError}
                            label={titleError}
                          />
                        </Grid>
                        <Grid item xs={12} md={5}>
                          <TextField
                            {...description}
                            disabled={disabled}
                            placeholder='Description'
                            fullWidth
                            error={!!descriptionError}
                            label={descriptionError}
                          />
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
