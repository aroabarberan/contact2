import { connect } from 'react-redux';
import GroupComponent from "../../Components/Group/GroupComponent";
import {
  addGroup, editGroup, deleteGroup, updateForm
} from "../../Actions/groupAction";


const mapStateToProps = state => ({
  groups: state.groups,
  form: state.groups.form,
})

const mapDispatchToProps = dispatch => ({
  addGroup: group => {
    dispatch(addGroup(group))
  },
  editGroup: (id, group) => {
    dispatch(editGroup(id, group))
  },
  deleteGroup: (id, group) => {
    dispatch(deleteGroup(id, group))
  },
  updateForm: group => {
    dispatch(updateForm(group))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(GroupComponent)