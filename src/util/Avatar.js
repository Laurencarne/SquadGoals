import React from "react";
import "../CSS/Avatar.css";

const avatarList = [
  "https://i.imgur.com/UKCf4JFl.png",
  "https://i.imgur.com/14LTwnul.png",
  "https://i.imgur.com/acI4YWql.png",
  "https://i.imgur.com/4aRLm3sl.png",
  "https://i.imgur.com/yotL3Ial.png",
  "https://i.imgur.com/FxNEQYDl.png",
  "https://i.imgur.com/wgDZwWwl.png",
  "https://i.imgur.com/pFnVkjVl.png",
  "https://i.imgur.com/lYv5jtol.png",
  "https://i.imgur.com/cK5wzDVl.png",
  "https://i.imgur.com/WgTuWhBl.png",
  "https://i.imgur.com/jzPxsONl.png",
  "https://i.imgur.com/VP4z7WVl.png",
  "https://i.imgur.com/1cD1AIUl.png",
  "https://i.imgur.com/0JzKKcDl.png",
  "https://i.imgur.com/BvfXrYNl.png",
  "https://i.imgur.com/xUnM3dSl.png",
  "https://i.imgur.com/mO1bvall.png",
  "https://i.imgur.com/T4Rfn1il.png",
  "https://i.imgur.com/H58jS5sl.png",
  "https://i.imgur.com/Zaoarssl.png",
  "https://i.imgur.com/n1yILBrl.png",
  "https://i.imgur.com/aKhVh5pl.png",
  "https://i.imgur.com/fFC4Y40l.png",
  "https://i.imgur.com/YiGioUal.png",
  "https://i.imgur.com/RvQzAT9l.png",
  "https://i.imgur.com/oZmNoETl.png",
  "https://i.imgur.com/jMgVYd1l.png",
  "https://i.imgur.com/nwS6w2bl.png",
  "https://i.imgur.com/lM2qdwBl.png",
  "https://i.imgur.com/SFJUJ4jl.png",
  "https://i.imgur.com/uzaqlecl.png",
  "https://i.imgur.com/1uVM748l.png",
  "https://i.imgur.com/N4SreXml.png",
  "https://i.imgur.com/WKnnx1Jl.png",
  "https://i.imgur.com/wRKK3lml.png",
  "https://i.imgur.com/xVxTBsyl.png"
];

class Avatar extends React.Component {
  state = {
    num1: 5,
    num2: 10,
    avatars: []
  };

  componentDidMount() {
    this.saveAvatars(0, 5);
  }

  saveAvatars = (num1, num2) => {
    this.setState({
      avatars: avatarList.slice(num1, num2)
    });
  };

  handleRightClicked = () => {
    if (this.state.num2 + 5 >= avatarList.length) {
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
    this.saveAvatars(this.state.num1, this.state.num2);
  };

  handleLeftClicked = () => {
    if (this.state.num1 <= 5) {
      this.setState({
        num1: avatarList.length - 5,
        num2: avatarList.length
      });
    } else {
      this.setState({
        num1: this.state.num1 - 5,
        num2: this.state.num2 - 5
      });
    }
    this.saveAvatars(this.state.num1, this.state.num2);
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
              {this.state.avatars.map(avatar => (
                <img
                  alt="Avatar"
                  onClick={() => this.props.handleAvatarClick(avatar)}
                  className="avatarTiles"
                  src={avatar}
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

export default Avatar;
