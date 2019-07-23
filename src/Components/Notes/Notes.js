import React from "react";
import "../../CSS/NotesAndEvents.css";
import Note from "./Note";

export default class Notes extends React.Component {
  state = {
    clicked: false
  };
  ////////////////// CONDITIONAL RENDERING //////////////////
  renderNotes = () => {
    if (this.props.notes) {
      return (
        <>
          <h3>Notes...</h3>
          {this.props.notes.map(note => (
            <Note
              note={note}
              onDeleteNoteClick={this.props.onDeleteNoteClick}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          <h3>You don't have any notes yet....Start adding some now.</h3>
        </>
      );
    }
  };

  renderButton = () => {
    if (this.state.clicked) {
      return (
        <button className="notesAndEventsButton" onClick={this.handleClick}>
          Cancel
        </button>
      );
    } else {
      return (
        <button className="notesAndEventsButton" onClick={this.handleClick}>
          New
        </button>
      );
    }
  };

  renderNewForm = () => {
    if (this.state.clicked) {
      return (
        <form onSubmit={this.handleSubmit} id="newNoteForm">
          <textarea
            className="newEventOrNote"
            rows="2"
            cols="50"
            name="comment"
            form="newNoteForm"
          />
          <input type="submit" className="newEventOrNoteSubmit" />
        </form>
      );
    }
  };
  ////////////////////// HANDLE CLICKS //////////////////////
  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const note = {
      note: {
        flatmate_id: this.props.user.id,
        note: e.target[0].value
      }
    };
    this.props.onAddNoteClick(note);
    this.setState({
      clicked: !this.state.clicked
    });

    e.target.reset();
  };

  ////////////////////// HANDLE CLICKS //////////////////////

  render() {
    return (
      <div className="Notes">
        {this.renderNotes()}
        {this.renderButton()}
        {this.renderNewForm()}
      </div>
    );
  }
}
