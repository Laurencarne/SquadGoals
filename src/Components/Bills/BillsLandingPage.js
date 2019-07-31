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

  renderPage = () => {
    const { user, flatmates, logged_in, bills, addBill } = this.props;
    if (!this.props.logged_in && this.props.user) {
      return <Redirect to="/" />;
    } else if (this.props.logged_in && this.props.user) {
      return (
        <>
          <div className="noCover">
            <img
              src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
              alt="Money"
            />
          </div>
          {!logged_in || !flatmates.length > 0 ? (
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

                <form
                  className="billRadioButton"
                  onClick={this.handleOwedFilter}
                >
                  <input
                    defaultChecked
                    type="radio"
                    value="All"
                    name="filter"
                    id="AllOwed"
                  />
                  <label for="AllOwed">All Bills</label>
                  <input
                    type="radio"
                    value="Outstanding"
                    name="filter"
                    id="OutstandingOwed"
                  />
                  <label for="OutstandingOwed">Outstanding Bills</label>
                </form>
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

                <form
                  className="billRadioButton"
                  onChange={this.handleOweFilter}
                >
                  <input
                    defaultChecked
                    type="radio"
                    value="All"
                    name="filter"
                    id="AllOwe"
                  />
                  <label for="AllOwe">All Bills</label>
                  <input
                    type="radio"
                    value="Outstanding"
                    name="filter"
                    id="OutstandingOwe"
                  />
                  <label for="OutstandingOwe">Outstanding Bills</label>
                </form>

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
                            owingConditionalDisplay={
                              this.owingConditionalDisplay
                            }
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
  };
  render() {
    return <>{this.renderPage()}</>;
  }
}

export default BillsLandingPage;
