import { connect } from 'react-redux';
import ImageAvatars from "../Components/ImageAvatarComponent";
import { saveProfile } from "../Actions/ProfileAction";

const mapStateToProps = state => ({
  profile: state.profile,
})

const mapDispatchToProps = dispatch => ({
  saveProfile: profile => {
    dispatch(saveProfile(profile))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageAvatars)