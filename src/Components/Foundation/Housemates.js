import React, { Component } from "react";

class Flat extends Component {
  render() {
    const {
      name,
      address_one,
      address_two,
      city,
      postcode,
      flatmates
    } = this.props.flat;

    return (
      <>
        <h3>Your Housemates</h3>
        <div className="flatHousemates">
          {flatmates.map(flatmate => (
            <span className="flatmate">
              <p>{flatmate.first_name}</p>
              {flatmate.avatar ? (
                <img src={flatmate.avatar} alt="flatmates avatar" />
              ) : null}
            </span>
          ))}
        </div>
      </>
    );
  }
}

export default Flat;
