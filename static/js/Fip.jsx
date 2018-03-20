import React from "react";

var $ = require('jquery');

export default class Fip extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      name:props.name
    }
  }

  componentWillMount(){
        this.style = {
            position:'absolute',
            left: this.props.xpos + 'px',
            top: this.props.ypos + 'px',
            width: '140px'
        };
  }

  render(){
    return <div style={this.style}>{this.props.name}</div>
  }
}
