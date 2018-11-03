import { connect } from 'react-redux';
import Contact from "../Components/ContactComponet";


const mapStateToProps = state => ({
  contacts: state.contacts,
  sub: state.contacts.sub,
  name: state.contacts.name,
  phone: state.contacts.phone
})

export default connect(mapStateToProps)(Contact)