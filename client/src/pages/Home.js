import React, { Component } from "react";

import axios from "axios";
import CenterContainer from "../components/CenterContainer";
import LeftContainer from "../components/LeftContainer";
import RightContainer from "../components/RightContainer";
import HomeHeader from "../components/HomeHeader";
import NewQuoteModal from "../components/NewQuoteModal";

class Home extends Component {
  state = {
    quotes: [],
    proPic: "",
    showModal: false
  };
  onWitness = (witnessQuoteId, index, event) => {
    axios
      .post("/api/newwitness", { quoteId: witnessQuoteId })
      .then(response => {
        if (response.data.Witness) {
          const quotesCopy = this.state.quotes.slice(0);
          quotesCopy[index].Witnesses.push(response.data.Witness);
          this.setState({ quotes: quotesCopy });
        } else {
          let witnessCopy = this.state.quotes[index].Witnesses.slice(0);
          for (let witness in witnessCopy) {
            if (witnessCopy[witness].UserId === response.data.Deleted) {
              witnessCopy = witnessCopy
                .slice(0, witness)
                .concat(witnessCopy.slice(witness + 1));
              break;
            }
          }
          const quotesCopy = this.state.quotes.slice(0);
          quotesCopy[index].Witnesses = witnessCopy;
          this.setState({ quotes: quotesCopy });
        }
      });
  };
  componentDidMount() {
    this.getAllQuotes();
  }
  getAllQuotes = () => {
    axios.get("/api/allquotes").then(res => {
        this.setState({ quotes: res.data.quotes, proPic: res.data.proPic });
    });
  };
  
  displayModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        <HomeHeader displayModal={this.displayModal} />
        <NewQuoteModal
          showModal={this.state.showModal}
          handleClose={this.hideModal}
        />
        <div className="container flex-row">
          <LeftContainer proPic={this.state.proPic} />
          <CenterContainer
            onWitness={this.onWitness}
            quotes={this.state.quotes}
          />
          <RightContainer proPic={this.state.proPic} />
        </div>
      </div>
    );
  }
}
export default Home;
