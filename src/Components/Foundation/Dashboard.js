import React, { Component } from "react";
import Notes from "../Notes/Notes";
import Events from "../Events/Events";
import Housemates from "./Housemates";
import "../../CSS/Dashboard.css";
// import date from "../../util/Date";
import moment from "moment";

class Dashboard extends Component {
  getDueDateMonth = date => {
    let currentMonth = moment().month();
    let currentYear = moment().year();
    let setDateAsCurrentMonth = moment(date)
      .months(currentMonth)
      .years(currentYear)._d;

    if (moment() > moment(setDateAsCurrentMonth)) {
      return moment(setDateAsCurrentMonth)
        .months(currentMonth + 1)
        .format("dddd Do MMMM");
    } else if (moment() < moment(setDateAsCurrentMonth)) {
      return moment(setDateAsCurrentMonth).format("dddd Do MMMM");
    }
  };

  renderPage = () => {
    const {
      first_name,
      move_in,
      rent_due,
      electricity_due,
      water_due,
      gas_due,
      flat_id
    } = this.props.user;
    const {
      onAddNoteClick,
      onAddEventClick,
      user,
      events,
      notes,
      onDeleteNoteClick,
      onDeleteEventClick
    } = this.props;

    if (first_name) {
      return (
        <div className="page">
          <div className="container">
            <div className="pageLeft">
              <div className="dashboard">
                {move_in ? (
                  <>
                    <div className="dates">Move in Date</div>
                    <h4>{moment(move_in).format("Do MMMM YYYY")}</h4>
                  </>
                ) : (
                  <h4>Please Update you Profile to see Bill Information.</h4>
                )}
                <div className="dates">Rent Due</div>
                {rent_due ? (
                  <h4>{this.getDueDateMonth(rent_due)}</h4>
                ) : (
                  <h4>Please update your rent due date</h4>
                )}
                <div className="dates">Electricity Due</div>
                {electricity_due ? (
                  <h4>{this.getDueDateMonth(electricity_due)}</h4>
                ) : (
                  <h4>Please update your electricity bill date</h4>
                )}
                <div className="dates">Water Due</div>
                {water_due ? (
                  <h4>{this.getDueDateMonth(water_due)}</h4>
                ) : (
                  <h4>Please update your water bill date</h4>
                )}
                <div className="dates">Gas Due</div>
                {gas_due ? (
                  <h4>{this.getDueDateMonth(gas_due)}</h4>
                ) : (
                  <h4>Please update your gas bill date</h4>
                )}
              </div>
              {flat_id ? (
                <div className="flatDashboard">
                  <Housemates flat={this.props.flat} />
                </div>
              ) : null}
            </div>
            <div className="pageRight">
              <Events
                onAddEventClick={onAddEventClick}
                user={user}
                events={events}
                onDeleteEventClick={onDeleteEventClick}
              />
              <Notes
                user={user}
                notes={notes}
                onAddNoteClick={onAddNoteClick}
                onDeleteNoteClick={onDeleteNoteClick}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>You Must Log In</h1>
        </div>
      );
    }
  };

  render() {
    return <>{this.renderPage()}</>;
  }
}

export default Dashboard;
