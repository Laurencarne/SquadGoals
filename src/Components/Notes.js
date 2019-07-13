import React from "react";
import Note from "./Note";

export default class Notes extends React.Component {
  state = {
    clicked: false
  };

  ////////////////// CONDITIONAL RENDERING //////////////////
  renderButton = () => {
    if (this.state.clicked) {
      return <button onClick={this.handleClick}>Cancel</button>;
    } else {
      return <button onClick={this.handleClick}>New</button>;
    }
  };

  renderNewForm = () => {
    if (this.state.clicked) {
      return (
        <form onSubmit={this.handleSubmit} id="newNoteForm">
          <textarea
            className="newNote"
            rows="2"
            cols="50"
            name="comment"
            form="newNoteForm"
          />
          <input type="submit" className="newNoteSubmit" />
        </form>
      );
    }
  };
  ////////////////// CONDITIONAL RENDERING //////////////////

  ////////////////// HANDLE CLICKS //////////////////
  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(e.target[0].value);

    const note = {
      note: {
        flatmate_id: this.props.user.id,
        note: e.target[0].value
      }
    };
    this.addNoteToServer(note);
    e.target.reset();
  };
  ////////////////// HANDLE CLICKS //////////////////

  ////////////////// WORK WITH SERVER //////////////////
  addNoteToServer = note => {
    return fetch(`http://localhost:3000/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    }).then(resp => resp.json());
  };
  ////////////////// WORK WITH SERVER //////////////////

  render() {
    return (
      <div>
        {this.props.notes.map(note => (
          <Note note={note} />
        ))}
        {this.renderButton()}
        {this.renderNewForm()}
      </div>
    );
  }
}
