import React from 'react';
import Edit from '@material-ui/icons/Edit';
import Label from "@material-ui/icons/Label";
import DeleteIcon from '@material-ui/icons/Delete';
import { QUERIES } from "../../querys";
import { List, MenuItem, ListItemText } from '@material-ui/core';


class GroupComponent extends React.Component {
  componentWillMount() {
    const token = this.props.auth.getAccessToken();
    if (this.props.groups.groups.length === 0) {
      fetch(QUERIES.group,
        {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        })
        .then(res => res.json())
        .then(groups => groups.map(group => this.props.addGroup(group)))
        .catch(console.log)
    }
  }
  render() {
    const { groups } = this.props.groups;

    return (
      <div >
        {groups.map((group, i) => {
          return (
            <List key={i}>
              {/* <MenuItem onClick={this.handleOpenEdit}> */}
              <MenuItem>
                <Label />
                <ListItemText>{group.name}</ListItemText>
                {/* <ListItemIcon> */}
                <Edit />
                <DeleteIcon />
                {/* </ListItemIcon > */}
              </MenuItem>
            </List>
          );
        })}
      </div>

    );
  }
}

export default GroupComponent
