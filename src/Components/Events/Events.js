import React from "react";
// import "../../CSS/Events.css";
import Event from "./Event";
import DatePage from "../../util/DatePage";
import moment from "moment";

export default class Events extends React.Component {
  state = {
    clicked: false,
    title: "",
    description: "",
    start: "",
    end: ""
  };
  ////////////////// CONDITIONAL RENDERING //////////////////
  renderEvents = () => {
    if (this.props.events.length > 0) {
      return (
        <>
          <h3>Upcoming Events</h3>
          {this.props.events
            .filter(events => moment(events.start) > moment())
            .map(event => (
              <Event
                event={event}
                onDeleteEventClick={this.props.onDeleteEventClick}
              />
            ))}
        </>
      );
    } else {
      return (
        <>
          <h3>You don't have any events yet....</h3>
          <h4>Get Planning Now!</h4>
        </>
      );
    }
  };

  renderNewForm = () => {
    if (this.state.clicked) {
      return (
        <div className="popOut">
          <div className="popOutCenter">
            <form className="form" onSubmit={this.handleSubmit}>
              <button onClick={this.handleClick}>Back</button>
              <p>Event Name: </p>
              <input
                onChange={this.handleChange}
                id="title"
                type="title"
                name="title"
                value={this.state.title}
              />
              <p>Tell Me More: </p>
              <input
                onChange={this.handleChange}
                id="description"
                type="description"
                name="description"
                value={this.state.description}
              />
              <div className="datesHolderOne">
                <div className="datesOne">
                  <p>Start Day: </p>
                  <DatePage
                    date={new Date()}
                    handleDateChange={this.handleDateChange}
                    name={"start"}
                  />
                  <p>End Day: </p>
                  <DatePage
                    date={new Date()}
                    handleDateChange={this.handleDateChange}
                    name={"end"}
                  />
                </div>
              </div>
              <input className="submitButton" type="submit" name="submit" />
            </form>
          </div>
        </div>
      );
    }
  };
  ////////////////////// HANDLE CLICKS //////////////////////
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleDateChange = (date, name) => {
    this.setState({
      [name]: date
    });
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const event = {
      event: {
        flatmate_id: this.props.user.id,
        title: this.state.title,
        description: this.state.description,
        start: this.state.start,
        end: this.state.end
      }
    };
    this.props.onAddEventClick(event);
    this.setState({
      clicked: !this.state.clicked
    });

    e.target.reset();
  };
  ////////////////////// HANDLE CLICKS //////////////////////

  render() {
    return (
      <div className="Events">
        {this.renderEvents()}
        <button className="notesAndEventsButton" onClick={this.handleClick}>
          Make Plans
        </button>
        {this.renderNewForm()}
      </div>
    );
  }
}
