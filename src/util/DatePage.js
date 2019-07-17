import React, { Component } from "react";
import DatePicker from "react-date-picker";

class DatePage extends Component {
  state = {
    date: this.props.date
  };

  onChange = date => {
    this.setState({ date });
    this.props.handleDateChange(date, this.props.name);
  };

  render() {
    return (
      <div>
        <DatePicker onChange={this.onChange} value={this.state.date} />
      </div>
    );
  }
}
export default DatePage;
