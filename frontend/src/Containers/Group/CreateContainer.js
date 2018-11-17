import { connect } from 'react-redux';
import CreateGroup from "../../Components/Group/CreateComponent";
import { addGroup, editGroup, deleteGroup, updateForm } from "../../Actions/GroupAction";


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

// this is not a class, but an object, it's name should be start with lowercase
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup)