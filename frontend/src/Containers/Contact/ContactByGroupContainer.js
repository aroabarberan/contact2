import { connect } from 'react-redux';
import ContactComponent from "../../Components/Contact/ContactComponent";
import { addContact, editContact } from "../../Actions/contactAction";

const getContactsByGroup = (contacts, groups, groupName) => {
  const group = groups.find(currentGroup => currentGroup.name === groupName)
  if (!group) return [];

  return contacts
    .filter(c => c.groups.map(g => g.id)
    .includes(group.id))
    .sort((a, b) => a.name.localeCompare(b.name));
  // return group.contacts.sort((a, b) => a.name.localeCompare(b.name))
}

const mapStateToProps = (state, { groupName }) => ({
  contacts: getContactsByGroup(state.contacts, state.groups, groupName),
  groups: state.groups,
})

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
  editContact: (contact) => {
    dispatch(editContact(contact))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactComponent)
