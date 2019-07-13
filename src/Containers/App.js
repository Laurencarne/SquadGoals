import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import api from "../util/api";
import NavBar from "../Components/NavBar";
import Home from "../Components/LandingPage";
import Footer from "../Components/Footer";
import LoginComponent from "../Components/LoginComponent";
import SignupComponent from "../Components/SignupComponent";
import Notes from "../Components/Notes";

class App extends React.Component {
  state = {
    logged_in: false,
    username: "",
    password: "",
    user: {},
    notes: []
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      api.getCurrentFlatmate(token).then(flatmate => {
        this.setState({
          logged_in: true,
          user: {
            username: flatmate.username,
            id: flatmate.id,
            first_name: flatmate.first_name,
            last_name: flatmate.last_name,
            move_in: flatmate.move_in,
            rent_due: flatmate.rent_due,
            water_due: flatmate.water_due,
            electricity_due: flatmate.electricity_due
          }
        });
        this.getNotes();
      });
    }
  }

  getNotes = () => {
    const token = localStorage.getItem("token");
    api
      .getNotes(token)
      .then(notes =>
        this.setState({ notes }, () => console.log(this.state.notes))
      );
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onLoginClicked = e => {
    e.preventDefault();
    api.login(this.state.username, this.state.password).then(data => {
      if (data.error) {
        alert("something is wrong with your credentials");
        this.setState({ username: "", password: "" });
      } else {
        localStorage.setItem("token", data.jwt);
        this.setState({
          logged_in: true,
          username: data.username,
          password: ""
        });
        this.getNotes();
      }
    });
  };

  handleLogOut = () => {
    localStorage.clear("token");
    this.setState({
      logged_in: false,
      username: "",
      password: "",
      notes: []
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar
            logged_in={this.state.logged_in}
            handleLogOut={this.handleLogOut}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <Home
                  logged_in={this.state.logged_in}
                  notes={this.state.notes}
                  user={this.state.user}
                />
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginComponent
                  logged_in={this.state.logged_in}
                  onLoginClicked={this.onLoginClicked}
                  handleLogOut={this.handleLogOut}
                  username={this.state.username}
                  handleChange={this.handleChange}
                  getNotes={this.getNotes}
                  password={this.state.password}
                />
              )}
            />
            <Route path="/signup" exact render={() => <SignupComponent />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
