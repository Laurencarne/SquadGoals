import React from "react";
import "../CSS/Avatar.css";

const iconList = [
  "https://i.imgur.com/L8qLD0J.png",
  "https://i.imgur.com/qszuCED.png",
  "https://i.imgur.com/dlQWEoN.png",
  "https://i.imgur.com/q8O4OHl.png",
  "https://i.imgur.com/aIH1fKs.png",
  "https://i.imgur.com/eU2F3f5.png",
  "https://i.imgur.com/Wh6GPta.png",
  "https://i.imgur.com/QrhW7bh.png",
  "https://i.imgur.com/cTCacLv.png",
  "https://i.imgur.com/BjvN33S.png",
  "https://i.imgur.com/JAzqjJT.png",
  "https://i.imgur.com/LuEoCVK.png",
  "https://i.imgur.com/Giznsgl.png",
  "https://i.imgur.com/UWhAiPG.png",
  "https://i.imgur.com/HAVd0CB.png",
  "https://i.imgur.com/mQaK49p.png",
  "https://i.imgur.com/VjHas29.png",
  "https://i.imgur.com/EYEGiNh.png",
  "https://i.imgur.com/PSdRwOl.png",
  "https://i.imgur.com/YydU9bg.png",
  "https://i.imgur.com/i7NGEBv.png",
  "https://i.imgur.com/d178J4J.png"
];

class Icon extends React.Component {
  state = {
    num1: 5,
    num2: 10,
    icons: []
  };

  componentDidMount() {
    this.saveIcons(0, 5);
  }

  saveIcons = (num1, num2) => {
    this.setState({
      icons: iconList.slice(num1, num2)
    });
  };

  handleRightClicked = () => {
    if (this.state.num2 + 5 >= iconList.length) {
      this.setState({
        num1: 0,
        num2: 5
      });
    } else {
      this.setState({
        num1: this.state.num1 + 5,
        num2: this.state.num2 + 5
      });
    }
    this.saveIcons(this.state.num1, this.state.num2);
  };

  handleLeftClicked = () => {
    if (this.state.num1 <= 5) {
      this.setState({
        num1: iconList.length - 5,
        num2: iconList.length
      });
    } else {
      this.setState({
        num1: this.state.num1 - 5,
        num2: this.state.num2 - 5
      });
    }
    this.saveIcons(this.state.num1, this.state.num2);
  };

  renderPage = () => {
    return (
      <div className="popOut">
        <button className="buttonPopOut" onClick={this.handleLeftClicked}>
          {"<<"}
        </button>
        <div className="popOutCenter"></div>
        <div className="avatarPopOut">
          <div className="avatarBox">
            <div>
              {this.state.icons.map(icon => (
                <img
                  alt="Icons"
                  onClick={() => this.props.handleAvatarClick(icon)}
                  className="avatarTiles"
                  src={icon}
                />
              ))}
            </div>
            <button
              className="buttonPopOutBack"
              onClick={this.props.toggleAvatarBar}
            >
              Back
            </button>
          </div>
        </div>
        <button className="buttonPopOut" onClick={this.handleRightClicked}>
          {">>"}
        </button>
      </div>
    );
  };

  render() {
    return <>{this.renderPage()}</>;
  }
}

export default Icon;
