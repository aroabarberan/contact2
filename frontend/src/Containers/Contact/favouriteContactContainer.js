import { connect } from 'react-redux';
import FavourieContactComponent from "../../Components/Contact/FavouriteContactComponent";
import { addContact, editContact } from "../../Actions/contactAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
  form : state.contacts.form,
  favourite: state.contacts.favourite,
})

const mapDispatchToProps = dispatch => ({
  editContact: (id, contact) => {
    dispatch(editContact(id, contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(FavourieContactComponent)