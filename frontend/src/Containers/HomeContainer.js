import { connect } from 'react-redux';
import Home from "../Components/HomeComponent";
import { addContact } from "../Actions/ContactAction";

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

export default connect(mapStateToProps, mapDispatchToProps)(Home)