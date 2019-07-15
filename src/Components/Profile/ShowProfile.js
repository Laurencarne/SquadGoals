import React, { Component } from "react";

class ShowProfile extends Component {
  render() {
    return (
      <div className="pageRight">
        <button onClick={this.props.handleClick}>Edit</button>
        <h4>
          Name: {this.props.user.first_name} {this.props.user.last_name}
        </h4>
        <h4>
          Birthday:{" "}
          {this.props.user.birthday
            ? this.props.user.birthday
            : "Please update your birthday"}
        </h4>
        <h4>
          Move In Date:{" "}
          {this.props.user.move_in
            ? this.props.user.move_in
            : " Please update your move in date"}
        </h4>
        <h4>
          Rent Due:{" "}
          {this.props.user.rent_due
            ? this.props.user.rent_due
            : " Please update your rent due date"}
        </h4>
        <h4>
          Electricity Due:{" "}
          {this.props.user.electricity_due
            ? this.props.user.electricity_due
            : " Please update your electricity bill date"}
        </h4>
        <h4>
          Water Due:{" "}
          {this.props.user.water_due
            ? this.props.user.water_due
            : " Please update your water bill date"}
        </h4>
        <h4>
          Gas Due:{" "}
          {this.props.user.gas_due
            ? this.props.user.gas_due
            : " Please update your gas bill date"}
        </h4>
      </div>
    );
  }
}

export default ShowProfile;
