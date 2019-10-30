import React, { Component } from "react";
import Button, { buttonTypes } from "../../../components/buttons/Button";
import HR from "ui-library/lib/components/general/HR";

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

    _toggleLoadingButton = i => () => {
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
                    type={buttonTypes.PRIMARY}
                />
                <Button
                    label="Success"
                    type={buttonTypes.SUCCESS}
                />
                <Button
                    label="Cancel"
                    type={buttonTypes.CANCEL}
                />
                <Button
                    label="Danger"
                    type={buttonTypes.DANGER}
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
                <Button
                    label="Here's a Link Button"
                    inline
                    type={buttonTypes.LINK}
                />
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
                <HR />
                <Button
                    label="Ellipsis Loader Primary Button"
                    type={buttonTypes.PRIMARY}
                    loading={this.state.loading1}
                    onClick={this._toggleLoadingButton(1)}
                />
                <Button
                    label="Ellipsis Loader Secondary Button"
                    type={buttonTypes.SECONDARY}
                    loading={this.state.loading2}
                    onClick={this._toggleLoadingButton(2)}
                />
                <Button
                    label="Inline Ellipsis Button"
                    type={buttonTypes.SECONDARY}
                    inline
                    loading={this.state.loading3}
                    onClick={this._toggleLoadingButton(3)}
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
                    type={buttonTypes.PRIMARY}
                    disabled={true}
                    label="Disabled with Help Hint"
                    disabledText="helphint"
                />
            </div>
        );
    }
}

module.exports = ButtonsDemo;
