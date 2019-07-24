import React, { Component } from "react";
import "../../CSS/EditProfile.css";
import DatePage from "../../util/DatePage";
import moment from "moment";

class EditProfile extends Component {
  state = {
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    move_in: this.props.user.move_in ? this.props.user.move_in : new Date(),
    birthday: this.props.user.birthday ? this.props.user.birthday : new Date(),
    rent_due: this.props.user.rent_due ? this.props.user.rent_due : new Date(),
    electricity_due: this.props.user.electricity_due
      ? this.props.user.electricity_due
      : new Date(),
    water_due: this.props.user.water_due
      ? this.props.user.water_due
      : new Date(),
    gas_due: this.props.user.gas_due ? this.props.user.gas_due : new Date()
  };

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

  handleSubmit = e => {
    e.preventDefault();
    let profile = {
      flatmate: {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        birthday: this.state.birthday,
        move_in: this.state.move_in,
        rent_due: this.state.rent_due,
        electricity_due: this.state.electricity_due,
        water_due: this.state.water_due,
        gas_due: this.state.gas_due
      }
    };
    this.props.updateProfile(profile);
    this.props.handleClick();
  };

  setDateAsCurrentMonth = date => {
    let currentMonth = moment().month();
    let currentYear = moment().year();
    return moment(date)
      .months(currentMonth)
      .years(currentYear)._d;
  };

  render() {
    return (
      <div className="popOut">
        <div className="popOutCenter">
          <form className="form" onSubmit={this.handleSubmit}>
            <button
              type="button"
              className="profileBackButton"
              onClick={this.props.handleClick}
            >
              Back
            </button>
            <p>First Name: </p>
            <input
              onChange={this.handleChange}
              id="first_name"
              type="first_name"
              name="first_name"
              placeholder={this.state.first_name}
            />
            <p>Last Name: </p>
            <input
              onChange={this.handleChange}
              id="last_name"
              type="last_name"
              name="last_name"
              placeholder={this.state.last_name}
            />
            <div className="datesHolderOne">
              <div className="datesOne">
                <p>Birthday: </p>
                <DatePage
                  date={new Date(this.state.birthday)}
                  handleDateChange={this.handleDateChange}
                  name={"birthday"}
                />
                <p>Move In Date: </p>
                <DatePage
                  date={new Date(this.state.move_in)}
                  handleDateChange={this.handleDateChange}
                  name={"move_in"}
                />
                <p>Electricity Date: </p>
                <DatePage
                  date={this.setDateAsCurrentMonth(this.state.electricity_due)}
                  handleDateChange={this.handleDateChange}
                  name={"electricity_due"}
                />
              </div>
              <div className="datesOne">
                <p>Rent Date: </p>
                <DatePage
                  date={this.setDateAsCurrentMonth(this.state.rent_due)}
                  handleDateChange={this.handleDateChange}
                  name={"rent_due"}
                />

                <p>Water Date: </p>
                <DatePage
                  date={this.setDateAsCurrentMonth(this.state.water_due)}
                  handleDateChange={this.handleDateChange}
                  name={"water_due"}
                />
                <p>Gas Date: </p>
                <DatePage
                  date={this.setDateAsCurrentMonth(this.state.gas_due)}
                  handleDateChange={this.handleDateChange}
                  name={"gas_due"}
                />
              </div>
            </div>
            <input className="submitButton" type="submit" name="submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;
