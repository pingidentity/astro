import React, { Component } from "react";
import Button from "../../../components/buttons/Button";
import HR from "ui-library/lib/components/general/HR";

/**
 * @name ButtonDemo
 * @memberof Button
 * @desc A demo for Button
 */

class ButtonsDemo extends Component {
    static flags = [ "add-button-margin" ];

    constructor(props) {
        super(props);
        var i;

        for (i=1; i<=this.numDemos; i+=1) {
            this["_toggleLoadingButton" + i] = this._toggleLoadingButton.bind(null, i);
        }
    }

    state = {
        loading1: false,
        loading2: false
    };

    numDemos = 3;

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
                    submit
                />
                <Button
                    label="Primary"
                    type="primary"
                />
                <Button
                    label="Success"
                    type="success"
                />
                <Button
                    label="Cancel"
                    type="cancel"
                />
                <Button
                    label="Danger"
                    type="danger"
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
                    flags={this.props.flags}
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
                <HR />
                <Button
                    label="Ellipsis Loader Primary Button"
                    type="primary"
                    loading={this.state.loading1}
                    onClick={this._toggleLoadingButton1}
                />
                <Button
                    label="Ellipsis Loader Secondary Button"
                    type="secondary"
                    loading={this.state.loading2}
                    onClick={this._toggleLoadingButton2}
                />
                <Button
                    label="Inline Ellipsis Button"
                    type="secondary"
                    inline
                    loading={this.state.loading3}
                    onClick={this._toggleLoadingButton3}
                />
                <Button
                    label="Documentation"
                    href="/build-doc/ui-library/3.5.0-SNAPSHOT/index.html"
                    target="_blank"
                />
                <HR />
                <Button
                    label="Activated"
                    active
                />
                <Button
                    label="Activated"
                    active
                    inline
                />
                <HR />
                <Button
                    type="primary"
                    disabled={true}
                    label="Disabled with Help Hint"
                    disabledText="helphint"
                />
            </div>
        );
    }
}

module.exports = ButtonsDemo;