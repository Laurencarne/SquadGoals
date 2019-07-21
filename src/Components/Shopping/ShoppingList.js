import React from "react";
import "../../CSS/Shopping.css";

class Tasks extends React.Component {
  render() {
    return (
      <div className="ShoppingList">
        <h4>Shopping List</h4>
        <div className="notebook">
          <ul className="list">
            {this.props.items.map(item => (
              <li>{item.name}</li>
            ))}
            <li> </li>
            <li> </li>
            <li> </li>
            <li> </li>
            <li> </li>
            <li> </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Tasks;
