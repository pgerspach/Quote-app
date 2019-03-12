import React, { Component } from "react";

class SuggestionItem extends Component {

  render() {
    console.log(this.props.targetAuthor);
    return (
      <div onClick = {this.props.handleSuggestionClick.bind(this,this.props.name)}className={`suggestion-item ${!(this.props.isDisabled && !(this.props.targetAuthor===this.props.name))}`}>
        {this.props.name}
        <i onClick={this.props.handleSuggestionCancel}className = {`fa fa-times ${this.props.isDisabled}`}></i>
      </div>
    );
  }
}

export default SuggestionItem;
