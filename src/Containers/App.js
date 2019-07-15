import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import api from "../util/api";
import NavBar from "../Components/NavBar";
import Home from "../Components/LandingPage";
import Footer from "../Components/Footer";
import LoginComponent from "../Components/LoginComponent";
import SignupComponent from "../Components/SignupComponent";
import Profile from "../Components/Profile/Profile";
import Dnd from "../Components/Calendar/Dnd";

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
            birthday: flatmate.birthday,
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
  ////////////////////////////////////////////////
  //////////////////// NOTES /////////////////////
  ////////////////////////////////////////////////
  getNotes = () => {
    const token = localStorage.getItem("token");
    api.getNotes(token).then(notes => this.setState({ notes }));
  };

  onAddNoteClick = note => {
    api.addNoteToServer(note).then(data =>
      this.setState({
        notes: [...this.state.notes, data]
      })
    );
  };

  onDeleteNoteClick = noteId => {
    api.deleteNoteFromServer(noteId).then(
      this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
      })
    );
  };

  ////////////////////////////////////////////////
  //////////////////// NOTES /////////////////////
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  /////////////// LOGIN & SIGNUP /////////////////
  ////////////////////////////////////////////////
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
        api.getCurrentFlatmate(data.jwt).then(flatmate => {
          this.setState({
            logged_in: true,
            user: {
              username: flatmate.username,
              id: flatmate.id,
              first_name: flatmate.first_name,
              last_name: flatmate.last_name,
              birthday: flatmate.birthday,
              move_in: flatmate.move_in,
              rent_due: flatmate.rent_due,
              water_due: flatmate.water_due,
              electricity_due: flatmate.electricity_due
            }
          });
          this.getNotes();
        });
      }
    });
  };

  onSignupClicked = e => {
    e.preventDefault();
    const flatmate = {
      flatmate: {
        username: this.state.username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password,
        email: this.state.email
      }
    };
    api.signup(flatmate).then(data => {
      if (data.error) {
        alert("something is wrong with your credentials");
        this.setState({
          username: "",
          password: "",
          first_name: "",
          last_name: "",
          email: ""
        });
      } else {
        localStorage.setItem("token", data.jwt);
        api.getCurrentFlatmate(data.jwt).then(flatmate => {
          this.setState({
            logged_in: true,
            user: {
              username: flatmate.username,
              first_name: flatmate.first_name,
              last_name: flatmate.last_name,
              password: flatmate.password,
              email: flatmate.email,
              id: flatmate.id
            }
          });
          this.getNotes();
        });
      }
    });
  };

  handleLogOut = () => {
    localStorage.clear("token");
    this.setState({
      logged_in: false,
      username: "",
      password: "",
      notes: [],
      user: {}
    });
  };
  ////////////////////////////////////////////////
  /////////////// LOGIN & SIGNUP /////////////////
  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  ////////////////// PROFILE /////////////////////
  ////////////////////////////////////////////////
  updateProfile = profile => {
    api.updateFlatmateProfile(profile, this.state.user.id).then(data =>
      this.setState({
        user: data
      })
    );
  };
  ////////////////////////////////////////////////
  ////////////////// PROFILE /////////////////////
  ////////////////////////////////////////////////

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
                  onAddNoteClick={this.onAddNoteClick}
                  onDeleteNoteClick={this.onDeleteNoteClick}
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
            <Route
              path="/signup"
              exact
              render={() => (
                <SignupComponent
                  password={this.state.password}
                  username={this.state.username}
                  logged_in={this.state.logged_in}
                  handleChange={this.handleChange}
                  onSignupClicked={this.onSignupClicked}
                />
              )}
            />
            <Route
              path="/profile"
              exact
              render={() => (
                <Profile
                  updateProfile={this.updateProfile}
                  user={this.state.user}
                  logged_in={this.state.logged_in}
                />
              )}
            />
            <Route path="/calendar" exact render={() => <Dnd />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
