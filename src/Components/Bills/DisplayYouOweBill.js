import React from "react";
import { Redirect } from "react-router-dom";

class DisplayBill extends React.Component {
  render() {
    const { flatmate_id, desc, name, total, bill_splits } = this.props.bill;

    return (
      <div className="billDiv">
        <p>
          Flatmate Owed:
          {
            this.props.flatmates.find(flatmate => flatmate.id === flatmate_id)
              .first_name
          }
        </p>
        <p>Bill Name: {name}</p>
        <p>Bill Description: {desc}</p>
        <p>Bill Total Payable: {total}</p>
        <p>
          Flatmates to split with: {bill_splits.length}
          {bill_splits
            .filter(billSplit => billSplit.flatmate_id === this.props.user.id)
            .map(user => (
              <>
                <p
                  style={{
                    color: user.paid ? "#589d3a" : "#ff5757"
                  }}
                >
                  {user.paid
                    ? ` You Paid: £${user.total_owed}`
                    : ` You need to pay: £${user.total_owed}`}
                </p>
              </>
            ))}
        </p>
      </div>
    );
  }
}

export default DisplayBill;
