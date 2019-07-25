import React from "react";
import { Redirect } from "react-router-dom";
import DisplayBill from "./DisplayBill";
import CreateBill from "./CreateBill";

class BillsLandingPage extends React.Component {
  render() {
    const { user, flatmates, logged_in, bills, addBill } = this.props;
    return (
      <>
        {!logged_in && user ? (
          <div>
            <Redirect to="/" />
          </div>
        ) : (
          <div>
            <h3>Bills Page</h3>
            <h4>Your Owed</h4>
            {this.props.bills
              .filter(oneBill => oneBill.flatmate_id === user.id)
              .map(bill => (
                <DisplayBill
                  key={bill.id}
                  bill={bill}
                  user={user}
                  flatmates={flatmates}
                  logged_in={logged_in}
                />
              ))}
            <h4>You Owe</h4>
            {bills
              .filter(oneBill => oneBill.flatmate_id !== user.id)
              .map(bill => (
                <DisplayBill
                  key={bill.id}
                  bill={bill}
                  user={user}
                  flatmates={flatmates}
                  logged_in={logged_in}
                />
              ))}
            <CreateBill
              addBill={addBill}
              user={user}
              logged_in={logged_in}
              flatmates={flatmates}
            />
          </div>
        )}
      </>
    );
  }
}

export default BillsLandingPage;
