import { connect } from 'react-redux';
import GroupComponent from "../../Components/Group/GroupComponent";
import { addGroup } from "../../Actions/groupAction";


const mapStateToProps = state => ({
  groups: state.groups,
  form : state.groups.form,
})

const mapDispatchToProps = dispatch => ({
  addGroup: group => {
    dispatch(addGroup(group))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupComponent)