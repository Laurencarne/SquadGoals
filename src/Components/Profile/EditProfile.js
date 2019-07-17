import React, { Component } from "react";
import "../../CSS/EditProfile.css";
import DatePage from "../../util/DatePage";

class EditProfile extends Component {
  state = {
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    move_in: this.props.user.move_in,
    birthday: this.props.user.birthday,
    rent_due: this.props.user.rent_due,
    electricity_due: this.props.user.electricity_due,
    water_due: this.props.user.water_due,
    gas_due: this.props.user.gas_due
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

  render() {
    return (
      <div className="popOut">
        <div className="popOutCenter">
          <form className="form" onSubmit={this.handleSubmit}>
            <button onClick={this.props.handleClick}>Back</button>
            <p>First Name: </p>
            <input
              onChange={this.handleChange}
              id="first_name"
              type="first_name"
              name="first_name"
              value={this.state.first_name}
            />
            <p>Last Name: </p>
            <input
              onChange={this.handleChange}
              id="last_name"
              type="last_name"
              name="last_name"
              value={this.state.last_name}
            />
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
            <p> Due Dates </p>
            <div className="datesHolderOne">
              <div className="datesOne">
                <label htmlFor="rent_due">Rent</label>
                <input
                  className="numberInput"
                  onChange={this.handleChange}
                  id="rent_due"
                  type="number"
                  name="rent_due"
                  value={this.state.rent_due}
                />
              </div>
              <div className="datesTwo">
                <label htmlFor="electricity_due">Electricity</label>
                <input
                  className="numberInput"
                  onChange={this.handleChange}
                  id="electricity_due"
                  type="number"
                  name="electricity_due"
                  value={this.state.electricity_due}
                />
              </div>
            </div>
            <div className="datesHolderTwo">
              <div className="datesThree">
                <label htmlFor="water_due">Water</label>
                <input
                  className="numberInput"
                  onChange={this.handleChange}
                  id="water_due"
                  type="number"
                  name="water_due"
                  value={this.state.water_due}
                />
              </div>
              <div className="datesFour">
                <label htmlFor="gas_due">Gas</label>
                <input
                  className="numberInput"
                  onChange={this.handleChange}
                  id="gas_due"
                  type="number"
                  name="gas_due"
                  value={this.state.gas_due}
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
