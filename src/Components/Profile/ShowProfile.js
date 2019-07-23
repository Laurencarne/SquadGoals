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
    const {
      birthday,
      move_in,
      rent_due,
      electricity_due,
      water_due,
      gas_due
    } = this.props.user;
    return (
      <>
        {this.props.user ? (
          <>
            <div className="profileSection">
              <span className="dates">Name: </span>
              <span className="profileText">
                {this.props.user.first_name} {this.props.user.last_name}
              </span>
            </div>
            {birthday ? (
              <div className="profileSection">
                <span className="dates">Birthday: </span>
                <span className="profileText">
                  {moment(this.props.user.birthday).format("dddd Do MMMM YYYY")}
                </span>
              </div>
            ) : (
              <h4>Please update your birthday</h4>
            )}
            {move_in ? (
              <div className="profileSection">
                <span className="dates">Move in Date: </span>
                <span className="profileText">
                  {moment(move_in).format("Do MMMM YYYY")}
                </span>
              </div>
            ) : (
              <h4>Please Update you Profile to see Bill Information.</h4>
            )}
            {rent_due ? (
              <div className="profileSection">
                <span className="dates">Rent Due: </span>
                <span className="profileText">
                  {this.getDueDateMonth(rent_due)}
                </span>
              </div>
            ) : (
              <h4>Please update your rent due date</h4>
            )}
            {electricity_due ? (
              <div className="profileSection">
                <span className="dates">Electricity Due: </span>
                <span className="profileText">
                  {this.getDueDateMonth(electricity_due)}
                </span>
              </div>
            ) : (
              <h4>Please update your electricity bill date</h4>
            )}
            {water_due ? (
              <div className="profileSection">
                <span className="dates">Water Due: </span>
                <span className="profileText">
                  {this.getDueDateMonth(water_due)}
                </span>
              </div>
            ) : (
              <h4>Please update your water bill date</h4>
            )}
            {gas_due ? (
              <div className="profileSection">
                <span className="dates">Gas Due: </span>
                <span className="profileText">
                  {this.getDueDateMonth(gas_due)}
                </span>
              </div>
            ) : (
              <h4>Please update your gas bill date</h4>
            )}
            <button
              className="profileEditButton"
              onClick={this.props.handleClick}
            >
              Edit
            </button>
          </>
        ) : null}
      </>
    );
  }
}

export default ShowProfile;
