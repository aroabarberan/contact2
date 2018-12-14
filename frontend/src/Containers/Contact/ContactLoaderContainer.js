import { connect } from 'react-redux';
import ContactLoaderComponent from "../../Components/Contact/ContactLoaderComponent";
import { addContacts } from "../../Actions/contactAction";

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  addContacts: contacts => {
    dispatch(addContacts(contacts))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactLoaderComponent)
