import React from "react";

var $ = require('jquery');

export default class Field extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        name:props.name,
        id:props.id
    }
    this.renderDisplay = this.renderDisplay.bind(this)
    this.edit = this.edit.bind(this)
  }

  componentWillMount(){
        this.style = {
            position:'absolute',
            left: this.props.xpos + 'px',
            top: this.props.ypos + 'px',
            width: '140px'
        };
        this.buttonStyle = {
            width: '140px',
            fontSize: '14px'
        }
  }

  edit(e) {
    var c = $(e.currentTarget).attr('name');
		this.setState({
			   editing: true
		})
    this.props.onChange(c,this.props.id)
	}

  renderDisplay() {
		return (
			<div className="note" style={this.style}>
				<span>
					<a style={this.buttonStyle} onClick={this.edit} name={this.props.name} id={this.props.id} onClick={this.edit}>{this.props.name}</a>
				</span>
			</div>
		)
	}

  render () {
    return this.renderDisplay()
  }
}
