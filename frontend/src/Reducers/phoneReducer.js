const initialState = {
  phones: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_PHONE':
      return {
        ...state,
        phones: [...state.phones, action.payload]
      };

    case 'EDIT_PHONE':
      return {
        ...state,
        phones: [...state.phones.map((phone => {
          if (phone.id === action.payload) phone = action.value;
          return phone
        }))],
      };

    case 'DELETE_PHONE':
      return {
        ...state,
        phones: state.phones.filter((phone => phone.id !== action.payload))
      };

    default:
      return state
  }
}
