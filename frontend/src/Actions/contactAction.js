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

export const updateForm = contact => ({
  type: 'UPDATE_FORM',
  payload: contact,
});
export const resetForm = () => ({
  type: 'RESET_FORM',
})