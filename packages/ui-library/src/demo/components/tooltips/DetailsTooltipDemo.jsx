import React from "react";
import _ from "underscore";
import DetailsTooltip from "ui-library/lib/components/tooltips/DetailsTooltip";
import Button from "ui-library/lib/components/buttons/Button";
import HR from "ui-library/lib/components/general/HR";
import ButtonGroup from "ui-library/lib/components/layout/ButtonGroup";

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

    _toggle = (index) => {
        var newState = {};

        newState["open" + index] = !this.state["open" + index];

        this.setState(newState);
    };

    _confirm = (index) => {
        var newState = {};

        newState["status" + index] = "confirmed";
        this._toggle(index);

        this.setState(newState);
    };

    _cancel = (index) => {
        var newState = {};

        newState["status" + index] = "cancelled";
        this._toggle(index);

        this.setState(newState);
    };

    _discard = (index) => {
        var newState = {};

        newState["status" + index] = "changes discarded";
        this._toggle(index);

        this.setState(newState);
    };

    componentDidMount() {
        for (var i=1; i<=this.numDemos; i+=1) {
            this["_handleToggle" + i] = this._toggle.bind(null, i);
            this["_handleCancel" + i] = this._cancel.bind(null, i);
            this["_handleConfirm" + i] = this._confirm.bind(null, i);
            this["_handleDiscard" + i] = this._discard.bind(null, i);
        }
    }

    render() {

        const secondaryArr = [
            { value: this._handleCancel8, label: "One" },
            { value: this._handleCancel8, label: "Two" }
        ];

        const primaryArr = [
            { value: this._handleConfirm8, label: "Save" }
        ];

        const { flags } = this.props;

        return (
            <div className="controls">
                <DetailsTooltip
                    flags={flags}
                    stateless={true}
                    positionClassName="bottom right"
                    label="With a label (label is passed into component)"
                    title="Tooltip Title"
                    open={this.state.open1}
                    onToggle={this._handleToggle1}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel1}
                    >
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm1} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>
                <div>{this.state.status1}</div>

                <br/>
                <a onClick={this._handleToggle2}>Without label (label is outside component)</a>
                <DetailsTooltip
                    flags={flags}
                    stateless={true}
                    positionClassName="bottom right"
                    title="Tooltip Title"
                    open={this.state.open2}
                    onToggle={this._handleToggle2}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel2}
                    >
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm2} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>

                <div>{this.state.status2}</div>

                <br/>
                <DetailsTooltip
                    flags={flags}
                    stateless={true}
                    label={(<button type="button" className="delete-btn">Label as button</button>)}
                    positionClassName="bottom right"
                    title="Tooltip Title"
                    open={this.state.open3}
                    onToggle={this._handleToggle3}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel3}
                    >
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm3} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>
                <div>{this.state.status3}</div>

                <br/>
                <DetailsTooltip
                    flags={flags}
                    stateless={true}
                    positionClassName="bottom"
                    label="Open by default"
                    title="Tooltip Title"
                    open={this.state.open4}
                    onToggle={this._handleToggle4}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel4}
                    >
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm4} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>
                <div>{this.state.status4}</div>

                <br/>
                <DetailsTooltip
                    flags={flags}
                    stateless={true}
                    label="With alert styling"
                    positionClassName="alert"
                    title="Title won't display"
                    open={this.state.open5}
                    onToggle={this._handleToggle5}>
                    <div className="title">
                        Alert Title
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel5}
                    >
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm5} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>
                <div>{this.state.status5}</div>

                <br/>
                <DetailsTooltip
                    flags={flags}
                    stateless={true}
                    positionClassName="bottom right"
                    label="Three Buttons"
                    title="Three Buttons"
                    open={this.state.open6}
                    onToggle={this._handleToggle6}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel6}
                    >
                        <Button
                            data-id="confirm-action"
                            type="cancel"
                            onClick={this._handleDiscard6} >
                            Discard Changes
                        </Button>
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm6} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>
                <div>{this.state.status6}</div>

                <br/>
                <DetailsTooltip
                    flags={flags}
                    stateless={true}
                    label="Alert styling with three buttons"
                    positionClassName="alert"
                    title="Tooltip Title"
                    open={this.state.open7}
                    onToggle={this._handleToggle7}>
                    <div className="title">Save Changes</div>
                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <ButtonGroup
                        data-id="delete-confirmation"
                        onCancel={this._handleCancel7}
                    >
                        <Button
                            data-id="confirm-action"
                            type="cancel"
                            onClick={this._handleDiscard7} >
                            Discard Changes
                        </Button>
                        <Button
                            data-id="confirm-action"
                            type="primary"
                            onClick={this._handleConfirm7} >
                            Confirm
                        </Button>
                    </ButtonGroup>
                </DetailsTooltip>
                <div>{this.state.status7}</div>

                <br/>
                <DetailsTooltip
                    flags={flags}
                    stateless={true}
                    label="Test passing buttons"
                    positionClassName="bottom right"
                    title="Tooltip Title"
                    open={this.state.open8}
                    onToggle={this._handleToggle8}
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

                <br/>
                <DetailsTooltip
                    flags={flags}
                    positionClassName="bottom right"
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

                <DetailsTooltip
                    flags={flags}
                    positionClassName="bottom left"
                    labelClassName="my-css-class"
                    label="Hang on the left"
                    title="Tooltip Title"
                    stateless={false}>

                    <p>
                        Nothing fancy here.
                    </p>
                </DetailsTooltip>

                <br />

                <DetailsTooltip
                    flags={flags}
                    positionClassName="bottom center"
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
