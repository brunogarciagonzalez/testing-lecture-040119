// required modules
import React, { Component } from "react";
import { connect } from "react-redux";
// other
import BandForm from "./components/BandForm";
import BandsContainer from "./components/BandsContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BandForm addBand={this.props.addBand} />
        <BandsContainer
          bands={this.props.bands}
          deleteBand={this.props.deleteBand}
        />
      </div>
    );
  }
}

const mapStateToProps = (storeState) => {
return { bands: storeState. bands };

}

const mapDispatchToProps = dispatch => ({
  addBand: name => dispatch({ type: "ADD_BAND", name }),
  deleteBand: id => dispatch({ type: "DELETE_BAND", id })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
