import React from "react";
import { Paper, Typography } from "@mui/material";

import "./styles.css";

/**
 * Define UserPhotos, a React component of CS142 Project 5.
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.jsonData = window.cs142models.photoOfUserModel(this.props.match.params.userId);
    console.log(this.jsonData);
  }

  render() {
    return (
      <div className="container">
        {this.jsonData.map((photo) => {
          const id = photo._id;
          const url = `../../images/${photo.file_name}`;
          const datetime = photo.date_time.slice(0, 10);
          const comments = photo.comments;
          return (
            <Paper key={id} className="photo">
              <div>
                <img src={url} alt="" />
                <Typography variant="body2" color="textSecondary">{datetime}</Typography>
              </div>
              <div>
                {comments ? 
                  comments.map((comment) => {
                    const commentId = comment._id;
                    const userComment = comment.comment;
                    const commentDatetime = comment.date_time.slice(0, 10);
                    const username = `${comment.user.first_name} ${comment.user.last_name}`;
                    return (
                      <div key={commentId} className="comment">
                        <div>
                          <Typography variant="subtitle1">{username}</Typography>
                          <Typography variant="body2" color="textSecondary">{commentDatetime}</Typography>
                        </div>
                        <Typography variant="body1">{userComment}</Typography>
                      </div>
                    );
                  }) :
                  <Typography variant="body1">There is no comment.</Typography> }
              </div>
            </Paper>
          );
        })}
      </div>
    );
  }
}

export default UserPhotos;
