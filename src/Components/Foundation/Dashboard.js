import React, { Component } from "react";
import Notes from "../Notes/Notes";
import date from "../../util/Date";
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
      gas_due
    } = this.props.user;

    if (first_name) {
      return (
        <div className="page">
          <h1>Dashboard</h1>
          <h2> Welcome back {first_name}</h2>
          <div className="container">
            <div className="pageLeft">
              {move_in ? (
                <h3>Move in Date: {moment(move_in).format("Do MMMM YYYY")} </h3>
              ) : (
                <h3>Please Update you Profile to see Bill Information.</h3>
              )}
              <h4>
                Rent Due:{" "}
                {rent_due
                  ? this.getDueDateMonth(rent_due)
                  : " Please update your rent due date"}
              </h4>
              <h4>
                Electricity Due:{" "}
                {electricity_due
                  ? this.getDueDateMonth(electricity_due)
                  : " Please update your electricity bill date"}
              </h4>
              <h4>
                Water Due:{" "}
                {water_due
                  ? this.getDueDateMonth(water_due)
                  : " Please update your water bill date"}
              </h4>
              <h4>
                Gas Due:{" "}
                {gas_due
                  ? this.getDueDateMonth(gas_due)
                  : " Please update your gas bill date"}
              </h4>
            </div>
            <div className="pageRight">
              <Notes
                user={this.props.user}
                notes={this.props.notes}
                onAddNoteClick={this.props.onAddNoteClick}
                onDeleteNoteClick={this.props.onDeleteNoteClick}
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
