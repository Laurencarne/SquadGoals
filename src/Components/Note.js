import React from "react";

export default class Notes extends React.Component {
  render() {
    return (
      <div className="Note">
        <button>X</button>
        <p key={this.props.note.id}>{this.props.note.note}</p>
      </div>
    );
  }
}
