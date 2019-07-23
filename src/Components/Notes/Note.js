import React from "react";
import "../../CSS/NotesAndEvents.css";

export default class Notes extends React.Component {
  state = {
    clicked: false
  };

  renderDeleteWindow = id => {
    if (this.state.clicked) {
      return (
        <div className="popOut">
          <div className="popOutCenter">
            <div className="form">
              <h4 className="centerMe">
                Are you sure you want to delete this note?
              </h4>
              <p>{this.props.note.note}</p>
              <button
                onClick={() => this.props.onDeleteNoteClick(this.props.note.id)}
              >
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
    return (
      <div className="Note" onClick={this.handleClick}>
        {this.renderDeleteWindow()}
        <p>{this.props.note.note}</p>
      </div>
    );
  }
}
