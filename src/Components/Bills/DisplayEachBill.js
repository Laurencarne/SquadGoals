import React from "react";

class DisplayEachBill extends React.Component {
  render() {
    return <div className="billDiv">{this.props.renderPage()}</div>;
  }
}

export default DisplayEachBill;
