import { connect } from 'react-redux';
import MergeContactComponent from "../../Components/Contact/MergeContactComponent";
// import { addContact } from "../../Actions/contactAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
  form : state.contacts.form,
  favourite: state.contacts.favourite,
})

const mapDispatchToProps = dispatch => ({
  //TODO
})

export default connect(mapStateToProps, mapDispatchToProps)(MergeContactComponent)