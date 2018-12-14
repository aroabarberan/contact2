export const QUERIES = {
  contact: 'https://api.contactboard.tk/contacts/',
  group: 'https://api.contactboard.tk/groups/',
  contactgroup: 'https://api.contactboard.tk/contactgroup/',
  phone: 'https://api.contactboard.tk/phones/',
}

if (process.env && process.env.NODE_ENV === 'development') {
  QUERIES.contact = 'http://localhost:3010/contacts/'
  QUERIES.group = 'http://localhost:3010/groups/'
  QUERIES.contactgroup = 'http://localhost:3010/contactgroup/'
  QUERIES.phone = 'http://localhost:3010/phones/'
}
