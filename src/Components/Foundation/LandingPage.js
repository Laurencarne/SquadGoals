import React, { Component } from "react";
import Dashboard from "./Dashboard";
import Home from "./Home";
// App CSS for styling

class LandingPage extends Component {
  render() {
    return (
      <>
        {this.props.logged_in ? (
          <Dashboard
            user={this.props.user}
            notes={this.props.notes}
            onAddNoteClick={this.props.onAddNoteClick}
            onDeleteNoteClick={this.props.onDeleteNoteClick}
          />
        ) : (
          <>
            <Home />
          </>
        )}
      </>
    );
  }
}

export default LandingPage;
