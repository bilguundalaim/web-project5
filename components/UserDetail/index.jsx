import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import { cs142models } from "../../modelData/photoApp";

/**
 * Define UserDetail, a React component of CS142 Project 5.
 */
class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetail: null,
    };
  }
  
  getUserDetail = () => {
    const userData = cs142models.userModel(this.props.match.params.userId);
    this.setState({userDetail: userData});
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.getUserDetail();
    }
  }

  componentDidMount() {
    this.getUserDetail();
  }

  render() {
    return (
      <div>
        {this.state.userDetail && 
          Object.entries(this.state.userDetail).map(([key, value]) => {
            return (
              <Typography key={key} variant="body1">
                {`${key}: ${value}`}
              </Typography>
            );
          })}
          {this.state.userDetail && <Button variant="contained" LinkComponent={Link} to={`/photos/${this.state.userDetail._id}`}>PHOTOS</Button>}
      </div>
    );
  }
  
}

export default UserDetail;
