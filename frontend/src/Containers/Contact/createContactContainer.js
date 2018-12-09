
import { connect } from 'react-redux';
import CreateContactComponent from "../../Components/Contact/CreateContactComponent";
import { addContact, editContact, updateForm, resetForm } from "../../Actions/contactAction";
import { addPhone } from "../../Actions/phoneAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
  phones: state.phones,
  form : state.contacts.form,
});

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
    dispatch(resetForm())
  },
  editContact: (id, contact) => {
    dispatch(editContact(id, contact))
  },
  updateForm: contact => {
    dispatch(updateForm(contact))
  },
  addPhone: phone => {
    dispatch(addPhone(phone))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateContactComponent)