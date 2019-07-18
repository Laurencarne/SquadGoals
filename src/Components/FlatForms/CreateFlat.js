import React from "react";
import { Redirect } from "react-router-dom";

class CreateFlat extends React.Component {
  state = {
    name: "Flat Nickname",
    address_one: "Line One",
    address_two: "Line Two",
    city: "City",
    postcode: "Post Code"
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const flat = {
      flat: {
        flat_key: Math.random()
          .toString(36)
          .substr(2, 40),
        name: this.state.name,
        address_one: this.state.address_one,
        address_two: this.state.address_two,
        city: this.state.city,
        postcode: this.state.postcode
      }
    };
    this.props.createNewFlat(flat);
    this.props.handleFlatCreatedClick(flat);
  };

  render() {
    return (
      <>
        {this.logged_in ? (
          <div>
            <Redirect to="/" />
          </div>
        ) : (
          <div className="popOut">
            <div className="popOutCenter">
              <form className="form" onSubmit={this.handleSubmit}>
                <button onClick={this.props.handleCreateFlat}>Back</button>
                <p>Flat Name: </p>
                <input
                  type="name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <p>Address </p>
                <input
                  type="address_one"
                  name="address_one"
                  value={this.state.address_one}
                  onChange={this.handleChange}
                />
                <input
                  type="address_two"
                  name="address_two"
                  value={this.state.address_two}
                  onChange={this.handleChange}
                />
                <input
                  type="city"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
                <p>Post Code: </p>
                <input
                  type="postcode"
                  name="postcode"
                  value={this.state.postcode}
                  onChange={this.handleChange}
                />
                <button className="submitButton">Create Flat</button>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
}
export default CreateFlat;
