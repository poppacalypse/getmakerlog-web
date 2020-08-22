import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";

class ErrorCard extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <div className="nyan absolute right-1 top-6 opacity-50 ">
            <img
              className="h-48 transform -rotate-45"
              style={{ "--transform-rotate": "-25deg" }}
              src="https://lh3.googleusercontent.com/proxy/JnApuuSA3rYDaFG5s09mFriT-ZYYTTVK9mqjaubhzIMBWJgtHrn888aHOIol3Hf1rs3lZsK9eUrZ-zEGF6T5NQrqbAN59meDumsGAizYy8QPXDu8go9L"
              alt=""
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            Oops, something went wrong.
          </h1>
          <p className="mb-4 text-gray-700">
            {this.props.message
              ? this.props.message
              : "An unknown error ocurred."}
          </p>
          {this.props.actions ? this.props.actions : null}
        </Card.Content>
      </Card>
    );
  }
}

export default ErrorCard;
