import { connect } from 'react-redux';
import Contact from "../Components/ContactComponent";
import { addContact } from "../Actions/ContactAction";

// same as ListItemCompositionContainer (duplicated parameter)
const mapStateToProps = state => ({
  contacts: state.contacts,
  form : state.contacts.form,
  favourite: state.contacts.favourite,
})

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
})

// this is not a class, but an object, it's name should be start with lowercase
export default connect(mapStateToProps, mapDispatchToProps)(Contact)