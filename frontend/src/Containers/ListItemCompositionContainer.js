import { connect } from 'react-redux';
import ListItemComposition from "../Components/ListItemCompositionComponent";
import { addContact, editContact, deleteContact, updateForm } from "../Actions/ContactAction";


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

export default connect(null, mapDispatchToProps)(ListItemComposition)