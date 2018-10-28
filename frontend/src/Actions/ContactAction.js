export const addContact = contact => ({
  type: 'ADD_CONTACT',
  payload: contact,
});

export const deleteContact = id => ({
  type: 'DELETE_CONTACT',
  payload: id,
});

export const updateForm = contact => ({
  type: 'UPDATE_FORM',
  payload: contact,
});