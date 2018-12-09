import { connect } from 'react-redux';
import ShowContactGroupComponent from "../Components/Contact/ShowContactGroupComponent";
import { addContactGroup, deleteContactGroup } from "../Actions/contactGroupAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
  groups: state.groups,
  form : state.contacts.form,
});

const mapDispatchToProps = dispatch => ({
  addContactGroup: contact => {
    dispatch(addContactGroup(contact))
  },

  deleteContactGroup: id => {
    dispatch(deleteContactGroup(id))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowContactGroupComponent)