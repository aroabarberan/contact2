import React from 'react';
import { QUERIES } from "../../querys";
import Label from "@material-ui/icons/Label";
import { List, ListItem, ListItemText } from '@material-ui/core';


class Group extends React.Component {

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile, getAccessToken } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });

        fetch(QUERIES.group + this.state.profile.sub,
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
      });
    } else {
      this.setState({ profile: userProfile });
    }
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
                <ListItemText>{group.tag}</ListItemText>
              </ListItem>
            </List>
          );
        })}
      </div>
    );
  }
}

export default Group