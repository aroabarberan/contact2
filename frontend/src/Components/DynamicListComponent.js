import React from 'react';
import { Formik } from 'formik';
import { PhoneCallback } from '@material-ui/icons'
// import { QUERIES } from "../querys";
import { TextField, Button } from '@material-ui/core';
import { DynamicList } from '@ivanbeldad/dynamic-list';


const handleSubmit = (props) => (values, actions) => {

  console.log(values)
}

class Form extends React.Component {
  render() {
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
                }}
              />
              <Button variant='outlined' onClick={props.handleSubmit}>Save</Button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default Form;

