
import { connect } from 'react-redux';
import CreateContactComponent from "../../Components/Contact/CreateContactComponent";
import { addContact, editContact, updateForm, resetForm } from "../../Actions/contactAction";

const mapStateToProps = state => ({
  contacts: state.contacts,
});

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
    dispatch(resetForm())
  },
  editContact: (contact) => {
    dispatch(editContact(contact))
  },
  updateForm: contact => {
    dispatch(updateForm(contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateContactComponent)
