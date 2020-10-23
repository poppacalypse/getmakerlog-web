import React, { Component } from "react";

const CardContent = ({ children, className = "" }) => {
	return <div className={"p-4 " + className}>{children}</div>;
};

class Card extends Component {
	render() {
		return (
			<div
				className={
					"Card bg-white rounded-md mb-4 shadow-xs last:mb-0 " +
					(this.props.className ? this.props.className : "")
				}
			>
				{this.props.children}
			</div>
		);
	}
}

Card.Content = CardContent;

export default Card;
