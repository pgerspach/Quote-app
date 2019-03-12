import React, { Component } from "react";

class HomeHeader extends Component {
  render() {
    return (
      <header className="page_header flex-row">
        <h1 className="page_title">Quote</h1>
        <input className="search-bar" placeholder="Search" />
        <div className="navigations">
          <i className="fa fa-quote-left icon-new-quote" aria-hidden="true" onClick={this.props.displayModal}/>
          <i
            id="signOut"
            className="fa fa-user icon-profile"
            aria-hidden="true"
          />
          <i className="fa fa-cog icon-settings" aria-hidden="true" />
        </div>
      </header>
    );
  }
}

export default HomeHeader;
