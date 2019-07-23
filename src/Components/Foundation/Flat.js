import React, { Component } from "react";
import "../../CSS/FlipFlat.css";

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
            <form className="address">
              <input placeholder={name}></input>
              <input placeholder="Address Line One"></input>
              <input placeholder="Address Line Two"></input>
              <input placeholder="City"></input>
              <input placeholder="Postcode"></input>
              <input type="submit"></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Flat;
