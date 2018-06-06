import React, { Component } from "react";
import PageSpinner from "../../../components/general/PageSpinner";

/**
* @name PageSpinnerDemo
* @memberof PageSpinner
* @desc A demo for PageSpinner
*/

export default class PageSpinnerDemo extends Component {
    state = {
        showSpinner: true
    };

    _toggleSpinner = () => {
        this.setState({
            showSpinner: !this.state.showSpinner
        });
    };
    render() {
        return (
            <PageSpinner show={this.state.showSpinner}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </PageSpinner>
        );
    }
}