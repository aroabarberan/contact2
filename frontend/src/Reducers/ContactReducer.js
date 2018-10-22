const initialState = {
    contacts: [
      {
        name: '',
        phone: '',
      },
    ],
    form: {
      name: '',
      phone: '',
    },
  }
  
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_CONTACT':
        return {
          ...state,
          contacts: [...state.contacts, action.payload]
        }
      case 'UPDATE_FORM':
        return {
          ...state,
          form: [...state.form, action.payload]
        }
      default:
        return state
    }
  }