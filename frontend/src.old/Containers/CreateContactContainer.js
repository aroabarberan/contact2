import { connect } from 'react-redux';
import CreateContact from "../Components/CreateContactComponent";
import { addContact, editContact, updateForm } from "../Actions/ContactAction";
// esto de aqui arriba es igual a:
// import ContactAction from '../Actions/ContactAction';
// luego se usaria asi:
// const addContact = ContactAction.addContact; // correcto? si. O sea, cagada. ContactAction tendria que usarse:
// const bla = new ContactAction(); // si contactaction empieza por mayus, es una clase
// no estas exportando una clase, estas exportando un objeto, ergo ya sabes


const mapStateToProps = state => ({
  contacts: state.contacts, 
  form : state.contacts.form,
});

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
  editContact: (id, contact) => {
    dispatch(editContact(id, contact))
  },
  updateForm: contact => {
    dispatch(updateForm(contact))
  },
})

// this is not a class, but an object, it's name should be start with lowercase
export default connect(mapStateToProps, mapDispatchToProps)(CreateContact)