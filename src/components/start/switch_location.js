import React, { Component } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

export default class switch_location extends Component {
  constructor(props) {
    super(props);
    this.handleSwitchA = this.handleSwitchA.bind(this);
    this.handleSwitchB = this.handleSwitchB.bind(this);
    this.handleSwitchC = this.handleSwitchC.bind(this);

    this.state = {
      checkedA: this.props.isH === "true" ? true : false,
      checkedB: this.props.hLoad === "true" ? true : false,
      checkedC: this.props.st === "true" ? true : false
    };
  }

  handleSwitchA(e) {
    this.setState(
      {
        checkedA: !this.state.checkedA
      },
      () => {
        this.props.checkedA(this.state.checkedA);
        console.log(this.state.checkedA);
      }
    );
  }
  handleSwitchB(e) {
    this.setState(
      {
        checkedB: !this.state.checkedB
      },
      () => {
        this.props.checkedB(this.state.checkedB);
        console.log(this.state.checkedB);
      }
    );
  }
  handleSwitchC(e) {
    this.setState(
      {
        checkedC: !this.state.checkedC
      },
      () => {
        this.props.checkedC(this.state.checkedC);
        console.log(this.state.checkedC);
      }
    );
  }

  render() {
    return (
      <div>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedA}
              color="primary"
              onClick={this.handleSwitchA}
            />
          }
          label={"IsHigh"}
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedB}
              color="primary"
              onClick={this.handleSwitchB}
            />
          }
          label={"HeavyLoad"}
        />
        <FormControlLabel
          control={
            <Switch
              checked={this.state.checkedC}
              color="primary"
              onClick={this.handleSwitchC}
            />
          }
          label={"Status"}
        />
      </div>
    );
  }
}
