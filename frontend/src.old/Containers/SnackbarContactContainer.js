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

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar)