import { connect } from 'react-redux';
import ListItemCompositionComponent from "../Components/ListItemCompositionComponent";
import {
  addContact, editContact, deleteContact, updateForm, addContactGroup, removeContactGroup
} from "../Actions/contactAction";


const mapStateToProps = state => ({
  groups: state.groups,
});

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
  editContact: (contact) => {
    dispatch(editContact(contact))
  },
  addContactGroup: (contact, group) => {
    dispatch(addContactGroup(contact, group))
  },
  removeContactGroup: (contact, group) => {
    dispatch(removeContactGroup(contact, group))
  },
  deleteContact: id => {
    dispatch(deleteContact(id))
  },
  updateForm: contact => {
    dispatch(updateForm(contact))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItemCompositionComponent)
