import { connect } from 'react-redux';
import CreateContact from "../Components/CreateContactComponet";
import { addContact, updateForm } from "../Actions/ContactAction";


const mapStateToProps = state => ({
  profile: state.profile,
  contacts: state.contacts,
  form : state.contacts.form,
  sub: state.contacts.sub,
  name: state.contacts.name,
  phone: state.contacts.phone,
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