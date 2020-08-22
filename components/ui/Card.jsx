import React, { Component } from "react";

const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

class Card extends Component {
  render() {
    return (
      <div
        className={
          "Card bg-white rounded-md mb-4 shadow-xs " +
          (this.props.children ? this.props.children : "")
        }
      >
        {this.props.children}
      </div>
    );
  }
}

Card.Content = CardContent;

export default Card;
