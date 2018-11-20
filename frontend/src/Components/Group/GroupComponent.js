import React from 'react';
import { QUERIES } from "../../querys";
import Label from "@material-ui/icons/Label";
import { List, ListItem, ListItemText } from '@material-ui/core';


class Group extends React.Component {

  componentWillMount() {
    const { getAccessToken } = this.props.auth;

    fetch(QUERIES.group,
      {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + getAccessToken(),
        },
      })
      .then(res => res.json())
      .then(groups => groups.map(group => this.props.addGroup(group)))
      .catch(console.log)
  }

  render() {
    const { groups } = this.props.groups;

    return (
      <div>
        {groups.map((group, i) => {
          return (
            <List key={i}>
              <ListItem>
                <Label />
                <ListItemText>{group.name}</ListItemText>
              </ListItem>
            </List>
          );
        })}
      </div>
    );
  }
}

export default Group