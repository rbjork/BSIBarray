import React from "react";
import Hello from "./Hello";
import { PageHeader } from "react-bootstrap";
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';

import FieldMapForm from './FieldMapForm';


require('../css/fullstack.css');
var $ = require('jquery');

import HeaderBackgroundImage from '../images/header.jpg';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    // addHeaderImg() {
    //     let headerBg = new Image();
    //     headerBg.src = HeaderBackgroundImage;
    // }

    render () {
        return (
          <Tabs
                defaultTab="one"
                onChange={(tabId) => { console.log(tabId) }}
            >
            <TabList>
                <Tab tabFor="one" className="nolietab">MAP FIELDS</Tab>
                <Tab tabFor="two" className="nolietab">VERIFY AND COUNT</Tab>
                <Tab tabFor="three" className="nolietab">EXECUTE EXPORT</Tab>
            </TabList>
            <TabPanel tabId="one">
                <FieldMapForm/>
            </TabPanel>
            <TabPanel tabId="two">
                <FieldMapForm/>
            </TabPanel>
            <TabPanel tabId="three">
                <FieldMapForm/>
            </TabPanel>
          </Tabs>
        );
    }
}
