import React from "react";
import "../CSS/Avatar.css";

const avatarList = [
  "https://i.imgur.com/xVxTBsy.png",
  "https://i.imgur.com/wRKK3lm.png",
  "https://i.imgur.com/WKnnx1J.png",
  "https://i.imgur.com/N4SreXm.png",
  "https://i.imgur.com/1uVM748.png",
  "https://i.imgur.com/uzaqlec.png",
  "https://i.imgur.com/SFJUJ4j.png",
  "https://i.imgur.com/lM2qdwB.png",
  "https://i.imgur.com/nwS6w2b.png",
  "https://i.imgur.com/jMgVYd1.png",
  "https://i.imgur.com/oZmNoET.png",
  "https://i.imgur.com/RvQzAT9.png",
  "https://i.imgur.com/fFC4Y40.png",
  "https://i.imgur.com/YiGioUa.png",
  "https://i.imgur.com/n1yILBr.png",
  "https://i.imgur.com/aKhVh5p.png",
  "https://i.imgur.com/Zaoarss.png",
  "https://i.imgur.com/H58jS5s.png",
  "https://i.imgur.com/mO1bval.png",
  "https://i.imgur.com/T4Rfn1i.png",
  "https://i.imgur.com/xUnM3dS.png",
  "https://i.imgur.com/BvfXrYN.png",
  "https://i.imgur.com/0JzKKcD.png",
  "https://i.imgur.com/1cD1AIU.png",
  "https://i.imgur.com/VP4z7WV.png",
  "https://i.imgur.com/WgTuWhB.png",
  "https://i.imgur.com/jzPxsON.png",
  "https://i.imgur.com/cK5wzDV.png",
  "https://i.imgur.com/lYv5jto.png",
  "https://i.imgur.com/pFnVkjV.png",
  "https://i.imgur.com/wgDZwWw.png",
  "https://i.imgur.com/FxNEQYD.png",
  "https://i.imgur.com/4aRLm3s.png"
];

const oldAvatarList = [
  "https://i.imgur.com/9hk3RQG.png",
  "https://i.imgur.com/frnsu2v.png",
  "https://i.imgur.com/9Dqki2J.png",
  "https://i.imgur.com/Fl0eVhG.png",
  "https://i.imgur.com/6xN0LbO.png",
  "https://i.imgur.com/kzkRWze.png",
  "https://i.imgur.com/OJWigP0.png",
  "https://i.imgur.com/RPefpqp.png",
  "https://i.imgur.com/ZW38LrC.png",
  "https://i.imgur.com/BKdAzmi.png",
  "https://i.imgur.com/mCnXxPA.png",
  "https://i.imgur.com/4c4sLFU.png",
  "https://i.imgur.com/nxPqrh3.png",
  "https://i.imgur.com/0FPtr0p.png",
  "https://i.imgur.com/Dxb1fEE.png",
  "https://i.imgur.com/263Zedi.png",
  "https://i.imgur.com/2nBXo2f.png",
  "https://i.imgur.com/7yCnBRa.png",
  "https://i.imgur.com/HkdDTMu.png",
  "https://i.imgur.com/PX0oHrF.png",
  "https://i.imgur.com/NuDHiqM.png",
  "https://i.imgur.com/PYKMSmB.png",
  "https://i.imgur.com/xJLudbt.png",
  "https://i.imgur.com/Qr8N0Gw.png",
  "https://i.imgur.com/JRV5UB4.png",
  "https://i.imgur.com/Nepflq3.png",
  "https://i.imgur.com/5LN2WR9.png",
  "https://i.imgur.com/WivCyrX.png",
  "https://i.imgur.com/X4NoDrf.png",
  "https://i.imgur.com/cUVnqbR.png",
  "https://i.imgur.com/lkEn03q.png",
  "https://i.imgur.com/xxOYSN2.png",
  "https://i.imgur.com/U5ry6ZB.png",
  "https://i.imgur.com/NxBd6LS.png",
  "https://i.imgur.com/Qku23kG.png",
  "https://i.imgur.com/KM0X730.png",
  "https://i.imgur.com/9WsOQno.png"
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
