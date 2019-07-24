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
              <h4 className="centerMe largeText">
                Are you sure you want to delete this note?
              </h4>
              <p>{this.props.note.note}</p>
              <button
                className="newEventButton"
                onClick={() => this.props.onDeleteNoteClick(this.props.note.id)}
              >
                Yes
              </button>
              <button className="newEventButton" onClick={this.handleClick}>
                No! Go Back!!
              </button>
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
      <>
        {this.renderDeleteWindow()}
        <div className="Note" onClick={this.handleClick}>
          <p>{this.props.note.note}</p>
        </div>
      </>
    );
  }
}
