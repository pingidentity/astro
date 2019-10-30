import React from "react";
import _ from "underscore";
import DetailsTooltip, { detailsWidths } from "ui-library/lib/components/tooltips/DetailsTooltip";
import Button from "ui-library/lib/components/buttons/Button";
import HR from "ui-library/lib/components/general/HR";
import ButtonGroup from "ui-library/lib/components/layout/ButtonGroup";
import Anchor from "ui-library/lib/components/general/Anchor";
import Padding from "ui-library/lib/components/layout/Padding";


/**
* @name DetailsTooltipDemo
* @memberof DetailsTooltip
* @desc A demo for DetailsTooltip
*/
class DetailsTooltipDemo extends React.Component {
    constructor(props) {
        super(props);
        var initState = {};

        for (var i=1; i<=this.numDemos; i+=1) {
            initState["open" + i] = false;
            initState["status" + i] = "";
        }

        initState.open4 = true; // tooltip that is open by default

        this.state = initState;
    }

    static flags = ["p-stateful", "use-portal"];

    numDemos = 9;

    _handleToggle = index => () => {
        var newState = {};

        newState["open" + index] = !this.state["open" + index];

        this.setState(newState);
    };

    _handleConfirm = index => () => {
        var newState = {};

        newState["status" + index] = "confirmed";
        this._handleToggle(index)();

        this.setState(newState);
    };

    _handleCancel = index => () => {
        var newState = {};

        newState["status" + index] = "cancelled";
        this._handleToggle(index)();

        this.setState(newState);
    };

    _handleDiscard = index => () => {
        var newState = {};

        newState["status" + index] = "changes discarded";
        this._handleToggle(index)();

        this.setState(newState);
    };

    render() {

        const secondaryArr = [
            { value: this._handleCancel(8), label: "One" },
            { value: this._handleCancel(8), label: "Two" }
        ];

        const primaryArr = [
            { value: this._handleConfirm(8), label: "Save" }
        ];

        return (
            <div className="controls">
                <DetailsTooltip
                    stateless={true}
                    placement="bottom right"
                    label="With a label (label is passed into component)"
                    title="Tooltip Title"
                    open={this.state.open1}
                    onToggle={this._handleToggle(1)}
                >

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel(1)}
                    >
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm(1)} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>
                <div>{this.state.status1}</div>

                <br/>
                <Anchor onClick={this._handleToggle(2)}>Without label (label is outside component)</Anchor>
                <DetailsTooltip
                    stateless={true}
                    placement="bottom right"
                    title="Tooltip Title"
                    open={this.state.open2}
                    onToggle={this._handleToggle(2)}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel(2)}
                    >
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm(2)} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>

                <div>{this.state.status2}</div>

                <br/>
                <DetailsTooltip
                    stateless={true}
                    label={(<Button noSpacing className="delete-btn">Label as button</Button>)}
                    placement="bottom right"
                    title="Tooltip Title"
                    open={this.state.open3}
                    onToggle={this._handleToggle(3)}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel(3)}
                    >
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm(3)} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>
                <div>{this.state.status3}</div>

                <br/>
                <DetailsTooltip
                    stateless={true}
                    placement="bottom right"
                    label="Open by default"
                    title="Tooltip Title"
                    open={this.state.open4}
                    onToggle={this._handleToggle(4)}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel(4)}
                    >
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm(4)} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>
                <div>{this.state.status4}</div>

                <br/>
                <DetailsTooltip
                    stateless={true}
                    label="With alert styling"
                    type="alert"
                    positionClassName="" // this is to override the default positionClassName
                    title="Title won't display"
                    open={this.state.open5}
                    onToggle={this._handleToggle(5)}
                >
                    <div className="title">
                        Alert Title
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel(5)}
                    >
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm(5)} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>
                <div>{this.state.status5}</div>

                <br/>
                <DetailsTooltip
                    stateless={true}
                    placement="bottom right"
                    label="Three Buttons"
                    title="Three Buttons"
                    open={this.state.open6}
                    onToggle={this._handleToggle(6)}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel(6)}
                    >
                        <Button
                            data-id="confirm-action"
                            type="cancel"
                            onClick={this._handleDiscard(6)} >
                            Discard Changes
                        </Button>
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm(6)} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>
                <div>{this.state.status6}</div>

                <br/>
                <DetailsTooltip
                    stateless={true}
                    label="Alert styling with three buttons"
                    type="alert"
                    title="Tooltip Title"
                    open={this.state.open7}
                    onToggle={this._handleToggle(7)}>
                    <div className="title">Save Changes</div>
                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel(7)}
                    >
                        <Button
                            data-id="confirm-action"
                            type="cancel"
                            onClick={this._handleDiscard(7)} >
                            Discard Changes
                        </Button>
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm(7)} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>
                <div>{this.state.status7}</div>

                <br/>
                <DetailsTooltip
                    stateless={true}
                    label="Test passing buttons"
                    placement="bottom right"
                    title="Tooltip Title"
                    open={this.state.open8}
                    onToggle={this._handleToggle(8)}
                    secondaryLabels={secondaryArr}
                    primaryLabels={primaryArr}
                    cancelLabel="Cancel"
                >
                    <div className="title">Pass buttons</div>
                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                </DetailsTooltip>
                <div>{this.state.status8}</div>

                <br />
                <DetailsTooltip
                    flags={["p-stateful", "use-portal"]}
                    placement="bottom right"
                    label="Large details tool tip"
                    title="Tooltip Title"
                    open={this.state.open9}
                    onToggle={this._handleToggle(9)}
                    width={detailsWidths.LG}
                >

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel(9)}
                    >
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm(9)} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>
                <div>{this.state.status9}</div>

                <br/>
                <DetailsTooltip
                    placement="bottom right"
                    labelClassName="my-css-class"
                    label="Stateful tooltip"
                    title="Tooltip Title"
                    stateless={false}
                    onToggle={_.noop}>

                    <p>
                        Nothing fancy here.
                    </p>
                </DetailsTooltip>

                <HR />

                <Padding left="xl">
                    <DetailsTooltip
                        placement="bottom left"
                        labelClassName="my-css-class"
                        label="Hang on the left"
                        title="Tooltip Title"
                        stateless={false}>

                        <p>
                            Nothing fancy here.
                        </p>
                    </DetailsTooltip>
                </Padding>

                <br />

                <DetailsTooltip
                    placement="bottom"
                    labelClassName="my-css-class"
                    label="Hang center"
                    title="Tooltip Title"
                    stateless={false}>

                    <p>
                        Nothing fancy here.
                    </p>
                </DetailsTooltip>
            </div>
        );
    }
}

module.exports = DetailsTooltipDemo;

