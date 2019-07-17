import React, { Component } from "react";
import Notes from "./Notes";
import date from "../util/Date";

class Dashboard extends Component {
  renderPage = () => {
    if (this.props.user.first_name) {
      return (
        <div className="page">
          <h1>Dashboard</h1>
          <h2> Welcome back {this.props.user.first_name}</h2>
          <div className="container">
            <div className="pageLeft">
              {this.props.user.move_in ? (
                <h3>Move in Date: {this.props.user.move_in} </h3>
              ) : (
                <h3>Please Update you Profile to see Bill Information.</h3>
              )}
              <h4>
                Rent Due:{" "}
                {this.props.user.rent_due
                  ? date.getDueDate(this.props.user.rent_due) +
                    " " +
                    date.getDueDateMonth(this.props.user.rent_due)
                  : " Please update your rent due date"}
              </h4>
              <h4>
                Electricity Due:{" "}
                {this.props.user.electricity_due
                  ? date.getDueDate(this.props.user.electricity_due) +
                    " " +
                    date.getDueDateMonth(this.props.user.electricity_due)
                  : " Please update your electricity bill date"}
              </h4>
              <h4>
                Water Due:{" "}
                {this.props.user.water_due
                  ? date.getDueDate(this.props.user.water_due) +
                    " " +
                    date.getDueDateMonth(this.props.user.water_due)
                  : " Please update your water bill date"}
              </h4>
              <h4>
                Gas Due:{" "}
                {this.props.user.gas_due
                  ? this.props.user.gas_due
                  : " Please update your gas bill date"}
              </h4>
            </div>
            <div className="pageRight">
              <Notes
                notes={this.props.notes}
                user={this.props.user}
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
