import React from "react";

class DisplayOwedBill extends React.Component {
  state = {
    clicked: false
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  render() {
    const { flatmate_id, desc, name, total, bill_splits } = this.props.bill;
    return (
      <div className="billDiv" onClick={this.handleClick}>
        <p>
          <strong>{name}</strong>
        </p>
        {this.state.clicked ? (
          <div>
            <p>Description: {desc}</p>
            <p>Total: £{parseFloat(total).toFixed(2)}</p>
            <p>Flatmates spliting: {bill_splits.length}</p>
          </div>
        ) : null}
        {bill_splits
          .filter(billSplit => billSplit.flatmate_id !== flatmate_id)
          .map(user => (
            <div key={user.id}>
              <p
                style={{
                  color: user.paid ? "#589d3a" : "#ff5757"
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
}

export default DisplayOwedBill;
