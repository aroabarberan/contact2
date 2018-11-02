const initialState = {
  contacts: [
    {
      id: 0,
      sub: 'google-contact|02948184719284712897012',
      name: 'Patatin',
      phone: '123123123124241',
    },
    // {
    //   id: 1,
    //   sub: 'google-contact|02948184719284712897012',
    //   name: 'Bublin',
    //   phone: '3434543534',
    // },
    // {
    //   id: 2,
    //   sub: 'google-contact|02948184719284712897012',
    //   name: 'Puribum',
    //   phone: '988891231',
    // },
    // {
    //   id: 3,
    //   sub: 'google-contact|02948184719284712897012',
    //   name: 'Cachipum',
    //   phone: '6967867123123241',
    // },
    // {
    //   id: 4,
    //   sub: 'google-contact|02948184719284712897012',
    //   name: 'Blablin',
    //   phone: '000123239894241',
    // },
  ],
  form: {
    sub: '',
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
      };

    case 'EDIT_CONTACT':
      return {
        contacts: [...state.contacts.map((c => {
          if (c.id === action.payload) c = action.value
          return c
        }))],
      };

    case 'DELETE_CONTACT':
      fetch('http://localhost:3010/api/contacts/' + action.payload, { method: "DELETE" })
        .catch(console.log);
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
        form: [...state.form, action.payload]
      };

    default:
      return state
  };
}