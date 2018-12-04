import { connect } from 'react-redux';
import DrawerPaperComponent from "../Components/DrawerPaperComponent";
import { addContact } from "../Actions/contactAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
});

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerPaperComponent)