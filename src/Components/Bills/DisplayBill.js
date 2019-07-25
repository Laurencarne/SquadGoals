import React from "react";
import { Redirect } from "react-router-dom";

class DisplayBill extends React.Component {
  render() {
    const { flatmate_id, desc, name, total, bill_splits } = this.props.bill;

    return (
      <>
        {!this.props.logged_in && this.props.user ? (
          <div>
            <Redirect to="/" />
          </div>
        ) : (
          <div>
            <p>
              Flatmate Owed:
              {
                this.props.flatmates.find(
                  flatmate => flatmate.id === flatmate_id
                ).first_name
              }
            </p>
            <p>Bill Name: {name}</p>
            <p>Bill Description: {desc}</p>
            <p>Bill Total Payable: {total}</p>
            <p>
              Flatmates to split with: {bill_splits.length}
              {bill_splits
                .filter(billSplit => billSplit.flatmate_id !== flatmate_id)
                .map(user => (
                  <>
                    <p>
                      {
                        this.props.flatmates.find(
                          flatmate => flatmate.id === user.flatmate_id
                        ).first_name
                      }
                    </p>
                    <p>Paid: {user.paid ? "Yes" : "No"}</p>
                    <p>Total Due: £{user.total_owed}</p>
                  </>
                ))}
            </p>
          </div>
        )}
      </>
    );
  }
}

export default DisplayBill;
