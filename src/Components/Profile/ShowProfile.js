import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "../../CSS/Profile.css";
import moment from "moment";

class ShowProfile extends Component {
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

  render() {
    return (
      <>
        {this.props.user ? (
          <div className="pageRight">
            <button className="profileButton" onClick={this.props.handleClick}>
              Edit
            </button>
            <h4>
              Name: {this.props.user.first_name} {this.props.user.last_name}
            </h4>
            <h4>
              Birthday:{" "}
              {this.props.user.birthday
                ? moment(this.props.user.birthday).format("dddd Do MMMM YYYY")
                : "Please update your birthday"}
            </h4>
            <h4>
              Move In Date:{" "}
              {this.props.user.move_in
                ? moment(this.props.user.move_in).format("Do MMMM YYYY")
                : " Please update your move in date"}
            </h4>
            <h4>
              Rent Due:{" "}
              {this.props.user.rent_due
                ? this.getDueDateMonth(this.props.user.rent_due)
                : " Please update your rent due date"}
            </h4>
            <h4>
              Electricity Due:{" "}
              {this.props.user.electricity_due
                ? this.getDueDateMonth(this.props.user.electricity_due)
                : " Please update your electricity bill date"}
            </h4>
            <h4>
              Water Due:{" "}
              {this.props.user.water_due
                ? this.getDueDateMonth(this.props.user.water_due)
                : " Please update your water bill date"}
            </h4>
            <h4>
              Gas Due:{" "}
              {this.props.user.gas_due
                ? this.getDueDateMonth(this.props.user.gas_due)
                : " Please update your gas bill date"}
            </h4>
          </div>
        ) : null}
      </>
    );
  }
}

export default ShowProfile;
