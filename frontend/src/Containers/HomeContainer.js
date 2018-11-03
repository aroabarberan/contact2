import { connect } from 'react-redux';
import Home from "../Components/HomeComponet";
import { addContact} from "../Actions/ContactAction";
import { saveProfile } from "../Actions/ProfileAction";

const mapStateToProps = state => ({
  profile: state.profile,
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