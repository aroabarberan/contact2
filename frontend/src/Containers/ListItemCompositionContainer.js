import { connect } from 'react-redux';
import ListItemCompositionComponent from "../Components/ListItemCompositionComponent";
import { 
  addContact, editContact, deleteContact, updateForm 
} from "../Actions/contactAction";
import { addPhone, editPhone } from "../Actions/phoneAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
  groups: state.groups,
  phones: state.phones,
  form : state.contacts.form,
});

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
  addPhone: phone => {
    dispatch(addPhone(phone))
  },
  editPhone: (id, phone) => {
    dispatch(editPhone(id, phone))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItemCompositionComponent)