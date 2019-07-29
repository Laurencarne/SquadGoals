import React from "react";
import { Redirect } from "react-router-dom";
import DisplayYouOweBill from "./DisplayYouOweBill";
import DisplayOwedBill from "./DisplayOwedBill";
import CreateBill from "./CreateBill";

class BillsLandingPage extends React.Component {
  state = {
    create: false,
    oweFilter: "All",
    owedFilter: "All",
    owedConditionalDisplay: false,
    owingConditionalDisplay: false
  };

  toggleCreateBill = () => {
    this.setState({
      create: !this.state.create
    });
  };

  handleOweFilter = e => {
    this.setState({
      oweFilter: e.target.value,
      owingConditionalDisplay: false
    });
  };

  handleOwedFilter = e => {
    this.setState({
      owedFilter: e.target.value,
      owedConditionalDisplay: false
    });
  };

  owedConditionalDisplay = answer => {
    this.setState({
      owedConditionalDisplay: answer
    });
  };

  owingConditionalDisplay = answer => {
    this.setState({
      owingConditionalDisplay: answer
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
          <div className="billPage">
            <button className="billButton" onClick={this.toggleCreateBill}>
              Create New
            </button>
            <div>
              <h4>Your Owed</h4>

              <select className="billButton" onChange={this.handleOwedFilter}>
                <option default>All</option>
                <option>Due</option>
                <option>Settled</option>
              </select>

              <div className="billsDisplay">
                {!this.state.owedConditionalDisplay ? (
                  <>
                    {this.props.bills
                      .filter(oneBill => oneBill.flatmate_id === user.id)
                      .map(bill => (
                        <DisplayOwedBill
                          key={bill.id}
                          bill={bill}
                          user={user}
                          filter={this.state.owedFilter}
                          flatmates={flatmates}
                          owedConditionalDisplay={this.owedConditionalDisplay}
                        />
                      ))}
                  </>
                ) : (
                  <>
                    <h3>No Bills to Display</h3>
                  </>
                )}
              </div>

              <h4>You Owe</h4>

              <select className="billButton" onChange={this.handleOweFilter}>
                <option default>All</option>
                <option>Due</option>
                <option>Settled</option>
              </select>

              <div className="billsDisplay">
                {!this.state.owingConditionalDisplay ? (
                  <>
                    {bills
                      .filter(oneBill => oneBill.flatmate_id !== user.id)
                      .map(bill => (
                        <DisplayYouOweBill
                          updateBillSplitDetails={
                            this.props.updateBillSplitDetails
                          }
                          key={bill.id}
                          bill={bill}
                          user={user}
                          flatmates={flatmates}
                          filter={this.state.oweFilter}
                          owingConditionalDisplay={this.owingConditionalDisplay}
                        />
                      ))}
                  </>
                ) : (
                  <>
                    <h3>No Bills to Display</h3>
                  </>
                )}
              </div>

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
