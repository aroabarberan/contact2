const initialState = {
  groups: [
    {},
  ],
  form: {
    create: {
      name: '',
    }
  },
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_GROUP':
      return {
        ...state,
        groups: [...state.groups, action.payload]
      };

    case 'EDIT_GROUP':
      return {
        ...state,
        groups: [...state.groups.map((group => {
          if (group.id === action.payload) group = action.value;
          return group
        }))],
      };

    case 'DELETE_GROUP':
      return {
        ...state,
        groups: state.groups.filter((g => g.id !== action.payload))
      };

    case 'UPDATE_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          create: {
            ...state.form.create,
            ...action.payload,
          }
        },
      };
    default:
      return state
  };
}