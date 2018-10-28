const initialState = {
  contacts: [
    {
      sub: '',
      name: '',
      phone: '',
    },
  ],
  form: {
    create: {
      sub: '',
      name: '',
      phone: '',
    }
  },
}


export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
      
    case 'DELETE_NOTE':
      return {
        contacts: state.contacts.filter((c => c.id !== action.payload))
      };

    case 'UPDATE_FORM':
      return {
        ...state,
        form: [...state.form, action.payload]
      };
      
    default:
      return state
  };
}