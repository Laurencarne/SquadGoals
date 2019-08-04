import React, { Component } from "react";
import "../../CSS/Home.css";

class Home extends Component {
  render() {
    return (
      <div className="landingPageContainer">
        <div>
          <iframe
            className="video"
            autoplay
            loop
            width="420"
            height="340"
            src="https://www.youtube.com/embed/N8UoKgd669A?version=3&autoplay=1&loop=1&playlist=PL_LRhFyQ7d9fi8Hda2k_Bw_AYgGBvgmT;showinfo=0"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
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
  }
}

export default Home;
