import { connect } from 'react-redux';
import Contact from "../Components/ContactComponent";
import { 
  addContact, editContact, sortContactsByFavourite, updateForm 
} from "../Actions/ContactAction";


const mapStateToProps = state => ({
  profile: state.profile,
  contacts: state.contacts,
  form : state.contacts.form,
  sub: state.contacts.sub,
  name: state.contacts.name,
  phone: state.contacts.phone,
})

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
  editContact: (id, contact) => {
    dispatch(editContact(id, contact))
  },
  sortContactsByFavourite: () => {
    dispatch(sortContactsByFavourite())
  },
  updateForm: contact => {
    dispatch(updateForm(contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Contact)