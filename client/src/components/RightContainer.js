import React, { Component } from "react";

{/* <img class="avatar" src="img/one.jpg" alt="Not Found" onerror=this.src="img/undefined.jpg"> */}


class RightContainer extends Component {
  render() {
    return (
      <section className="container-right flex-column">
        <div className="groups-snapshot flex-column">
          <div className="groups-snapshot-head">Groups</div>
          <div className="group-snapshot-item flex-row">
            <div className="group-snapshot-item-image flex-column">
              <img className="group-image-img" src="https://placehold.it/200/b46ccc" alt="Not Found"/>
            </div>
            <div className="group-snapshot-item-title">Swiss miss</div>
            <div className="group-snapshot-item-users">
              <i className="fa fa-users" aria-hidden="true" />
            </div>
          </div>
          <div className="group-snapshot-item flex-row">
            <div className="group-snapshot-item-image flex-column">
              <img className="group-image-img" src="https://placehold.it/200/b46ccc" />
            </div>
            <div className="group-snapshot-item-title">Four Horsemen</div>
            <div className="group-snapshot-item-users">
              <i className="fa fa-users" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default RightContainer;
