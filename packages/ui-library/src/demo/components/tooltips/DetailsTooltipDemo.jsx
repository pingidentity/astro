var React = require("re-react");
var _ = require("underscore");
var DetailsTooltip = require("../../../components/tooltips/DetailsTooltip.jsx");

/**
* @name DetailsTooltipDemo
* @memberof DetailsTooltip
* @desc A demo for DetailsTooltip
*/
var DetailsTooltipDemo = React.createClass({

    numDemos: 9,

    _toggle: function (index) {
        var newState = {};

        newState["open" + index] = !this.state["open" + index];

        this.setState(newState);
    },

    _confirm: function (index) {
        var newState = {};

        newState["status" + index] = "confirmed";
        this._toggle(index);

        this.setState(newState);
    },

    _cancel: function (index) {
        var newState = {};

        newState["status" + index] = "cancelled";
        this._toggle(index);

        this.setState(newState);
    },

    _discard: function (index) {
        var newState = {};

        newState["status" + index] = "changes discarded";
        this._toggle(index);

        this.setState(newState);
    },

    getInitialState: function () {
        var initState = {};

        for (var i=1; i<=this.numDemos; i+=1) {
            initState["open" + i] = false;
            initState["status" + i] = "";
        }

        initState.open4 = true; // tooltip that is open by default

        return initState;
    },

    componentDidMount: function () {
        for (var i=1; i<=this.numDemos; i+=1) {
            this["_handleToggle" + i] = this._toggle.bind(null, i);
            this["_handleCancel" + i] = this._cancel.bind(null, i);
            this["_handleConfirm" + i] = this._confirm.bind(null, i);
            this["_handleDiscard" + i] = this._discard.bind(null, i);
        }
    },

    render: function () {

        var secondaryArr = [
            { value: this._handleCancel8, label: "One" },
            { value: this._handleCancel8, label: "Two" }
        ];
        var primaryArr = [
            { value: this._handleConfirm8, label: "Save" }
        ];

        return (
            <div className="controls">
                <DetailsTooltip
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
                    <div className="button-group" data-id="delete-confirmation">
                        <button
                                type="button"
                                data-id="confirm-action"
                                className="primary"
                                onClick={this._handleConfirm1} >
                            Confirm
                        </button>
                        <br />
                        <a className="cancel" onClick={this._handleCancel1}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status1}</div>

                <br/>
                <a onClick={this._handleToggle2}>Without label (label is outside component)</a>
                <DetailsTooltip
                    stateless={true}
                    positionClassName="bottom right"
                    title="Tooltip Title"
                    open={this.state.open2}
                    onToggle={this._handleToggle2}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <div className="button-group" data-id="delete-confirmation">
                        <button
                                type="button"
                                data-id="confirm-action"
                                className="primary"
                                onClick={this._handleConfirm2} >
                            Confirm
                        </button>
                        <br />
                        <a className="cancel" onClick={this._handleCancel2}>Cancel</a>
                    </div>
                </DetailsTooltip>

                <div>{this.state.status2}</div>

                <br/>
                <DetailsTooltip
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
                    <div className="button-group" data-id="delete-confirmation">
                        <button
                                type="button"
                                data-id="confirm-action"
                                className="primary"
                                onClick={this._handleConfirm3} >
                            Confirm
                        </button>
                        <br />
                        <a className="cancel" onClick={this._handleCancel3}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status3}</div>

                <br/>
                <DetailsTooltip
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
                    <div className="button-group" data-id="delete-confirmation">
                        <button
                                type="button"
                                data-id="confirm-action"
                                className="primary"
                                onClick={this._handleConfirm4} >
                            Confirm
                        </button>
                        <br />
                        <a className="cancel" onClick={this._handleCancel4}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status4}</div>

                <br/>
                <DetailsTooltip
                    stateless={true}
                    label="With alert styling"
                    positionClassName="alert"
                    title="Title won't display"
                    open={this.state.open5}
                    onToggle={this._handleToggle5}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <div className="button-group" data-id="delete-confirmation">
                        <button
                            data-id="confirm-action"
                            className="primary"
                            onClick={this._handleConfirm5} >
                            Confirm
                        </button>
                        <br />
                        <a className="cancel" onClick={this._handleCancel5}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status5}</div>

                <br/>
                <DetailsTooltip
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
                    <div className="button-group" data-id="delete-confirmation">
                        <button
                            data-id="confirm-action"
                            className="cancel"
                            onClick={this._handleDiscard6} >
                            Discard Changes
                        </button>
                        <button
                            data-id="confirm-action"
                            className="primary"
                            onClick={this._handleConfirm6} >
                            Confirm
                        </button>
                        <br />
                        <a className="cancel" onClick={this._handleCancel6}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status6}</div>

                <br/>
                <DetailsTooltip
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
                    <div className="button-group" data-id="delete-confirmation">
                        <button
                            data-id="confirm-action"
                            className="cancel"
                            onClick={this._handleDiscard7} >
                            Discard Changes
                        </button>
                        <button
                            data-id="confirm-action"
                            className="primary"
                            onClick={this._handleConfirm7} >
                            Confirm
                        </button>
                        <br />
                        <a className="cancel" onClick={this._handleCancel7}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status7}</div>

                <br/>
                <DetailsTooltip
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

            </div>
        );
    }
});

module.exports = DetailsTooltipDemo;
