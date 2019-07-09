// required modules
import React, { Component } from "react";

class BandForm extends Component {
  constructor() {
    super();

    this.state = {
      input: ""
    };
  }

  handleOnChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.addBand(this.state.input);
    this.setState({
      input: ""
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleOnSubmit}>
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleOnChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default BandForm;
