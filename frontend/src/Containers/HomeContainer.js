import { connect } from 'react-redux';
import Home from "../Components/HomeComponent";
import { saveProfile } from "../Actions/ProfileAction";
import { addContact } from "../Actions/ContactAction";

const mapStateToProps = state => ({
  profile: state.profile,
  contacts: state.contacts,
  form : state.contacts.form,
  sub: state.contacts.sub,
  name: state.contacts.name,
  phone: state.contacts.phone,
  favourite: state.contacts.favourite,

})

const mapDispatchToProps = dispatch => ({
  addContact: contact => {
    dispatch(addContact(contact))
  },
  saveProfile: profile => {
    dispatch(saveProfile(profile))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)