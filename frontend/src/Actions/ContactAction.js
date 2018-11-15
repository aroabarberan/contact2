// this is not a class, but an object, it's name should start with lowercase
export const addContact = contact => ({
  type: 'ADD_CONTACT',
  payload: contact,
});

export const editContact = (id, contact) => ({
  type: 'EDIT_CONTACT',
  payload: id,
  value: contact
});

export const deleteContact = id => ({
  type: 'DELETE_CONTACT',
  payload: id,
});

export const selectContact = id => ({
  type: 'SELECT_CONTACT',
  payload: id,
});

export const unSelectContact = () => ({
  type: 'UNSELECT_CONTACT',
})

export const sortContactsByFavourite = () => ({
  type: 'SORT_CONTACTS_BY_FAVOURITE',
});

export const listAllContacts = () => ({
  type: 'LIST_ALL_CONTACTS',
});

export const listAllNameOfContacts = () => ({
  type: 'LIST_ALL_NAME_CONTACTS',
});

export const updateForm = contact => ({
  type: 'UPDATE_FORM',
  payload: contact,
});