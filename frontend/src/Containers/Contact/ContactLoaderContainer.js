import { connect } from 'react-redux';
import ContactLoaderComponent from "../../Components/Contact/ContactLoaderComponent";
import { addContact } from "../../Actions/contactAction";

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactLoaderComponent)
