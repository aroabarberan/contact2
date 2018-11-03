const initialState = {
  contacts: [
    {
      id: 0,
      sub: 'google-contact|02948184719284712897012',
      name: 'Patatin',
      phone: '123123123124241',
    },
  ],
  form: {
    create: {
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

    case 'EDIT_CONTACT':
      return {
        contacts: [...state.contacts.map((c => {
          if (c.id === action.payload) c = action.value
          return c
        }))],
      };

    case 'DELETE_CONTACT':
      return {
        contacts: state.contacts.filter((c => c.id !== action.payload))
      };

    // case 'SELECT_CONTACT':
    //   return {
    //     contacts: [...state.contacts],
    //     selectedContact: state.contacts.filter(c => c.id === action.payload)[0]
    //   };

    case 'UNSELECT_CONTACT':
      return {
        contacts: [...state.contacts],
      };

    case 'SORT_CONTACT_BY_NAME':
      let contacts = [...state.contacts]
      return {
        contacts: contacts.sort((a, b) => (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) ? 1 : 0),
      };

    case 'LIST_ALL_CONTACTS':
      return {
        contacts: [...state.contacts],
      };

    case 'LIST_ALL_NAME_CONTACTS':
      return {
        contacts: state.contacts.map(e => e.name),
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
    default:
      return state
  };
}