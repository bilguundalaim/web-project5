import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of CS142 Project 5.
 */
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };

    console.log(this.state.users);
  }

  componentDidMount() {
    fetchModel('http://localhost:3000/user/list')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.error('Error fetching user list: ', error);
      });
  }

  render() {
    return (
      <div>
        {this.state.users && (
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
        )}
      </div>
    );
  }
}

export default UserList;
