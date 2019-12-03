import React, { Component } from "react";
import Button, { buttonTypes } from "../../../components/buttons/Button";
import HR from "ui-library/lib/components/general/HR";
import Text from "ui-library/lib/components/general/Text";

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
                    label="Robot"
                    iconName="robot"
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
                <Button
                    iconName="clear"
                    inline
                />
                <Button
                    iconName="cog"
                    inline
                    label="Configure"
                />
                <HR />
                <Text>Loading States (click to show ellipsis)</Text>
                <Button
                    label="Primary"
                    type={buttonTypes.PRIMARY}
                    loading={this.state.loading1}
                    onClick={this._toggleLoadingButton(1)}
                />
                <Button
                    label="Secondary"
                    type={buttonTypes.SECONDARY}
                    loading={this.state.loading2}
                    onClick={this._toggleLoadingButton(2)}
                />
                <Button
                    label="Inline"
                    type={buttonTypes.SECONDARY}
                    inline
                    loading={this.state.loading3}
                    onClick={this._toggleLoadingButton(3)}
                />
                <Button
                    label="Link"
                    type={buttonTypes.LINK}
                    loading={this.state.loading4}
                    onClick={this._toggleLoadingButton(4)}
                />
                <HR />
                <Button
                    label="With Href"
                    href="https://www.pingidentity.com"
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
