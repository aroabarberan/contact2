import { connect } from 'react-redux';
import CreateContact from "../Components/CreateContactComponent";
import { addContact, editContact, updateForm } from "../Actions/ContactAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
  form : state.contacts.form,
});

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
  editContact: (id, contact) => {
    dispatch(editContact(id, contact))
  },
  updateForm: contact => {
    dispatch(updateForm(contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateContact)