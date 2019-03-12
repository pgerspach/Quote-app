import React, { Component } from "react";
import Quote from "../components/Quote";


class CenterContainer extends Component {
  render() {
    return (
      <section className="container-center flex-column">
        {this.props.quotes.map((quote, index) => (
          <Quote key = {quote.id} index = {index} onWitness = {this.props.onWitness} quote={quote} className="feed flex-column" />
        ))}
      </section>
    );
  }
}

export default CenterContainer;
