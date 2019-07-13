import React from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  const navStyle = {
    color: "black"
  };

  return (
    <>
      {props.logged_in ? (
        <nav className="NavBar">
          <Link style={navStyle} to="/">
            <h3>
              <img
                className="homeImage"
                src="https://image.flaticon.com/icons/svg/25/25694.svg"
                alt="Home Image"
              />
            </h3>
          </Link>
          <button onClick={props.handleLogOut} className="navButtons">
            Log Out
          </button>
        </nav>
      ) : (
        <nav className="NavBar">
          <Link style={navStyle} to="/">
            <h3>
              <img
                className="homeImage"
                src="https://image.flaticon.com/icons/svg/25/25694.svg"
                alt="Home Image"
              />
            </h3>
          </Link>

          <ul className="nav-links">
            <Link style={navStyle} to="/signup">
              <li className="navButtons">Sign Up</li>
            </Link>
            <Link style={navStyle} to="/login">
              <li className="navButtons">Log In</li>
            </Link>
          </ul>
        </nav>
      )}
    </>
  );
}

export default NavBar;
