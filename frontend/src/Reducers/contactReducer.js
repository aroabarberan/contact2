const initialState = []

const emptyContact = {
  id: '',
  nickname: '',
  name: '',
  second_name: '',
  last_name: '',
  second_last_name: '',
  direction: '',
  city: '',
  province: '',
  job: '',
  favourite: 0,
  groups: [],
  phones: [],
  emails: [],
  notes: [],
  created_at: '',
  updated_at: '',
  user: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return [...state, { ...emptyContact, ...action.payload }];

    case 'ADD_CONTACTS':
      return [...state, ...action.payload.map(c => ({ ...emptyContact, ...c }))];

    case 'EDIT_CONTACT':
      let contact = action.payload;
      const newContacts = [...state];
      const indexOfContact = state.map(c => c.id).indexOf(contact.id);
      if (indexOfContact >= 0) {
        contact = { ...emptyContact, ...state[indexOfContact], ...contact };
        contact.phones = [...contact.phones];
        contact.emails = [...contact.emails];
        contact.notes = [...contact.notes];
        newContacts.splice(indexOfContact, 1, contact);
      }
      return newContacts;

    case 'ADD_CONTACT_GROUP':
      const addContact = { ...action.payload.contact };
      const allContacts = [...state];
      addContact.groups = [...addContact.groups, action.payload.group];
      const indexAddContact = state.map(c => c.id).indexOf(addContact.id);
      allContacts.splice(indexAddContact, 1, addContact);
      return allContacts;

    case 'REMOVE_CONTACT_GROUP':
      const contactToRemoveGroup = { ...action.payload.contact };
      contactToRemoveGroup.groups = [...contactToRemoveGroup.groups].filter(g => g.id !== action.payload.group.id);
      const newContacts2 = [...state];
      const indexToRemoveContact = state.map(c => c.id).indexOf(contactToRemoveGroup.id);
      newContacts2.splice(indexToRemoveContact, 1, contactToRemoveGroup);
      return newContacts2;

    case 'DELETE_CONTACT':
      return state.filter((c => c.id !== action.payload));

    case 'UNSELECT_CONTACT':
      return state;

    case 'SORT_CONTACTS_BY_FAVOURITE':
      let contacts = [...state]
      return contacts.sort((a, b) => (a.favourite > b.favourite) ? 1 : 0);

    case 'UPDATE_FORM':
      return state;
      case 'RESET_FORM':
      return state;
    default:
      return state
  }
}
