import React from "react";
var $ = require('jquery');

const sourcestyle ={
  color:"#336699",
  fontSize: "14px",

}

export default class Target extends React.Component {
  constructor(props){

    super(props)
    this.state = {
      name:props.name,
      id:props.id,
      source:"",
      sourceID:""
    }

    this.renderDisplay = this.renderDisplay.bind(this)

    this.edit = this.edit.bind(this)
    this.onClickHandler = this.onClickHandler.bind(this)
    this.reset = this.reset.bind(this)
  }



  // renderDisplay(){
  //   return (<div><p>{this.props.children}</p><input type="checkbox"></input></div>)
  // }

  edit(e) {
    var c = $(e.currentTarget).attr('name');
		this.setState({
			editing: true,
		})
    this.props.onChange(c,this.props.id)
	}

  reset(e){
    var c = $(e.currentTarget).attr('name');
    //this.props.onReset(c,this.props.id,this.props.source)
  }

  onClickHandler(e){
    if(e.type === 'click'){
      this.edit(e) ;
    }
    else if (e.type === 'contextmenu'){
      //this.reset(e);
    }
  }

  componentWillMount(){
        this.style = {
            position:'absolute',
            left: this.props.xpos + 'px',
            top: this.props.ypos + 'px',
            backgroundColor: "#f0f0f0"
        };
  }

  renderDisplay() {
		return (
			<div className="note" style={this.style}>

				<span onClick={this.reset}>
					<input type="checkbox" name={this.props.name} onClick={this.onClickHandler} value={this.props.name}></input><label > {this.props.name}</label><br></br>
          <span id={this.props.id} style={sourcestyle}>{this.props.source}</span>
				</span>
			</div>
		)
	}

  render () {
    return this.renderDisplay()
  }
}
