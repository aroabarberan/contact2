export const addGroup = group => ({
  type: 'ADD_GROUP',
  payload: group,
});

export const editGroup = (id, group) => ({
  type: 'EDIT_GROUP',
  payload: id,
  value: group,
});

export const deleteGroup = id => ({
  type: 'DELETE_GROUP',
  payload: id,
});

export const updateForm = group => ({
  type: 'UPDATE_FORM',
  payload: group,
});