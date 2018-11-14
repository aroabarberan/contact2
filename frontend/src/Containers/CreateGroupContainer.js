import { connect } from 'react-redux';
import CreateGroup from "../Components/CreateGroupComponent";
import { addGroup, editGroup, updateForm } from "../Actions/GroupAction";


const mapStateToProps = state => ({
  contacts: state.contacts,
  form : state.groups.form,
});

const mapDispatchToProps = dispatch => ({
  addGroup: group => {
    dispatch(addGroup(group))
  },
  editGroup: (id, group) => {
    dispatch(editGroup(id, group))
  },
  updateForm: group => {
    dispatch(updateForm(group))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup)