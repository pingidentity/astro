import React from "react";
import ListView from "../../../templates/list-view/";

/**
* @name ListViewDemo
* @memberof ListView
* @desc A demo for ListView
*/
class ListViewDemo extends React.Component {
    render() {
        return (
            <ListView {...this.props} />
        );
    }
}

module.exports = ListViewDemo;
