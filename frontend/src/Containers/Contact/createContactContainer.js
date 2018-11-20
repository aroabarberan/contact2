
import { connect } from 'react-redux';
import CreateContactComponent from "../../Components/Contact/CreateContactComponent";
import { addContact, editContact, updateForm } from "../../Actions/contactAction";


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

export default connect(mapStateToProps, mapDispatchToProps)(CreateContactComponent)