import React from "react";
import moment from "moment";

export default class Event extends React.Component {
  state = {
    clicked: false
  };

  renderDeleteWindow = id => {
    const { title, start, end, description } = this.props.event;
    if (this.state.clicked) {
      return (
        <div className="popOut">
          <div className="popOutCenter">
            <div className="form">
              <h4 className="centerMe">
                Are you sure you want to delete this event?
              </h4>
              <p key={id}>
                {title}, on {moment(start).format("dddd Do MMMM")}
              </p>
              <p>{description}</p>
              <button onClick={() => this.props.onDeleteEventClick(id)}>
                Yes
              </button>
              <button onClick={this.handleClick}>No! Go Back!!</button>
            </div>
          </div>
        </div>
      );
    }
  };

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  render() {
    const { id, title, start, end, description } = this.props.event;
    return (
      <div className="oneEvent">
        <div onClick={() => this.handleClick(id)}>
          <p key={id}>
            {title}, on {moment(start).format("dddd Do MMMM")}
          </p>
          <p>{description}</p>
          <hr />
          {this.renderDeleteWindow(id)}
        </div>
      </div>
    );
  }
}
