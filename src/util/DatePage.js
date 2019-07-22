import React, { Component } from "react";
import DatePicker from "react-date-picker";
import moment from "moment";

class DatePage extends Component {
  state = {
    date: this.props.date
  };

  onChange = date => {
    this.setState({ date });
    this.props.handleDateChange(
      moment(date).format("dddd Do MMMM YYYY"),
      this.props.name
    );
  };

  render() {
    return (
      <div className="calenderPicker">
        <DatePicker onChange={this.onChange} value={this.state.date} />
      </div>
    );
  }
}
export default DatePage;
