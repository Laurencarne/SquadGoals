import React from "react";
import "../../CSS/Shopping.css";
import { Redirect } from "react-router-dom";

class ShoppingList extends React.Component {
  state = {
    checked: false,
    items: []
  };

  handleSubmit = e => {
    e.preventDefault();
    let item = {
      shopping_list_id: this.props.user.flat_id,
      name: e.target[0].value
    };
    if (e.target[0].value) {
      this.props.addShoppingItemToFlat(item);
      e.target.reset();
    }
  };

  handleClick = item => {
    console.log(item.id);
    this.renderTextDecoration(item.id);
    setTimeout(() => this.deleteItem(item), 200);
  };

  deleteItem = item => {
    this.props.deleteItemFromShoppingList(item.id);
  };

  renderTextDecoration = id => {
    this.setState({
      items: this.props.items.map(item => {
        if (item.id === id) {
          item.checked = !item.checked;
        }
        return item;
      })
    });
  };

  render() {
    if (!this.props.logged_in && this.props.user) {
      return <Redirect to="/" />;
    } else if (this.props.logged_in && this.props.user) {
      return (
        <>
          <div className="noCover">
            <img
              src="https://images.unsplash.com/photo-1542223189-67a03fa0f0bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjU2MDh9&auto=format&fit=crop&w=2104&q=80"
              alt="Lady in bedroom"
            />
          </div>
          <div className="ShoppingList">
            <h4>Shopping List</h4>
            <div className="notebook">
              <ul className="list">
                {this.props.items.map(item => (
                  <li
                    key={item.id}
                    onClick={() => this.handleClick(item)}
                    style={{
                      textDecoration: item.checked ? "line-through" : "none"
                    }}
                  >
                    {item.name}
                  </li>
                ))}
                <li className="formLi">
                  <form className="shoppingForm" onSubmit={this.handleSubmit}>
                    <input
                      className="newItem"
                      placeholder="Add a New Item"
                    ></input>
                    <button className="shoppingButton">
                      <img
                        alt="Basket"
                        className="newItemSubmit"
                        src="https://i.imgur.com/rEEAC42.png"
                      />
                    </button>
                  </form>
                </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
                <li> </li>
              </ul>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }
}

export default ShoppingList;
