import React from "react";
import { Redirect } from "react-router-dom";
import DisplayYouOweBill from "./DisplayYouOweBill";
import DisplayOwedBill from "./DisplayOwedBill";
import CreateBill from "./CreateBill";

class BillsLandingPage extends React.Component {
  state = {
    create: false,
    filter: "All"
  };

  toggleCreateBill = () => {
    this.setState({
      create: !this.state.create
    });
  };

  handleFilter = e => {
    this.setState({
      filter: e.target.value
    });
  };

  render() {
    const { user, flatmates, logged_in, bills, addBill } = this.props;
    return (
      <>
        {!logged_in && user ? (
          <div>
            <Redirect to="/" />
          </div>
        ) : (
          <div className="page">
            <h3>Bills Page</h3>
            <button className="billButton" onClick={this.toggleCreateBill}>
              Create New
            </button>
            <div className="pageLeft">
              <h4>Your Owed</h4>

              <select className="billButton" onChange={this.handleFilter}>
                <option default>All</option>
                <option>Due</option>
                <option>Settled</option>
              </select>

              {this.props.bills
                .filter(oneBill => oneBill.flatmate_id === user.id)
                .map(bill => (
                  <DisplayOwedBill
                    key={bill.id}
                    bill={bill}
                    user={user}
                    filter={this.state.filter}
                    flatmates={flatmates}
                  />
                ))}
              <h4>You Owe</h4>

              <select className="billButton" onChange={this.handleFilter}>
                <option default>All</option>
                <option>Due</option>
                <option>Settled</option>
              </select>

              {bills
                .filter(oneBill => oneBill.flatmate_id !== user.id)
                .map(bill => (
                  <DisplayYouOweBill
                    updateBillSplitDetails={this.props.updateBillSplitDetails}
                    key={bill.id}
                    bill={bill}
                    user={user}
                    flatmates={flatmates}
                    logged_in={logged_in}
                    filter={this.state.filter}
                  />
                ))}
              {this.state.create ? (
                <>
                  <CreateBill
                    toggleCreateBill={this.toggleCreateBill}
                    addBill={addBill}
                    user={user}
                    logged_in={logged_in}
                    flatmates={flatmates}
                  />
                </>
              ) : null}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default BillsLandingPage;
