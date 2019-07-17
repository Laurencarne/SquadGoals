import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import api from "../util/api";
import NavBar from "../Components/Foundation/NavBar";
import LandingPage from "../Components/Foundation/LandingPage";
import Footer from "../Components/Foundation/Footer";
import LoginComponent from "../Components/Login&SignUp/LoginComponent";
import SignupComponent from "../Components/Login&SignUp/SignupComponent";
import Profile from "../Components/Profile/Profile";
import Dnd from "../Components/Calendar/Dnd";

const token = localStorage.getItem("token");

class App extends React.Component {
  state = {
    logged_in: false,
    username: "",
    password: "",
    user: {},
    notes: []
  };

  componentDidMount() {
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
            electricity_due: flatmate.electricity_due,
            avatar: flatmate.avatar
          }
        });
        this.getNotes(token);
      });
    }
  }
  //////////////////// NOTES /////////////////////
  getNotes = token => {
    api.getNotes(token).then(notes => this.setState({ notes }));
  };

  onAddNoteClick = note => {
    api.addNoteToServer(note, token).then(data =>
      this.setState({
        notes: [...this.state.notes, data]
      })
    );
  };

  onDeleteNoteClick = noteId => {
    api.deleteNoteFromServer(noteId, token).then(
      this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
      })
    );
  };

  //////////////////// NOTES /////////////////////

  /////////////// LOGIN & SIGNUP /////////////////
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleDateChange = (date, name) => {
    this.setState({
      [name]: date
    });
  };

  setAvatarURL = avatar => {
    this.setState({
      avatar: avatar
    });
  };

  onLoginClicked = e => {
    e.preventDefault();
    api.login(this.state.username, this.state.password).then(data => {
      if (data.error) {
        alert("Something is wrong with your credentials");
        this.setState({ username: "", password: "" });
      } else {
        localStorage.setItem("token", data.jwt);
        const token = localStorage.getItem("token");
        api.getCurrentFlatmate(data.jwt).then(flatmate => {
          this.setState({
            logged_in: true,
            password: "",
            user: {
              username: flatmate.username,
              id: flatmate.id,
              first_name: flatmate.first_name,
              last_name: flatmate.last_name,
              birthday: flatmate.birthday,
              move_in: flatmate.move_in,
              rent_due: flatmate.rent_due,
              water_due: flatmate.water_due,
              electricity_due: flatmate.electricity_due,
              avatar: flatmate.avatar
            }
          });
        });
        this.getNotes(token);
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
        birthday: this.state.birthday,
        email: this.state.email,
        avatar: this.state.avatar
      }
    };
    api.signup(flatmate).then(data => {
      if (data.error) {
        alert("Something is wrong with your credentials");
        this.setState({
          username: "",
          password: "",
          first_name: "",
          last_name: "",
          email: "",
          birthday: "",
          avatar: ""
        });
      } else {
        localStorage.setItem("token", data.jwt);
        const token = localStorage.getItem("token");
        api.getCurrentFlatmate(data.jwt).then(flatmate => {
          this.setState({
            logged_in: true,
            password: "",
            user: {
              username: flatmate.username,
              id: flatmate.id,
              first_name: flatmate.first_name,
              last_name: flatmate.last_name,
              birthday: flatmate.birthday,
              move_in: flatmate.move_in,
              rent_due: flatmate.rent_due,
              water_due: flatmate.water_due,
              electricity_due: flatmate.electricity_due,
              avatar: flatmate.avatar
            }
          });
        });
        this.getNotes(token);
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
  /////////////// LOGIN & SIGNUP /////////////////

  ////////////////// PROFILE /////////////////////
  updateProfile = profile => {
    api.updateFlatmateProfile(profile, this.state.user.id, token).then(data =>
      this.setState({
        user: data
      })
    );
  };
  ////////////////// PROFILE /////////////////////

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
                <LandingPage
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
                  handleDateChange={this.handleDateChange}
                  setAvatarURL={this.setAvatarURL}
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
            <Route path="/calendar" render={() => <Dnd />} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
