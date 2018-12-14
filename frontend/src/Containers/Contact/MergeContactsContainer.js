import { connect } from 'react-redux';
import ContactComponent from "../../Components/Contact/ContactComponent";
import { addContact, editContact } from "../../Actions/contactAction";

const count = (contacts, contact, index) => {
  const countContacts = [];
  console.log(contact);
  for (let i = 0; i < contacts.length; i++) {
    const sameName = contacts[i].name === contact.name;
    const sameSecondName = contacts[i].second_name === contact.second_name;
    const sameLastName = contacts[i].last_name === contact.last_name;
    const sameSecondLastName = contacts[i].second_last_name === contact.second_last_name;
    if (sameName && sameSecondName && sameLastName && sameSecondLastName) {
      countContacts.push(contact);
    }
  }
  return countContacts;
}

const duplicatedContacts = (contacts) => {
  let duplicated = [];
  contacts.forEach((contact, index) => {
    const contactDuplicates = count(contacts, contact, index);
    const numberAppeared = contactDuplicates.length;

    if (numberAppeared > 1) {
      contactDuplicates.forEach(c => {
        duplicated[c.id] = c
      });
    }
  });
  duplicated = duplicated.sort((a, b) => a.name.localeCompare(b.name));
  return duplicated;
}

const mapStateToProps = state => ({
  contacts: duplicatedContacts(state.contacts),
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
