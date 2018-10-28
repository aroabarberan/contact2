import { connect } from 'react-redux';
import CreateContact from "../Components/CreateContactComponet";
import { addContact, updateForm } from "../Actions/ContactAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
  sub: state.contacts.form.create.sub,
  name: state.contacts.form.create.name,
  phone: state.contacts.form.create.phone
})

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
  
  updateForm: contact => {
    dispatch(updateForm(contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateContact)