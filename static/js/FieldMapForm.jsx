import React from "react";
import { Button, Grid, Row, Col } from "react-bootstrap";
import { PageHeader } from "react-bootstrap";

import Field from "./Field"
import Target from "./Target"
import Note from "./Note"
import Fip from "./Fip"

require('../css/fullstack.css');

var $ = require('jquery');

export default class FieldMapForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      fields: [],
      targets: [],
      fips: [],
      assigned: {},
      assignments: [],   // Not used yet // NEW APPROACH
      currentField:"field_1"
    }

    //this.getPythonFieldMap = this.getPythonFieldMap.bind(this);
    this.addSource = this.addSource.bind(this);
    this.addTarget = this.addTarget.bind(this);
    this.eachField = this.eachField.bind(this);
    this.eachTarget = this.eachTarget.bind(this);
    this.updateField = this.updateField.bind(this);
    this.updateTarget = this.updateTarget.bind(this);
    this.resetTarget = this.resetTarget.bind(this);
    this.doMapping = this.doMapping.bind(this);
    this.updateFieldRendering = this.updateFieldRendering.bind(this);
    this.getFips = this.getFips.bind(this);
    this.getTargets = this.getTargets.bind(this);
    this.getFields = this.getFields.bind(this);
    this.loadForm = this.loadForm.bind(this);
    this.eachFip = this.eachFip.bind(this);
    this.addFip = this.addFip.bind(this);
    this.getfieldIDbyName = this.getfieldIDbyName.bind(this);
  }

  componentWillMount(){  // Stolen from lynda.com course files
      var self = this
      console.log("in componentWillMount");

      this.currentfieldstyle = {
        position:'absolute',
        left: '600px',
      };

      this.style = {
          backgroundColor: "#333333",
          fontSize: "12px"
      };
  }

  doMapping(){
    console.log("doMapping")
  }

  getFields(){
    var self = this
    fetch('http://127.0.0.1:5000/getfields')
          .then(response => response.json())
          .then(json => {
                for(var i=0; i<json.length; i++){
                  self.addSource(json[i])
                }
              }
          );
  }

  getTargets(){
    var self = this
    fetch('http://127.0.0.1:5000/gettargets')
          .then(response => response.json())
          .then(json => {
                for(var i=0; i<json.length; i++){
                  self.addTarget(json[i])
                }
              }
          );
  }

  loadForm(){
    this.getFields();
    this.getTargets();
  }

  getFips(){
    var self = this
    fetch('http://127.0.0.1:5000/getfips')
          .then(response => response.json())
          .then(json => {
                for(var i=0; i<json.length; i++){
                  self.addFip(json[i])
                }
              }
          );
  }

  addSource(field){
        this.setState(prevState => ({
            fields: [
                ...prevState.fields,
                {
                  name:field.name,
                  id:field.id
                }
            ],
            currentField:0
        }))
    }

  addTarget(field){
        this.setState(prevState => ({
            targets: [
                ...prevState.fields,
                {
                  name:field.name,
                  id:field.id
                }
            ]
        }))
    }

  addFip(fip){
        this.setState(prevState => ({
            fips: [
                ...prevState.fips,
                {
                  name:fip
                }
            ]
        }))
    }

  updateField(name,id){
    $("#activefield").val(name)
    this.setState({
      currentField:id
    })
  }

  updateFieldRendering(currentField, checked){
    for(var fieldID in this.state.fields){
      $("#field_"+fieldID).css("backgroundColor","#cccccc");
    }
    for(var field in this.state.assigned){
      if(this.state.assigned[field]){
        $("#"+field).css("backgroundColor","#666666");
      }
    }
    $("#"+currentField).css("backgroundColor","#9099ff")
  }


  updateTarget(tname,targetID){

    var field = this.state.currentField;  // Current source
    var name = $("#"+field).attr('name');  // name attribute of current source
    //var checked = $("#"+targetID).attr('name');
    if($("input[type='checkbox'][name='"+tname+"']").is(':checked')){

      $("#"+targetID).html(name);  // Make assigment to target for display.
      this.state.assigned[field] = true;  // store assign status of field

      var assignment = {"source": field, "target": targetID};  // NEW APPROACH
      this.state.assigments.push(assignment); // NEW APPROACH

      var nextField = field;

      // Check if all assignments have been made
      if(Object.keys(this.state.assigned).length == this.state.targets.length){
        return; // All targets are assigned
      }

      // Finds next unassigned source field
      do{
        var nextIndex = parseInt(nextField.split('_')[1]) + 1;
        if(nextIndex > this.state.fields.length)nextIndex = 1;
        nextField = "field_"+nextIndex;
      }while(this.state.assigned[nextField]) // Finds first on assigned

      this.setState({
        currentField:nextField
      })
      var val = $("#"+nextField).attr('name');  // get the first unassigned source field

      $("#activefield").val(val);
      this.updateFieldRendering(nextField,true);

    }else{

      // Get the source of the click event 'targetID' and
      // Then we get the source name inside the element.
      // We then search for the field id associated with sourceName

      var sourceName = $("span[id='"+targetID+"']").html()
      var sourceID = this.getfieldIDbyName(sourceName)
      var fieldID = "field_" + sourceID;
      $("span[id='"+targetID+"']").html("") // CLEAR
      this.state.assigned[fieldID] = false;

      this.updateFieldRendering(field,false);
    }
  }

  getfieldIDbyName(name){
    for(var i=0; i< this.state.fields.length; i++){
      var f = this.state.fields[i]
      if(f.name == name){
        return f.id;
      }
    }
    return "";
  }

  resetTarget(name,targetID, sourceID){
    $("#"+targetID).html("");
    var name = $("#"+sourceID).attr('name');
    $("#activefield").val(name);
    delete this.state.assigned[name];
  }

  eachField(field,i){
    var x = 100;
    var y = i * 18 + 100;
    return (
        <Field xpos={x} ypos={y}
          name={field.name} id={"field_"+i} onChange={this.updateField}>
        </Field>
    )
  }

  eachTarget(field,i){
    var x = Math.floor(i/10)*140 + 300;
    var y = (i % 10)*65 + 100;
    return (
        <Target xpos={x} ypos={y} name={field.name} id={"target_"+i} onChange={this.updateTarget} >
        </Target>
    )
  }

  eachFip(fip, i){
    var x = 10;
    var y = i * 18 + 100;
    return (
      <Fip xpos={x} ypos={y}
        name={fip.name} id={"fip_"+i} >
        {fip.name}
      </Fip>
    )
  }

  render () {
    return (
      <PageHeader>
          <div className='header-contents'>
              <input style={this.currentfieldstyle} id="activefield" type="text"></input>
              <div   >
                  {this.state.fips.map(this.eachFip)}
              </div>
              <div >
                {this.state.fields.map(this.eachField)}
              </div>
              <div   >
                {this.state.targets.map(this.eachTarget)}
              </div>
              <button onClick={this.doMapping}>Map Now</button>
              <button onClick={this.loadForm}>Load</button>
              <button onClick={this.getFips}>FIPS</button>
          </div>
      </PageHeader>
    )
  }
}
