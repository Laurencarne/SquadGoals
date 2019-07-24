import React, { Component } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Home from "./Home";

class LandingPage extends Component {
  render() {
    const {
      onAddEventClick,
      events,
      user,
      notes,
      onAddNoteClick,
      onDeleteNoteClick,
      logged_in,
      onDeleteEventClick,
      flat
    } = this.props;
    return (
      <>
        {logged_in && user ? (
          <Dashboard
            logged_in={logged_in}
            flat={flat}
            onAddEventClick={onAddEventClick}
            onDeleteEventClick={onDeleteEventClick}
            events={events}
            user={user}
            notes={notes}
            onAddNoteClick={onAddNoteClick}
            onDeleteNoteClick={onDeleteNoteClick}
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
