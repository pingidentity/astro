import React from "react";
import EditPage from "../../../templates/edit-page/EditPage";

/**
* @name EditPageDemo
* @memberof EditPage
* @desc A demo for EditPage
*/
export default class EditPageDemo extends React.Component {
    render() {
        return (<EditPage {...this.props} />);
    }
}