const initialState = {
  contactgroups: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT_GROUP':
      return {
        ...state,
        contactgroups: [...state.contactgroups, action.payload]
      };

    case 'DELETE_CONTACT_GROUP':
      return {
        ...state,
        contactgroups: state.contactgroups.filter((cg => cg.id !== action.payload))
      };

    default:
      return state
  };
}