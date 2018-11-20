import { connect } from 'react-redux';
import CreateGroupComponent from "../../Components/Group/CreateGroupComponent";
import { addGroup, editGroup, deleteGroup, updateForm } from "../../Actions/groupAction";


const mapStateToProps = state => ({
  groups: state.groups,
  form: state.groups.form,
});

const mapDispatchToProps = dispatch => ({
  addGroup: group => {
    dispatch(addGroup(group))
  },
  editGroup: (id, group) => {
    dispatch(editGroup(id, group))
  },
  deleteGroup: id => {
    dispatch(deleteGroup(id))
  },
  updateForm: group => {
    dispatch(updateForm(group))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupComponent)