import React, { Component } from "react";
import Notes from "../Notes/Notes";
import date from "../../util/Date";

class Dashboard extends Component {
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
                <h3>Move in Date: {move_in} </h3>
              ) : (
                <h3>Please Update you Profile to see Bill Information.</h3>
              )}
              <h4>
                Rent Due:{" "}
                {rent_due
                  ? date.getDueDate(rent_due) +
                    " " +
                    date.getDueDateMonth(rent_due)
                  : " Please update your rent due date"}
              </h4>
              <h4>
                Electricity Due:{" "}
                {electricity_due
                  ? date.getDueDate(electricity_due) +
                    " " +
                    date.getDueDateMonth(electricity_due)
                  : " Please update your electricity bill date"}
              </h4>
              <h4>
                Water Due:{" "}
                {water_due
                  ? date.getDueDate(water_due) +
                    " " +
                    date.getDueDateMonth(water_due)
                  : " Please update your water bill date"}
              </h4>
              <h4>
                Gas Due:{" "}
                {gas_due
                  ? date.getDueDate(gas_due) +
                    " " +
                    date.getDueDateMonth(gas_due)
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
