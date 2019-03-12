import React, { Component } from "react";
import SuggestionItem from "../components/SuggestionItem";

class AuthorSuggestionList extends Component {
  render() {
    return (
      <div
        className={`author-suggestion-list flex-column ${
          this.props.showSuggestions
        }`}
      >
        {this.props.users
          ? this.props.users.map(user => (
              <SuggestionItem
                handleSuggestionCancel={this.props.handleSuggestionCancel}
                targetAuthor={this.props.targetAuthor}
                isDisabled={this.props.isDisabled}
                handleSuggestionClick={this.props.handleSuggestionClick}
                name={user.name}
              />
            ))
          : null}
      </div>
    );
  }
}

export default AuthorSuggestionList;
