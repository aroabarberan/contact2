import { connect } from 'react-redux';
import ListItemComposition from "../Components/ListItemCompositionComponent";
import { 
  addContact, editContact, deleteContact, updateForm 
} from "../Actions/ContactAction";

const mapStateToProps = state => ({
  profile: state.profile,
  contacts: state.contacts,
  form : state.contacts.form,
  sub: state.contacts.sub,
  avatar: state.contacts.avatar,
  name: state.contacts.name,
  phone: state.contacts.phone,
  favourite: state.contacts.favourite,
});

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
  editContact: (id, contact) => {

    console.log(id, contact)
    dispatch(editContact(id, contact))
  },
  deleteContact: id => {
    dispatch(deleteContact(id))
  },
  updateForm: contact => {
    dispatch(updateForm(contact))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItemComposition)