import React from "react";
import { Redirect } from "react-router-dom";
import "../../CSS/Bills.css";

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
      flatmateHolder = flatmateHolder.filter(t => t.id !== flatmate.id);
    }
    console.log(flatmateHolder);
  };

  handleSubmit = e => {
    e.preventDefault();

    let flatmate_ids = [];

    flatmateHolder.map(flatmate =>
      flatmate_ids.push(
        {
          flatmate_id: flatmate.id,
          total_owed: this.state.total / (flatmateHolder.length + 1),
          paid: false
        },
        {
          flatmate_id: this.props.user.id,
          total_owed: this.state.total / (flatmateHolder.length + 1),
          paid: true
        }
      )
    );
    let bill = {
      bill: {
        name: this.state.name,
        total: this.state.total,
        desc: this.state.desc,
        flatmate_id: this.props.user.id,
        flatmate_ids: flatmate_ids
      }
    };

    this.props.addBill(bill).then(data =>
      this.setState({
        bill_id: data.id
      })
    );
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
            <div className="billFormDiv">
              <form onSubmit={this.handleSubmit} className="billForm">
                <input
                  required
                  value={this.state.name}
                  placeholder="Bill Title"
                  name="name"
                  onChange={this.handleChange}
                  type="text"
                ></input>
                <input
                  required
                  value={this.state.desc}
                  placeholder="Description"
                  name="desc"
                  onChange={this.handleChange}
                  type="text"
                ></input>
                <input
                  required
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
            <div className="flatmatePicker">
              {this.props.flatmates
                .filter(flatmate => flatmate.id !== this.props.user.id)
                .map(flatmate => (
                  <div
                    className="flatmatePickerInner"
                    onClick={e => this.handleAvatarClick(flatmate)}
                  >
                    <img
                      className="avatar"
                      src={flatmate.avatar}
                      alt="flatmates avatar"
                      id={flatmate.id}
                    />
                    <p id={flatmate.id}>{flatmate.first_name}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default CreateBill;
