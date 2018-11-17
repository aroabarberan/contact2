import { connect } from 'react-redux';
import Group from "../../Components/Group/GroupComponent";

// same as ListItemCompositionContainer (duplicated parameter)
const mapStateToProps = state => ({
  groups: state.groups,
  form : state.groups.form,
})

// this is not a class, but an object, it's name should be start with lowercase
export default connect(mapStateToProps)(Group)