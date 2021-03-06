import React, { Component } from "react";
import FlatKey from "./FlatKey";
import { Link } from "react-router-dom";

const navStyle = {
  color: "black",
  textDecoration: "none"
};

class Housemates extends Component {
  state = {
    clicked: false
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  renderFlatKey = () => {
    if (this.state.clicked) {
      return (
        <FlatKey
          flat={this.props.flat}
          handleClick={this.handleClick}
          logged_in={this.props.logged_in}
        />
      );
    }
  };

  render() {
    const { name, flatmates } = this.props.flat;

    return (
      <>
        {this.renderFlatKey()}
        <h3>{name}</h3>
        <div className="flatHousemates">
          {flatmates
            .filter(flatmate => flatmate.id !== this.props.user.id)
            .map(flatmate => (
              <span className="flatmate">
                <p>{flatmate.first_name}</p>
                <img src={flatmate.avatar} alt="flatmates avatar" />
              </span>
            ))}
          <Link style={navStyle} to="/profile">
            <span className="flatmate">
              <p>Me</p>
              <img src={this.props.user.avatar} alt="User Profile" />
            </span>
          </Link>
        </div>
        <button onClick={this.handleClick} className="flatKeyButton">
          Generate Flat Key
        </button>
      </>
    );
  }
}

export default Housemates;
