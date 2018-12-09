export const addPhone = phone => ({
  type: 'ADD_PHONE',
  payload: phone,
});

export const editPhone = (id, phone) => ({
  type: 'EDIT_PHONE',
  payload: id,
  value: phone
});

export const deletePhone = id => ({
  type: 'DELETE_PHONE',
  payload: id,
});
