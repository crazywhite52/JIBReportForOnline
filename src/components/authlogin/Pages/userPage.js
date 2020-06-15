import React, { Component } from 'react';

export default class userpage extends Component {
    state={
        user:'',
        pass:''
    }



  render() {
    return (
      <div> {this.props.user} {this.props.pass}</div>
    );
  }
}
