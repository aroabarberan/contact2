const initialState = {
  contacts: [
  ],
  favourites: [],
  form: {
    create: {
      lastName: '',
      name: '',
      // phones: [],
      favourite: '',
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

    case 'EDIT_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts.map((contact => {
          if (contact.id === action.payload) contact = action.value;
          return contact
        }))],
      };

    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((c => c.id !== action.payload))
      };

    case 'UNSELECT_CONTACT':
      return {
        contacts: [...state.contacts],
      };

    case 'SORT_CONTACTS_BY_FAVOURITE':
      let contacts = [...state.contacts]
      return {
        contacts: contacts.sort((a, b) => (a.favourite > b.favourite) ? 1 : 0),
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
      }
      case 'RESET_FORM':
      return {
        ...state,
        form: {
          ...state.form,
          create: {
            lastName: '',
            name: '',
            phone: '',
            favourite: '',
          }
        },
      }
    default:
      return state
  }
}
