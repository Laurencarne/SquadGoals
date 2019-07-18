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

const token = () => localStorage.getItem("token");

class App extends React.Component {
  state = {
    logged_in: false,
    user: {},
    notes: [],
    flat: []
  };

  componentDidMount() {
    if (token()) {
      api.getCurrentFlatmate(token()).then(flatmate => {
        this.setState({
          logged_in: true,
          user: flatmate
        });
        this.getNotes(token());
        this.getFlatDetails(token());
      });
    }
  }
  //////////////////// NOTES /////////////////////
  getNotes = () => {
    api.getNotes(token()).then(notes => this.setState({ notes }));
  };

  onAddNoteClick = note => {
    api.addNoteToServer(note, token()).then(data =>
      this.setState({
        notes: [...this.state.notes, data]
      })
    );
  };

  onDeleteNoteClick = noteId => {
    api.deleteNoteFromServer(noteId, token()).then(
      this.setState({
        notes: this.state.notes.filter(note => note.id !== noteId)
      })
    );
  };
  /////////////// LOGIN /////////////////
  onLoginClicked = user => {
    api.login(user.username, user.password).then(data => {
      if (data.error) {
        alert("Something is wrong with your credentials");
      } else {
        localStorage.setItem("token", data.jwt);
        api.getCurrentFlatmate(data.jwt).then(flatmate => {
          this.setState({
            logged_in: true,
            user: flatmate
          });
        });
        this.getNotes();
        this.getFlatDetails(token());
      }
    });
  };
  ////////////////// SIGNUP /////////////////////
  signUpUserToServer = flatmate => {
    api.signup(flatmate).then(data => {
      if (data.error) {
        alert("Something is wrong with your credentials");
      } else {
        localStorage.setItem("token", data.jwt);
        api.getCurrentFlatmate(data.jwt).then(flatmate => {
          this.setState({
            logged_in: true,
            user: flatmate
          });
        });
        this.getNotes();
      }
    });
  };
  ////////////////// LOGOUT /////////////////////
  handleLogOut = () => {
    localStorage.clear("token");
    this.setState({
      logged_in: false,
      notes: [],
      user: {},
      flat: []
    });
  };
  ////////////////// PROFILE /////////////////////
  updateProfile = profile => {
    api.updateFlatmateProfile(profile, this.state.user.id, token()).then(data =>
      this.setState({
        user: data
      })
    );
  };
  ////////////////// FLAT /////////////////////
  createNewFlat = flat => {
    api.addFlatToServer(flat, token()).then(data =>
      this.setState({
        user: {
          ...this.state.user,
          flat_id: data.id,
          flat_key: data.flat_key,
          flat_name: data.name
        },
        flat: data
      })
    );
  };

  getFlatDetails = () => {
    api.getFlat(token()).then(flat => {
      if (!flat.error) {
        this.setState({ flat });
      }
    });
  };

  ////////////////// RENDER /////////////////////
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar
            user={this.state.user}
            logged_in={this.state.logged_in}
            handleLogOut={this.handleLogOut}
            createNewFlat={this.createNewFlat}
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
                />
              )}
            />
            <Route
              path="/signup"
              exact
              render={() => (
                <SignupComponent
                  logged_in={this.state.logged_in}
                  signUpUserToServer={this.signUpUserToServer}
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
