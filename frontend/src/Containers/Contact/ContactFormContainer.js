import { connect } from 'react-redux';
import ContactFormComponent from "../../Components/Contact/ContactFormComponent";
import { addContact, editContact, resetForm } from "../../Actions/contactAction";

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
    dispatch(resetForm())
  },
  editContact: (contact) => {
    dispatch(editContact(contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormComponent)
