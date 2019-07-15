import React, { Component } from "react";

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

  handleSubmit = e => {
    e.preventDefault();
    let profile = {
      flatmate: {
        first_name: e.target[0].value,
        last_name: e.target[1].value,
        birthday: e.target[2].value,
        move_in: e.target[3].value,
        rent_due: e.target[4].value,
        electricity_due: e.target[5].value,
        water_due: e.target[6].value,
        gas_due: e.target[7].value
      }
    };
    this.props.updateProfile(profile);
    e.target.reset();
    this.props.handleClick();
  };
  render() {
    return (
      <div className="pageRight">
        <button onClick={this.props.handleClick}>Back</button>

        <form className="form" onSubmit={this.handleSubmit}>
          <label htmlFor="first_name">First Name: </label>
          <input
            onChange={this.handleChange}
            id="first_name"
            type="first_name"
            name="first_name"
            value={this.state.first_name}
          />
          <label htmlFor="last_name">Last Name: </label>
          <input
            onChange={this.handleChange}
            id="last_name"
            type="last_name"
            name="last_name"
            value={this.state.last_name}
          />
          <label htmlFor="birthday">Birthday:</label>
          <input
            onChange={this.handleChange}
            id="birthday"
            type="date"
            name="birthday"
            value={this.state.birthday}
          />
          <label htmlFor="move_in">Move in Date:</label>
          <input
            onChange={this.handleChange}
            id="move_in"
            type="date"
            name="move_in"
            value={this.state.move_in}
          />
          <label htmlFor="rent_due">Rent Due Date:</label>
          <input
            onChange={this.handleChange}
            id="rent_due"
            type="number"
            name="rent_due"
            value={this.state.rent_due}
          />
          <label htmlFor="electricity_due">Electricity Bill Date:</label>
          <input
            onChange={this.handleChange}
            id="electricity_due"
            type="number"
            name="electricity_due"
            value={this.state.electricity_due}
          />
          <label htmlFor="water_due">Water Bill Date:</label>
          <input
            onChange={this.handleChange}
            id="water_due"
            type="number"
            name="water_due"
            value={this.state.water_due}
          />
          <label htmlFor="gas_due">Gas Due Date:</label>
          <input
            onChange={this.handleChange}
            id="gas_due"
            type="number"
            name="gas_due"
            value={this.state.gas_due}
          />
          <input className="submitButton" type="submit" name="submit" />
        </form>
      </div>
    );
  }
}

export default EditProfile;
