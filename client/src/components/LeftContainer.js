import React, { Component } from "react";

class LeftContainer extends Component {
  render() {
    return (
      <section className="container-left flex-column">
        <div className="profile-snapshot flex-column">
          <div className="profile-snapshot-cover-image">
            <img className="cover-image-img" src="https://placehold.it/400x200/b46ccc" />
          </div>
          <div className="profile-snapshot-profile-image">
            <img className="profile-image-img" src={this.props.proPic} />
          </div>
          <div className="profile-snapshot-body flex-column">
            <div className="profile-snapshot-stats-row flex-row">
              <div className="profile-snapshot-stat">135 followers</div>
              <div className="profile-snapshot-stat">24 quotes</div>
            </div>
            <div className="profile-snapshot-pinned-quote">
              "The journey of a thousand miles begins with a single step."
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LeftContainer;
