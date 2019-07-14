import React, { Component } from "react";
import Notes from "./Notes";

class Dashboard extends Component {
  ////////////// MONTHS DATA ///////////////////
  dateWithOrdinalIndicator = date => {
    if (date.endsWith("1") && date !== "11") {
      return date + "st";
    } else if (date.endsWith("2") && date !== "12") {
      return date + "nd";
    } else if (date.endsWith("3") && date !== "13") {
      return date + "rd";
    } else {
      return date + "th";
    }
  };
  getCurrentMonth = () => {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  };
  getDueDate = date => {
    return this.dateWithOrdinalIndicator(date.toString());
  };
  getDueDateMonth = dueDate => {
    if (new Date().getDate() > dueDate) {
      return this.getCurrentMonth()[new Date().getMonth() + 1];
    } else if (new Date().getDate() < dueDate) {
      return this.getCurrentMonth()[new Date().getMonth()];
    }
  };
  ////////////// MONTHS DATA ///////////////////

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
              {this.props.user.rent_due &&
              this.props.user.water_due &&
              this.props.user.electricity_due ? (
                <>
                  <h3>
                    Rent Due: {this.getDueDate(this.props.user.rent_due)}{" "}
                    {this.getDueDateMonth(this.props.user.rent_due)}
                  </h3>
                  <h3>
                    Water Due: {this.getDueDate(this.props.user.water_due)}{" "}
                    {this.getDueDateMonth(this.props.user.water_due)}
                  </h3>
                  <h3>
                    Electricity Due:{" "}
                    {this.getDueDate(this.props.user.electricity_due)}{" "}
                    {this.getDueDateMonth(this.props.user.electricity_due)}
                  </h3>
                </>
              ) : null}
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
