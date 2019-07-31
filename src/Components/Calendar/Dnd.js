import React, { Component } from "react";
import api from "../../util/api";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Redirect } from "react-router-dom";

const localizer = momentLocalizer(moment);
moment.locale("en-GB");

let eventsArray = [];

class Dnd extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      arrayEvents: []
    };
  }
  componentDidMount() {
    if (this.props.logged_in && this.props.user) {
      api.getEvents().then(events => this.setState({ events }));
      this.getNewData();
    }
  }

  getNewData = () => {
    eventsArray = this.state.events.map(event => ({
      id: event.id,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      desc: event.desc,
      title: event.title,
      allDay: true,
      flatmateId: event.flatmate_id
    }));
  };

  renderPage = () => {
    if (!this.props.logged_in && this.props.user) {
      return <Redirect to="/" />;
    } else if (this.props.logged_in && this.props.user) {
      return (
        <div>
          <Calendar
            localizer={localizer}
            events={eventsArray}
            startAccessor="start"
            endAccessor="end"
            views={["month", "week", "agenda"]}
            style={{ height: "100vh" }}
          />
        </div>
      );
    }
  };

  render() {
    return <>{this.renderPage()}</>;
  }
}
export default Dnd;
