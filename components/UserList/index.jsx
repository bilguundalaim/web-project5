import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import { cs142models } from "../../modelData/photoApp";

/**
 * Define UserList, a React component of CS142 Project 5.
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: cs142models.userListModel(),
    };

    console.log(this.state.users);
  }

  render() {
    return (
      <div>
        <List component="nav">
          {this.state.users.map((user) => {
            const fullName = `${user.first_name} ${user.last_name}`;
            return (
              <div key={user._id}>
                <ListItem button component={Link} to={`/users/${user._id}`}>
                  <ListItemText primary={fullName}/>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    );
  }
}

export default UserList;
