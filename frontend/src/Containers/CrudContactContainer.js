import { connect } from 'react-redux';
import CrudContact from "../Components/CrudContactComponet";
import { addContact, deleteContact, updateForm } from "../Actions/ContactAction";


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
  deleteContact: id => {
    dispatch(deleteContact(id))
  },
  updateForm: contact => {
    dispatch(updateForm(contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CrudContact)