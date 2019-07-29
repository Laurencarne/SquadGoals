import React from "react";
import DisplayEachBill from "./DisplayEachBill";

class DisplayYouOweBill extends React.Component {
  state = {
    clicked: false,
    settleUp: false
  };

  toggleMoreDetails = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  toggleSettleUp = () => {
    this.setState({
      settleUp: !this.state.settleUp
    });
  };

  settleUpYes = user => {
    let billSplit = {
      id: user.id,
      paid: true
    };
    this.props.updateBillSplitDetails(billSplit);
    this.toggleSettleUp();
    this.toggleMoreDetails();
  };

  renderSettleUp = user => {
    if (this.state.settleUp) {
      return (
        <div className="popOut">
          <div className="popOutCenter">
            <div className="settleUp">
              <div className="settleUpTop">
                <h1>Are you sure you have paid this bill?</h1>
              </div>
              <div className="settleUpBottom">
                <button onClick={() => this.settleUpYes(user)}>Yes</button>
                <button onClick={this.toggleSettleUp}>No</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  filterResults = filter => {
    if (this.props.filter === "Outstanding") {
      return this.props.bill.bill_splits.filter(
        bs => bs.flatmate_id === this.props.user.id && bs.paid === false
      );
    } else {
      return this.props.bill.bill_splits.filter(
        bs => bs.flatmate_id === this.props.user.id
      );
    }
  };

  renderMoreInformation = () => {
    const { desc, total, bill_splits } = this.props.bill;
    if (this.state.clicked) {
      return (
        <>
          <p>Description: {desc}</p>
          <p>Total: £{parseFloat(total).toFixed(2)}</p>
          <p>Flatmates splitting: {bill_splits.length}</p>
        </>
      );
    }
  };

  renderButtons = () => {
    if (this.state.clicked) {
      return (
        <button className="billButton" onClick={this.toggleMoreDetails}>
          Hide Details
        </button>
      );
    } else {
      return (
        <button className="billButton" onClick={this.toggleMoreDetails}>
          See More
        </button>
      );
    }
  };

  renderPage = () => {
    const { flatmate_id, name } = this.props.bill;

    if (this.filterResults(this.props.filter).length > 0) {
      return (
        <div>
          <p>
            <strong>{name}</strong>
          </p>
          {this.renderMoreInformation()}
          {this.filterResults(this.state.filter).map(user => (
            <div className="billOwe" key={user.id}>
              <div className="billBlurb">
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
                  {user.paid
                    ? ` You Paid ${
                        this.props.flatmates.find(
                          flatmate => flatmate.id === flatmate_id
                        ).first_name
                      } £${parseFloat(user.total_owed).toFixed(2)}`
                    : ` You need to pay £${parseFloat(user.total_owed).toFixed(
                        2
                      )} to ${
                        this.props.flatmates.find(
                          flatmate => flatmate.id === flatmate_id
                        ).first_name
                      }`}
                </p>
              </div>
              {this.renderButtons()}
              {this.state.clicked && !user.paid ? (
                <button className="billButton" onClick={this.toggleSettleUp}>
                  Settle Up
                </button>
              ) : null}
              {this.renderSettleUp(user)}
            </div>
          ))}
        </div>
      );
    } else {
      this.props.owingConditionalDisplay(true);
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

export default DisplayYouOweBill;
