const initialState = {
  contacts: [
    // {
    //   id: 0,
    //   sub: 'google-contact|02948184719284712897012',
    //   avatar: '',
    //   name: 'Puribum',
    //   phone: '123123123124241',
    //   favourite: 0,
    // },

    // {
    //   id: 1,
    //   sub: 'google-contact|02948184719284712897012',
    //   avatar: '',
    //   name: 'Zaaam',
    //   phone: '9123893423423',
    //   favourite: 1,
    // },
    // {
    //   id: 2,
    //   sub: 'google-contact|02948184719284712897012',
    //   avatar: '',
    //   name: 'Patatin',
    //   phone: '896332',
    //   favourite: 0,
    // },
    // {
    //   id: 3,
    //   sub: 'google-contact|02948184719284712897012',
    //   avatar: '',
    //   name: 'Blablin',
    //   phone: '398472398',
    //   favourite: 1,
    // },
    // {
    //   id: 4,
    //   sub: 'google-contact|02948184719284712897012',
    //   avatar: '',
    //   name: 'Pepito',
    //   phone: '3453423',
    //   favourite: 1,
    // },
  ],
  form: {
    create: {
      avatar: '',
      name: '',
      phone: '',
      favourite: '',
    }
  },
}

// this is not a class, but an object, it's name should be start with lowercase

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

    // case 'SELECT_CONTACT':
    //   return {
    //     contacts: [...state.contacts],
    //     selectedContact: state.contacts.filter(c => c.id === action.payload)[0]
    //   };

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
    default:
      return state
  };
}