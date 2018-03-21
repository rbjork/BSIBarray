import React from "react";

var $ = require('jquery');

export default class Fip extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      name:props.name
    }
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(){
    var fip = this.props.id.split('_')[1];
    this.props.onChange(fip);
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
    return <div style={this.style} onClick={this.onClickHandler}>{this.props.name}</div>
  }
}
