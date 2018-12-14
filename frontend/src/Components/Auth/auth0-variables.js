// export const AUTH_CONFIG = {
//   domain: 'bookcontacts.auth0.com',
//   clientId: 'C1r5FLArX05HulvxLJxMqwRkA8be5sCv',
//   clientSecret: 'BTbGssuKoQXujgZHGalMEj8e-jlBwh6i833CUSvjSRN4keM7dXtT7GBoEafS0HYF',
//   callbackUrl: 'http://localhost:3000/callback',
//   // callbackUrl: 'https://contactboard.tk/callback',
//   responseType: 'token id_token',
//   audience: 'https://apibookcontacts',
//   scope: 'openid profile'
// }

export const AUTH_CONFIG = {
  domain: 'contactboard.eu.auth0.com',
  clientId: 'm8iuTfWx5BYpgzJdU51RZL0xWTuUvJHp',
  clientSecret: '4X567sowOeI-OH71ulRHKYJYauI6ryGnmGNmB0E64ovPx4aPw3Y2uqC4y-qVph7V',
  applicationURL: 'https://contactboard.tk',
  callbackUrl: 'https://contactboard.tk/callback',
  responseType: 'token id_token',
  audience: 'https://api.contactboard.tk/',
  scope: 'openid profile'
}

if (process.env && process.env.NODE_ENV === 'development') {
  AUTH_CONFIG.applicationURL = 'http://localhost:3000'
  AUTH_CONFIG.callbackUrl = 'http://localhost:3000/callback'
}
