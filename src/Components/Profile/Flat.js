import React, { Component } from "react";
import "../../CSS/FlipFlat.css";

class Flat extends Component {
  state = {
    name: "",
    address_one: "",
    address_two: "",
    city: "",
    postcode: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    let flat = {
      name: this.state.name ? this.state.name : this.props.flat.name,
      address_one: this.state.address_one
        ? this.state.address_one
        : this.props.flat.address_one,
      address_two: this.state.address_two
        ? this.state.address_two
        : this.props.flat.address_two,
      city: this.state.city ? this.state.city : this.props.flat.city,
      postcode: this.state.postcode
        ? this.state.postcode
        : this.props.flat.postcode,
      id: this.props.flat.id
    };

    console.log(flat);
    this.props.updateFlat(flat);
    e.target.reset();
  };

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
      <div className="flipCard">
        <div className="flipCardInner">
          <div className="flipCardFront">
            <div className="address">
              <h3>Your Apartment</h3>
              {name ? <p>{name}</p> : null}
              {address_one ? <p>{address_one}</p> : null}
              {address_two ? <p>{address_two}</p> : null}
              {city ? <p>{city}</p> : null}
              {postcode ? <p>{postcode}</p> : null}
            </div>
          </div>
          <div className="flipCardBack">
            <form onSubmit={this.handleSubmit} className="address">
              <input
                onChange={this.handleChange}
                name="name"
                placeholder="Flat Name"
              ></input>
              <input
                onChange={this.handleChange}
                name="address_one"
                placeholder="Address Line One"
              ></input>
              <input
                onChange={this.handleChange}
                name="address_two"
                placeholder="Address Line Two"
              ></input>
              <input
                onChange={this.handleChange}
                name="city"
                placeholder="City"
              ></input>
              <input
                onChange={this.handleChange}
                name="postcode"
                placeholder="Postcode"
              ></input>
              <input className="addressSubmit" type="submit"></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Flat;
