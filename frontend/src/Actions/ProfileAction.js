// this is not a class, but an object, it's name should start with lowercase

export const  saveProfile = profile => ({
  type: 'SAVE_PROFILE',
  payload: profile
})
