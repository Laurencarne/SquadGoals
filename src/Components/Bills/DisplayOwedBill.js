import React from "react";
import DisplayEachBill from "./DisplayEachBill";

class DisplayOwedBill extends React.Component {
  state = {
    clicked: false
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  filterResults = filter => {
    if (this.props.filter === "Outstanding") {
      return this.props.bill.bill_splits.filter(
        bs => !bs.paid && bs.flatmate_id !== this.props.user.id
      );
    } else {
      return this.props.bill.bill_splits.filter(
        bs => bs.flatmate_id !== this.props.user.id
      );
    }
  };

  renderMoreInformation = () => {
    const { desc, total, bill_splits } = this.props.bill;
    if (this.state.clicked) {
      return (
        <div className="billExtraInfo">
          <p>
            <span>{this.props.bill.name}</span>
          </p>
          <p>
            <span>Description:</span> {desc}
          </p>
          <p>
            <span>Total:</span> £{parseFloat(total).toFixed(2)}
          </p>
          <p>
            <span>Flatmates spliting:</span> {bill_splits.length}
          </p>
        </div>
      );
    }
  };

  renderPage = () => {
    if (this.filterResults(this.props.filter).length > 0) {
      return (
        <div onClick={this.handleClick}>
          {this.renderMoreInformation()}
          {this.filterResults(this.props.filter).map(user => (
            <div className="billBlurb" key={user.id}>
              <img
                src={
                  this.props.flatmates.find(
                    flatmate => flatmate.id === user.flatmate_id
                  ).avatar
                }
                alt="avatar"
              />
              <p
                style={{
                  color: user.paid ? "#589d3a" : "#D81159"
                }}
              >
                {
                  this.props.flatmates.find(
                    flatmate => flatmate.id === user.flatmate_id
                  ).first_name
                }
                {user.paid
                  ? ` has paid you: £${parseFloat(user.total_owed).toFixed(2)}`
                  : ` owes you: £${parseFloat(user.total_owed).toFixed(2)}`}
              </p>
            </div>
          ))}
        </div>
      );
    }
  };

  render() {
    return (
      <DisplayEachBill
        renderPage={this.renderPage}
        filteredArray={this.filterResults(this.props.filter).length}
      />
    );
  }
}

export default DisplayOwedBill;
