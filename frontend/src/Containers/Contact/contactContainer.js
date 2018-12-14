import { connect } from 'react-redux';
import ContactComponent from "../../Components/Contact/ContactComponent";
import { addContact, editContact } from "../../Actions/contactAction";


const mapStateToProps = state => ({
  contacts: state.contacts.sort((a, b) => a.name.localeCompare(b.name)),
  groups: state.groups,
})

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
  editContact: (contact) => {
    dispatch(editContact(contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactComponent)
