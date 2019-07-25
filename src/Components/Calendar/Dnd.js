import React, { Component } from "react";
import api from "../../util/api";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
moment.locale("en-GB");

let eventsArray = [];

class Dnd extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      arrayEvents: []
    };
  }
  componentDidMount() {
    api.getEvents().then(events => this.setState({ events }));
    this.getNewData();
  }

  getNewData = () => {
    eventsArray = this.state.events.map(event => ({
      id: event.id,
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      desc: event.desc,
      title: event.title,
      allDay: true,
      id: event.flatmate_id
    }));
    {
      console.log(eventsArray);
    }
  };

  render() {
    return (
      <div>
        {this.getNewData()}
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
}
export default Dnd;
