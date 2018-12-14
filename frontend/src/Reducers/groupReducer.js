const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_GROUP':
      return [...state, action.payload];

    case 'EDIT_GROUP':
      return [...state.map((group => {
          if (group.id === action.payload) group = action.value;
          return group
        }))];

    case 'DELETE_GROUP':
      return state.filter((g => g.id !== action.payload));

    case 'UPDATE_FORM':
      return state;
    default:
      return state;
  }
}
