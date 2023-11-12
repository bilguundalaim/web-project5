import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of CS142 Project 5.
 */
class UserPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: null,
      firstname: null,
      lastname: null,
      currentPhotoIndex: 0,
      advancedFeature: false,
    };
  }

  getJsonData(callback) {
    // const jsonData = window.cs142models.photoOfUserModel(this.props.match.params.userId);
    // this.setState({ jsonData: jsonData }, callback);
    const photos = fetchModel(
      `http://localhost:3000/photosOfUser/${this.props.match.params.userId}`
    );
    const user = fetchModel(
      `http://localhost:3000/user/${this.props.match.params.userId}`
    );

    Promise.all([photos, user])
      .then(([photosResponse, userResponse]) => {
        this.setState(
          {
            jsonData: photosResponse.data,
            firstname: userResponse.data.first_name,
            lastname: userResponse.data.last_name,
          },
          callback
        );
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }

  componentDidMount() {
    this.getJsonData(() => {
      this.props.callback(
        `${this.state.firstname} ${this.state.lastname}`,
        "photo"
      );
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.advancedFeature !== this.props.advancedFeature) {
      this.setState({ advancedFeature: this.props.advancedFeature });
    }
  }

  componentWillUnmount() {
    this.props.callback("Welcome");
  }

  handlePrevButtonClick = () => {
    const prevIndex = this.state.currentPhotoIndex - 1;
    this.setState({ currentPhotoIndex: prevIndex });
  };

  handleNextButtonClick = () => {
    const nextIndex = this.state.currentPhotoIndex + 1;
    this.setState({ currentPhotoIndex: nextIndex });
  };

  render() {
    const { jsonData, currentPhotoIndex, advancedFeature } = this.state;

    return (
      <div className="container">
        {advancedFeature
          ? jsonData &&
            jsonData.length > 0 && (
              <div>
                <Paper className="photo">
                  <div>
                    <img
                      src={`../../images/${jsonData[currentPhotoIndex].file_name}`}
                      alt=""
                    />
                    <Typography variant="body2" color="textSecondary">
                      {jsonData[currentPhotoIndex].date_time.slice(0, 10)}
                    </Typography>
                  </div>
                  <div>
                    {jsonData[currentPhotoIndex].comments ? (
                      jsonData[currentPhotoIndex].comments.map((comment) => {
                        const commentId = comment._id;
                        const userComment = comment.comment;
                        const commentDatetime = comment.date_time.slice(0, 10);
                        const username = `${comment.user.first_name} ${comment.user.last_name}`;
                        return (
                          <div key={commentId} className="comment">
                            <div>
                              <Typography
                                variant="subtitle1"
                                component={Link}
                                to={`/users/${comment.user._id}`}
                              >
                                {username}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {commentDatetime}
                              </Typography>
                            </div>
                            <Typography variant="body1">
                              {userComment}
                            </Typography>
                          </div>
                        );
                      })
                    ) : (
                      <Typography variant="body1">
                        There is no comment.
                      </Typography>
                    )}
                  </div>
                </Paper>
                <div className="button-container">
                  {jsonData.length > 1 && currentPhotoIndex !== 0 && (
                    <Button
                      variant="contained"
                      onClick={this.handlePrevButtonClick}
                    >
                      PREVIOUS
                    </Button>
                  )}
                  {jsonData.length > 1 &&
                    currentPhotoIndex !== jsonData.length - 1 && (
                      <Button
                        style={{ marginLeft: "auto" }}
                        variant="contained"
                        onClick={this.handleNextButtonClick}
                      >
                        NEXT
                      </Button>
                    )}
                </div>
              </div>
            )
          : this.state.jsonData &&
            this.state.jsonData.map((photo) => {
              const id = photo._id;
              const url = `../../images/${photo.file_name}`;
              const datetime = photo.date_time.slice(0, 10);
              const comments = photo.comments;
              return (
                <Paper key={id} className="photo">
                  <div>
                    <img src={url} alt="" />
                    <Typography variant="body2" color="textSecondary">
                      {datetime}
                    </Typography>
                  </div>
                  <div>
                    {comments ? (
                      comments.map((comment) => {
                        const commentId = comment._id;
                        const userComment = comment.comment;
                        const commentDatetime = comment.date_time.slice(0, 10);
                        const username = `${comment.user.first_name} ${comment.user.last_name}`;
                        return (
                          <div key={commentId} className="comment">
                            <div>
                              <Typography
                                variant="subtitle1"
                                component={Link}
                                to={`/users/${comment.user._id}`}
                              >
                                {username}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {commentDatetime}
                              </Typography>
                            </div>
                            <Typography variant="body1">
                              {userComment}
                            </Typography>
                          </div>
                        );
                      })
                    ) : (
                      <Typography variant="body1">
                        There is no comment.
                      </Typography>
                    )}
                  </div>
                </Paper>
              );
            })}
      </div>
    );
  }
}

export default UserPhotos;
