import { connect } from 'react-redux';
import ListItemCompositionComponent from "../Components/ListItemCompositionComponent";
import { 
  addContact, editContact, deleteContact, updateForm 
} from "../Actions/contactAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
  groups: state.groups,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItemCompositionComponent)