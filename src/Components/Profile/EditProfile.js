import React, { Component } from "react";

class EditProfile extends Component {
  handleSubmit = e => {
    e.preventDefault();
    let updatedUser = {
      first_name: e.target[0].value,
      last_name: e.target[1].value,
      move_in: e.target[2].value,
      rent_due: e.target[3].value,
      electricity_due: e.target[4].value,
      water_due: e.target[5].value,
      gas_due: e.target[6].value
    };
    console.log(updatedUser);
    // this.props.updateProfile(profile)
  };
  render() {
    return (
      <div className="pageRight">
        <button onClick={this.props.handleClick}>Back</button>

        <form className="form" onSubmit={this.handleSubmit}>
          <label htmlFor="first_name">First Name:</label>
          <input
            onChange={this.props.handleChange}
            id="first_name"
            type="first_name"
            name="first_name"
            value={this.props.user.first_name}
          />
          <label htmlFor="last_name">Last Name:</label>
          <input
            onChange={this.props.handleChange}
            id="last_name"
            type="last_name"
            name="last_name"
            value={this.props.user.last_name}
          />
          <label htmlFor="move_in">Move in Date:</label>
          <input
            onChange={this.props.handleChange}
            id="move_in"
            type="date"
            name="move_in"
            value={this.props.user.move_in}
          />
          <label htmlFor="rent_due">Rent Due Date:</label>
          <input
            onChange={this.props.handleChange}
            id="rent_due"
            type="number"
            name="rent_due"
            value={this.props.user.rent_due}
          />
          <label htmlFor="electricity_due">Electricity Bill Date:</label>
          <input
            onChange={this.props.handleChange}
            id="electricity_due"
            type="number"
            name="electricity_due"
            value={this.props.user.electricity_due}
          />
          <label htmlFor="water_due">Water Bill Date:</label>
          <input
            onChange={this.props.handleChange}
            id="water_due"
            type="number"
            name="water_due"
            value={this.props.user.water_due}
          />
          <label htmlFor="gas_due">Gas Due Date:</label>
          <input
            onChange={this.props.handleChange}
            id="gas_due"
            type="number"
            name="gas_due"
            value={this.props.user.gas_due}
          />
          <input className="submitButton" type="submit" name="submit" />
        </form>
      </div>
    );
  }
}

export default EditProfile;
