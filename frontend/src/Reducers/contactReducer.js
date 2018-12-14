const initialState = {
  contacts: [
  ],
  favourites: [],
  form: {
    create: {
      last_name: '',
      name: '',
      // phones: [],
      favourite: '',
    }
  },
}

const emptyContact = {
  groups: [],
  phones: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, { ...emptyContact, ...action.payload }]
      };

    case 'ADD_CONTACTS':
      return {
        ...state,
        contacts: [...state.contacts, ...action.payload.map(c => ({ ...emptyContact, ...c }))]
      };

    case 'EDIT_CONTACT':
      let contact = action.payload;
      const newContacts = [...state.contacts];
      const indexOfContact = state.contacts.map(c => c.id).indexOf(contact.id);
      if (indexOfContact >= 0) {
        contact = { ...state.contacts[indexOfContact], ...contact };
        newContacts.splice(indexOfContact, 1, contact);
      }
      return {
        ...state,
        contacts: newContacts,
      }

    case 'ADD_CONTACT_GROUP':
      const addContact = { ...action.payload.contact };
      const allContacts = [...state.contacts];
      addContact.groups = [...addContact.groups, action.payload.group];
      const indexAddContact = state.contacts.map(c => c.id).indexOf(addContact.id);
      allContacts.splice(indexAddContact, 1, addContact);
      return {
        ...state,
        contacts: allContacts,
      }

    case 'REMOVE_CONTACT_GROUP':
      const contactToRemoveGroup = { ...action.payload.contact };
      contactToRemoveGroup.groups = [...contactToRemoveGroup.groups].filter(g => g.id !== action.payload.group.id);
      const newContacts2 = [...state.contacts];
      const indexToRemoveContact = state.contacts.map(c => c.id).indexOf(contactToRemoveGroup.id);
      newContacts2.splice(indexToRemoveContact, 1, contactToRemoveGroup);
      return {
        ...state,
        contacts: newContacts2,
      }

    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((c => c.id !== action.payload))
      };

    case 'UNSELECT_CONTACT':
      return {
        contacts: [...state.contacts],
      };

    case 'SORT_CONTACTS_BY_FAVOURITE':
      let contacts = [...state.contacts]
      return {
        contacts: contacts.sort((a, b) => (a.favourite > b.favourite) ? 1 : 0),
      };

    case 'UPDATE_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          create: {
            ...state.form.create,
            ...action.payload,
          }
        },
      }
      case 'RESET_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          create: {
            last_name: '',
            name: '',
            phone: '',
            favourite: '',
          }
        },
      }
    default:
      return state
  }
}
