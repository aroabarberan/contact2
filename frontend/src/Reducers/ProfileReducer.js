const initialState = {
  profile: [
    {
      sub: '',
      nickname: '',
      name: '',
      picture: '',
      updated_at: '',
      token: '',
    },
  ],

}

// this is not a class, but an object, it's name should be start with lowercase
export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_PROFILE':
      return {
        ...state,
        profile: [...state.profile, action.payload]
      }
    default:
      return state
  }
}