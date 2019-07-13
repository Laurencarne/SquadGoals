import React, { Component } from "react";
import Notes from "./Notes";

class Dashboard extends Component {
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

  ////////////// MONTHS DATA ///////////////////
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

  render() {
    return (
      <div className="page">
        <h1>Dashboard</h1>
        <h2> Welcome back {this.props.user.first_name}</h2>
        <div className="container">
          <div className="dashProfile">
            <h3>Move in Date: {this.props.user.move_in} </h3>
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
          </div>
          <div className="dashNotes">
            <Notes notes={this.props.notes} user={this.props.user} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
