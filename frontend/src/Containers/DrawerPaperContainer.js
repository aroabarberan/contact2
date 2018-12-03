import { connect } from 'react-redux';
import DrawerPaperComponent from "../Components/DrawerPaperComponent";

const mapStateToProps = state => ({
  contacts: state.contacts,
});


export default connect(mapStateToProps)(DrawerPaperComponent)