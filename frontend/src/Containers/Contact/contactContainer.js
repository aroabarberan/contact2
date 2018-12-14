import { connect } from 'react-redux';
import ContactComponent from "../../Components/Contact/ContactComponent";
import { addContact, editContact } from "../../Actions/contactAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
  groups: state.groups,
  // form : state.contacts.form,
  // favourite: state.contacts.favourite,
})

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
  editContact: (id, contact) => {
    dispatch(editContact(id, contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactComponent)
