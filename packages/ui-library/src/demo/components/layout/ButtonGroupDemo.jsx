import React from "react";
import Button from "ui-library/lib/components/buttons/Button";
import ButtonGroup from "ui-library/lib/components/layout/ButtonGroup";
import HR from "ui-library/lib/components/general/HR";

/**
* @name ButtonGroupDemo
* @memberof ButtonGroup
* @desc A demo for ButtonGroup
*/

export default class ButtonGroupDemo extends React.Component {
    state ={};

    _makeHandleCancel = index => () => this.setState({ [`canceled${index}`]: true, [`primary${index}`]: false });
    _makeHandlePrimary = index => () => this.setState({ [`canceled${index}`]: false, [`primary${index}`]: true });
    _makeHandleDiscard = index => () => this.setState({ [`canceled${index}`]: false, [`primary${index}`]: false });

    render() {
        return (
            <div>
                <ButtonGroup
                    onCancel={this._makeHandleCancel(1)}
                >
                    <Button
                        type="cancel"
                        onClick={this._handleDiscard1}
                    >
                        Discard Changes
                    </Button>
                    <Button onClick={this._makeHandlePrimary(1)} type={Button.buttonTypes.PRIMARY}>
                        Confirm
                    </Button>
                </ButtonGroup>
                <p>
                    {this.state.canceled1 && "Canceled"}
                    {this.state.primary1 && "Confirmed"}
                </p>
                <HR />
                <ButtonGroup
                    onCancel={this._makeHandleCancel(2)}
                    cancelLabel="No"
                >
                    <Button
                        onClick={this._makeHandlePrimary(2)}
                    >
                        Yes
                    </Button>
                </ButtonGroup>
                <p>
                    {this.state.canceled2 && "Canceled"}
                    {this.state.primary2 && "Confirmed"}
                </p>
            </div>
        );
    }
}
