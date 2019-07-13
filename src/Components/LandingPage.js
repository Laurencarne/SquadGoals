import React, { Component } from "react";
import Dashboard from "./Dashboard";

class LandingPage extends Component {
  notLogedIn = () => {
    return (
      <div className="landingPageContainer">
        <div className="landPageDivs">
          <h1> About Us </h1>
          <p>
            Etiam luctus, lectus sit amet aliquet placerat, nunc augue luctus
            odio, sed mattis mi sapien id mi. Nunc eu justo arcu. Proin molestie
            iaculis gravida. Pellentesque laoreet bibendum varius. Cras pulvinar
            arcu vitae molestie dapibus. Donec eget vehicula sem. Sed egestas
            nisi sed massa pretium, suscipit gravida erat semper. Aenean
            eleifend mollis venenatis. Donec ut sollicitudin leo, sit amet
            venenatis metus.
          </p>
        </div>
        <div className="landPageDivs">
          <h1> About Us </h1>
          <p>
            Etiam luctus, lectus sit amet aliquet placerat, nunc augue luctus
            odio, sed mattis mi sapien id mi. Nunc eu justo arcu. Proin molestie
            iaculis gravida. Pellentesque laoreet bibendum varius. Cras pulvinar
            arcu vitae molestie dapibus. Donec eget vehicula sem. Sed egestas
            nisi sed massa pretium, suscipit gravida erat semper. Aenean
            eleifend mollis venenatis. Donec ut sollicitudin leo, sit amet
            venenatis metus.
          </p>
        </div>
        <div className="landPageDivs">
          <h1> About Us </h1>
          <p>
            Etiam luctus, lectus sit amet aliquet placerat, nunc augue luctus
            odio, sed mattis mi sapien id mi. Nunc eu justo arcu. Proin molestie
            iaculis gravida. Pellentesque laoreet bibendum varius. Cras pulvinar
            arcu vitae molestie dapibus. Donec eget vehicula sem. Sed egestas
            nisi sed massa pretium, suscipit gravida erat semper. Aenean
            eleifend mollis venenatis. Donec ut sollicitudin leo, sit amet
            venenatis metus.
          </p>
        </div>
        <div className="landingPageBottom">
          <h1> Testimonials </h1>
          <h3>Person One</h3>
          <p>
            Etiam luctus, lectus sit amet aliquet placerat, nunc augue luctus
            odio, sed mattis mi sapien id mi. Nunc eu justo arcu. Proin molestie
            iaculis gravida. Pellentesque laoreet bibendum varius. Cras pulvinar
            arcu vitae molestie dapibus. Donec eget vehicula sem. Sed egestas
            nisi sed massa pretium, suscipit gravida erat semper. Aenean
            eleifend mollis venenatis. Donec ut sollicitudin leo, sit amet
            venenatis metus. Etiam luctus, lectus sit amet aliquet placerat,
            nunc augue luctus odio, sed mattis mi sapien id mi. Nunc eu justo
            arcu. Proin molestie iaculis gravida. Pellentesque laoreet bibendum
            varius. Cras pulvinar arcu vitae molestie dapibus. Donec eget
            vehicula sem. Sed egestas nisi sed massa pretium, suscipit gravida
            erat semper. Aenean eleifend mollis venenatis. Donec ut sollicitudin
            leo, sit amet venenatis metus.
          </p>
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        {this.props.logged_in ? (
          <Dashboard
            user={this.props.user}
            notes={this.props.notes}
            month={this.props.month}
          />
        ) : (
          <div>
            <div>{this.notLogedIn()}</div>
          </div>
        )}
      </>
    );
  }
}

export default LandingPage;
