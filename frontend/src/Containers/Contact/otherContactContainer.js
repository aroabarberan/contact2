import { connect } from 'react-redux';
import OtherContactComponent from "../../Components/Contact/OtherContactComponent";
// import { addContact } from "../../Actions/contactAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
  form : state.contacts.form,
  favourite: state.contacts.favourite,
})

const mapDispatchToProps = dispatch => ({
  //TODO
})

export default connect(mapStateToProps, mapDispatchToProps)(OtherContactComponent)