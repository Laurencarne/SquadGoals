import React from "react";
import { Redirect } from "react-router-dom";

class DisplayBill extends React.Component {
  render() {
    const { flatmate_id, desc, name, total, bill_splits } = this.props.bill;
    return (
      <div className="billDiv">
        <p>Bill Name: {name}</p>
        <p>Bill Description: {desc}</p>
        <p>Bill Total Payable: {parseFloat(total).toFixed(2)}</p>
        <p>
          Flatmates to split with: {bill_splits.length}
          {bill_splits
            .filter(billSplit => billSplit.flatmate_id !== flatmate_id)
            .map(user => (
              <>
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
                    ? ` has paid you: £${parseFloat(user.total_owed).toFixed(
                        2
                      )}`
                    : ` owes you: £${parseFloat(user.total_owed).toFixed(2)}`}
                </p>
              </>
            ))}
        </p>
      </div>
    );
  }
}

export default DisplayBill;
