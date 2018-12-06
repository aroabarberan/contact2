const initialState = {
  contacts: [
    // {
    //   id: 0,
    //   sub: 'google-contact|02948184719284712897012',
    //   lastName: 'a',
    //   name: 'c',
    //   phone: '123123123124241',
    //   favourite: 0,
    // },
    // {
    //   id: 1,
    //   sub: 'google-contact|02948184719284712897012',
    //   lastName: 'a',
    //   name: 'a',
    //   phone: '123123123124241',
    //   favourite: 1,
    // },
    // {
    //   id: 2,
    //   sub: 'google-contact|02948184719284712897012',
    //   lastName: 'a',
    //   name: 'b',
    //   phone: '123123123124241',
    //   favourite: 1,
    // },
    // {
    //   id: 3,
    //   sub: 'google-contact|02948184719284712897012',
    //   lastName: 'a',
    //   name: 'b',
    //   phone: '123123123124241',
    //   favourite: 1,
    // },
    // {
    //   id: 4,
    //   sub: 'google-contact|02948184719284712897012',
    //   lastName: 'a',
    //   name: 'a',
    //   phone: '123123123124241',
    //   favourite: 0,
    // },
  ],
  favourites: [],
  form: {
    create: {
      avatar: '',
      name: '',
      phones: [],
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
    default:
      return state
  };
}