import React from "react";
import { Redirect } from "react-router-dom";

let flatmateHolder = [];

class CreateBill extends React.Component {
  state = {
    name: "",
    total: "",
    desc: "",
    flatmate_id: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAvatarClick = flatmate => {
    if (!flatmateHolder.includes(flatmate)) {
      flatmateHolder.push(flatmate);
    } else if (flatmateHolder.includes(flatmate)) {
      flatmateHolder = flatmateHolder.filter(t => t !== flatmate);
    }
    console.log(flatmateHolder);
  };

  handleSubmit = e => {
    e.preventDefault();

    let bill = {
      name: this.state.name,
      total: this.state.total,
      desc: this.state.desc,
      flatmate_id: this.props.user.id
    };

    this.props.addBill(bill).then(data =>
      this.setState({
        bill_id: data.id
      })
    );

    let bill_split = {};

    flatmateHolder.map(
      flatmate =>
        (bill_split = {
          flatmate_id: flatmate,
          bill_id: "",
          total_owed: this.state.total
        })
    );

    // console.log(bill);
  };

  render() {
    return (
      <>
        {!this.props.logged_in && this.props.user ? (
          <div>
            <Redirect to="/" />
          </div>
        ) : (
          <div>
            <form onSubmit={this.handleSubmit}>
              <span
                onClick={e => this.handleAvatarClick(parseInt(e.target.id))}
                className="flatmate"
              >
                {this.props.flatmates.map(flatmate => (
                  <>
                    <img
                      className="avatar"
                      src={flatmate.avatar}
                      alt="flatmates avatar"
                      id={flatmate.id}
                    />
                    <p id={flatmate.id}>{flatmate.first_name}</p>
                  </>
                ))}
              </span>
              <input
                value={this.state.name}
                placeholder="Bill Title"
                name="name"
                onChange={this.handleChange}
                type="text"
              ></input>
              <input
                value={this.state.desc}
                placeholder="Description"
                name="desc"
                onChange={this.handleChange}
                type="text"
              ></input>
              <input
                value={this.state.total}
                placeholder="0.00"
                name="total"
                onChange={this.handleChange}
                type="number"
                step="0.01"
              ></input>
              <input type="submit"></input>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default CreateBill;
