import { connect } from 'react-redux';
import CrudContact from "../Components/CrudContactComponet";
import { addContact, editContact, deleteContact, updateForm } from "../Actions/ContactAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
  sub: state.contacts.sub,
  name: state.contacts.name,
  phone: state.contacts.phone
})

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
  editContact: (id, contact) => {
    dispatch(editContact(id, contact))
  },
  deleteContact: id => {
    dispatch(deleteContact(id))
  },
  updateForm: contact => {
    dispatch(updateForm(contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CrudContact)