import React from 'react';
import { Formik, Field } from 'formik';
import { PhoneCallback } from '@material-ui/icons'
// import { QUERIES } from "../querys";
import { TextField, Button, DialogContent } from '@material-ui/core';
import { DynamicList } from '@ivanbeldad/dynamic-list';



const handleSubmit = (props) => (values, actions) => {

  console.log(values)
}

class Form extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Formik
          initialValues={{ phones: [] }}
          onSubmit={values => console.log(values)}
          render={props => (
            <form>
              <DynamicList
                name='phones'
                initialValue={{ phone: '', tag: '' }}
                sectionIcon={<PhoneCallback />}
                render={(fields) => {
                  const [field1, field2] = fields;
                  return (
                    <div>
                      <TextField {...field1} placeholder='Phone' />
                      <TextField {...field2} placeholder='Tag' />
                    </div>
                  )
                }
                }
              />
              {/* <DialogContent >
                <Field
                  name="name"
                  // value={values.name}
                  render={({ field }) => (
                    <TextField {...field} autoFocus margin="normal" label="Name" type="text" />
                  )}
                />
                <Field
                  name="lastName"
                  // value={values.lastName}
                  render={({ field }) => (
                    <TextField {...field} margin="normal" label="Last Name" type="text" />
                  )}
                />
              </DialogContent> */}
              <Button variant='outlined' onClick={props.handleSubmit}>Save</Button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default Form;

