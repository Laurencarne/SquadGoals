import React from "react";
import "../../CSS/Bills.css";

let flatmateHolder = [];

class CreateBill extends React.Component {
  state = {
    name: "",
    total: "",
    desc: "",
    flatmate_id: "",
    alert: false
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
    this.renderStyle(flatmate.avatar);
  };

  renderStyle = avatar => {
    this.setState({
      flatmates: this.props.flatmates.map(flatmate => {
        if (flatmate.avatar === avatar) {
          flatmate.checked = !flatmate.checked;
        }
        return flatmate;
      })
    });
  };

  validateSubmit = e => {
    e.preventDefault();
    console.log(flatmateHolder);

    if (!flatmateHolder.length > 0) {
      this.setState({
        alert: true
      });
    } else {
      this.setState({
        alert: false
      });
      this.handleSubmit(e);
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    let flatmate_ids = [];

    flatmateHolder.map(flatmate =>
      flatmate_ids.push({
        flatmate_id: flatmate.id,
        total_owed: this.state.total / (flatmateHolder.length + 1),
        paid: false
      })
    );

    flatmate_ids.push({
      flatmate_id: this.props.user.id,
      total_owed: this.state.total / (flatmateHolder.length + 1),
      paid: true
    });

    let bill = {
      bill: {
        name: this.state.name,
        total: this.state.total,
        desc: this.state.desc,
        flatmate_id: this.props.user.id,
        flatmate_ids: flatmate_ids
      }
    };

    this.props.addBill(bill);

    this.setState({
      name: "",
      total: "",
      desc: "",
      flatmate_id: "",
      alert: false
    });

    flatmateHolder = [];
    this.props.toggleCreateBill();
  };

  render() {
    return (
      <div className="popOut">
        <div className="popOutCenter billBackgroundColor">
          <div className="billFormDiv">
            <form onSubmit={this.validateSubmit} className="billForm">
              <button
                type="button"
                className="taskBackButton"
                onClick={this.props.toggleCreateBill}
              >
                <img src="https://i.imgur.com/WhNIfmi.png" alt="Task Logo" />
              </button>
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
              <input className="submit" type="submit"></input>
              {this.state.alert ? (
                <p>Please select housemates to split the bill with.</p>
              ) : null}
            </form>
          </div>
          <div className="flatmatePicker">
            {this.props.flatmates
              .filter(flatmate => flatmate.id !== this.props.user.id)
              .map(flatmate => (
                <div
                  style={{
                    backgroundColor:
                      flatmate.checked && flatmateHolder.includes(flatmate)
                        ? "#8F2D56"
                        : null
                  }}
                  key={flatmate.id}
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
      </div>
    );
  }
}

export default CreateBill;
