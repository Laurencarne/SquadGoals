import React from "react";

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
  render() {
    const { flatmate_id, desc, name, total, bill_splits } = this.props.bill;

    return (
      <div className="billDiv">
        <p>
          <strong>{name}</strong>
        </p>
        {this.state.clicked ? (
          <>
            <p>Description: {desc}</p>
            <p>Total: £{parseFloat(total).toFixed(2)}</p>
            <p>Flatmates splitting: {bill_splits.length}</p>
          </>
        ) : null}
        {bill_splits
          .filter(billSplit => billSplit.flatmate_id === this.props.user.id)
          .map(user => (
            <div className="billOwe" key={user.id}>
              <p
                style={{
                  color: user.paid ? "#589d3a" : "#ff5757"
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
              {this.state.clicked ? (
                <button className="billButton" onClick={this.toggleMoreDetails}>
                  Hide Details
                </button>
              ) : (
                <button className="billButton" onClick={this.toggleMoreDetails}>
                  See More
                </button>
              )}
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
  }
}

export default DisplayYouOweBill;
