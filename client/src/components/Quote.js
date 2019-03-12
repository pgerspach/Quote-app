import React, { Component } from "react";

class Quote extends Component {
  witnessClick=()=>{
    this.props.onWitness.bind(this,this.props.quote.id, this.props.index)();
  }
  render() {
    return (
        <div id={this.props.quote.id} className="quote-item flex-column">
          <div className="quote-text">"{this.props.quote.quote_body}"</div>
          <div className="quote-author">{this.props.quote.quote_speaker}</div>
          <div className="quote-attributes">
            <span value={this.props.quote.Witnesses.length} id="witness-count">
              {this.props.quote.Witnesses.length}
            </span>
            <i
              name="witness"
              className="fa fa-eye"
              onClick={this.witnessClick}
              aria-hidden="true"
            />
            <i className="fa fa-heart" aria-hidden="true" />
          </div>
        </div>
    );
  }
}

export default Quote;
