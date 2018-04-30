import React, { Component } from "react";
import Button from "../../../components/buttons/Button";

/**
 * @name ButtonDemo
 * @memberof Button
 * @desc A demo for Button
 */

class ButtonsDemo extends Component {

    state = {
        loading1: false,
        loading2: false
    };

    numDemos = 3;

    componentWillMount() {
        var i;

        for (i=1; i<=this.numDemos; i+=1) {
            this["_toggleLoadingButton" + i] = this._toggleLoadingButton.bind(null, i);
        }
    }

    _toggleLoadingButton = (i) => {
        var newState = {};

        newState["loading" + i] = !this.state["loading" + i];

        this.setState(newState);
    };

    render() {
        return (
            <div>
                <Button
                    label="Button"
                />
                <Button
                    label="Primary"
                    className="primary"
                />
                <Button
                    label="Secondary"
                />
                <Button
                    label="Success"
                    className="success"
                />
                <Button
                    label="Cancel"
                    className="cancel"
                />
                <Button
                    label="Danger"
                    className="danger"
                />
                <Button
                    label="Inline"
                    inline
                />
                <Button
                    label="Inline"
                    inline>
                        <span className="badge">4</span>
                </Button>
                <br /><br />
                <Button
                    label="Add"
                    iconName="add"
                />
                <Button
                    label="Download"
                    iconName="download"
                />
                <Button
                    iconName="edit"
                    inline
                />
                <Button
                    iconName="plus"
                    inline
                />
                <Button
                    iconName="delete"
                    inline
                />
                <Button
                    iconName="prev"
                    inline
                />
                <Button
                    iconName="next"
                    inline
                />
                <br /> <br />
                <Button
                    label="Ellipsis Loader Primary Button"
                    className="primary"
                    loading={this.state.loading1}
                    onClick={this._toggleLoadingButton1}
                />
                <Button
                    label="Ellipsis Loader Secondary Button"
                    className="secondary"
                    loading={this.state.loading2}
                    onClick={this._toggleLoadingButton2}
                />
                <Button
                    label="Inline Ellipsis Button"
                    className="secondary"
                    inline
                    loading={this.state.loading3}
                    onClick={this._toggleLoadingButton3}
                />
            </div>
        );
    }
}

module.exports = ButtonsDemo;