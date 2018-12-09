export const addContactGroup = contactGroup => ({
  type: 'ADD_CONTACT_GROUP',
  payload: contactGroup,
});

export const deleteContactGroup = id => ({
  type: 'DELETE_CONTACT',
  payload: id,
});
