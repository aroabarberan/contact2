const initialState = {
  profile: [
    {
      sub: '',
      nickname: '',
      name: '',
      picture: '',
      updated_at: ''
    },
  ],

}

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