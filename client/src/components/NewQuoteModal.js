import React, { Component } from "react";
import axios from "axios";
import AuthorInput from "../components/AuthorInput";

class NewQuoteModal extends Component {
  state = {
    quote_speaker: "",
    quote_body: "",
    showSuggestions: false,
    suggestedUsers: [],
    authorDisabled: false
  };
  initialState = {
    quote_speaker: "",
    quote_body: "",
    showSuggestions: false,
    suggestedUsers: [],
    authorDisabled: false
  };

  handleChange = (value, event) => {
    console.log(value);
    console.log(event.target.value);
    this.setState({ [value]: event.target.value });
    if (value === "quote_speaker" && event.target.value !== "") {
      axios
        .post("/api/search/allusers", {
          searchName: event.target.value
        })
        .then(res => {
          if (res.data.length > 0) {
            this.setState({
              showSuggestions: "true",
              suggestedUsers: res.data
            });
          } else {
            this.setState({
              showSuggestions: "false",
              suggestedUsers: null
            });
          }
        });
    } else {
      this.setState({
        showSuggestions: false,
        suggestedUsers: null
      });
    }
  };
  handleSuggestionClick = (name, event) => {
    this.setState({ quote_speaker: name, authorDisabled: true });
    console.log(this.state.quote_speaker);
  };
  handleSuggestionCancel = (name,event)=>{
      this.setState({
          showSuggestions:false,
          suggestedUsers:[],
          authorDisabled:false
      })
  }
  handleClose = event => {
    this.setState(this.initialState);
    this.props.handleClose(event);
  };
  submitQuote = event => {
    console.log(this.state);
    axios
      .post("/api/newquote", {
        quote_speaker: this.state.quote_speaker,
        quote_body: this.state.quote_body
      })
      .then(res => {
        console.log(res);
      });
    this.props.handleClose();
  };
  render() {
    return (
      <div className={`modalBackground ${this.props.showModal}`}>
        <div className="new-quote-modal">
          <div className="new-quote-close">
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={this.handleClose}
            />
          </div>
          <div className="flex-row new-quote modal-head">
            <span>Quote somebody!</span>
          </div>
          <div className="new-quote modal-body flex-column">
            <label>Author</label>
            <AuthorInput
              showSuggestions={this.state.showSuggestions}
              users={this.state.suggestedUsers}
              handleChange={this.handleChange}
              handleSuggestionClick={this.handleSuggestionClick}
              disabled={this.state.authorDisabled}
              targetAuthor={this.state.quote_speaker}
              handleSuggestionCancel={this.handleSuggestionCancel}
            />
            <label>Quote</label>
            <textarea
              className="new-quote quote-text"
              name="newQuoteText"
              placeholder="Quote"
              onChange={this.handleChange.bind(this, "quote_body")}
            />
            <div onClick={this.submitQuote} className="new-quote quote-submit">
              Submit quote!
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewQuoteModal;
