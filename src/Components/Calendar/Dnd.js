import React, { Component } from "react";
// import events from "./Events";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events
    };
  }

  render() {
    return (
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.props.events}
          style={{ height: "100vh" }}
        />
      </div>
    );
  }
}

export default Dnd;
