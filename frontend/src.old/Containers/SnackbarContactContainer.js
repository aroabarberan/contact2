import { connect } from 'react-redux';
import Snackbar from "../Components/SnackbarComponent";
import { saveProfile } from "../Actions/ProfileAction";

const mapStateToProps = state => ({
  profile: state.profile,
})

const mapDispatchToProps = dispatch => ({
  saveProfile: profile => {
    dispatch(saveProfile(profile))
  },
})

// this is not a class, but an object, it's name should be start with lowercase
export default connect(mapStateToProps, mapDispatchToProps)(Snackbar)