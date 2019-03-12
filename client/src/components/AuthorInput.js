import React, { Component } from "react";
import AuthorSuggestionList from "../components/AuthorSuggestionList";

class AuthorInput extends Component {

  render() {
    return (
      <div className={`author-input flex-column`}>
        <input
          className="new-quote quote-author"
          name="newQuoteAuthor"
          placeholder="Author name"
          onChange={this.props.handleChange.bind(this, "quote_speaker")}
          disabled={this.props.disabled}
        />
        <AuthorSuggestionList
          handleSuggestionClick={this.props.handleSuggestionClick}
          users={this.props.users}
          showSuggestions={this.props.showSuggestions}
          isDisabled={this.props.disabled}
          targetAuthor={this.props.targetAuthor}
          handleSuggestionCancel={this.props.handleSuggestionCancel}
        />
      </div>
    );
  }
}

export default AuthorInput;
