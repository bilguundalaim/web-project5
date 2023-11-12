import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

import "./styles.css";

/**
 * Define TopBar, a React component of CS142 Project 5.
 */
class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: "Welcome",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.context !== this.props.context) {
      this.setState({ context: this.props.source === "photo" ? `${this.props.context}'s photo` : this.props.context });
    }
  }

  render() {
    return (
      <AppBar className="cs142-topbar-appBar" position="absolute">
        <Toolbar className="toolbar">
          <Typography variant="h5" color="inherit">
            Bilguundalaim
          </Typography>
          <Typography variant="h5" color="inherit">
            {this.state.context}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default TopBar;
