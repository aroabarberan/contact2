import { connect } from 'react-redux';
import DrawerPaperComponent from "../Components/DrawerPaperComponent";
import { addContact, addContacts } from "../Actions/contactAction";

const mapStateToProps = state => ({
  contacts: state.contacts,
});

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
  addContacts: contacts => {
    dispatch(addContacts(contacts))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerPaperComponent)
