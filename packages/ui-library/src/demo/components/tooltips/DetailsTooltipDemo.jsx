var React = require("re-react");
var _ = require("underscore");
var DetailsTooltip = require("../../../components/tooltips/DetailsTooltip.jsx");

/**
* @name DetailsTooltipDemo
* @memberof DetailsTooltip
* @desc A demo for DetailsTooltip
*/
var DetailsTooltipDemo = React.createClass({

    numDemos: 6,

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
        }
    },

    render: function () {
        return (
            <div className="controls">
                <DetailsTooltip
                    positionClassName="bottom right"
                    label="With a label (label is passed into component)"
                    title="Tooltip Title"
                    open={this.state.open1}
                    onToggle={this._handleToggle1}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <div className="buttons" data-id="delete-confirmation">
                        <input
                            type="button"
                            data-id="confirm-action"
                            value="Confirm"
                            className="primary"
                            onClick={this._handleConfirm1} />
                        <br />
                        <a className="cancel" onClick={this._handleCancel1}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status1}</div>

                <br/>
                <a onClick={this._handleToggle2}>Without label (label is outside component)</a>
                <DetailsTooltip
                    positionClassName="bottom right"
                    title="Tooltip Title"
                    open={this.state.open2}
                    onToggle={this._handleToggle2}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <div className="buttons" data-id="delete-confirmation">
                        <input
                            type="button"
                            data-id="confirm-action"
                            value="Confirm"
                            className="primary"
                            onClick={this._handleConfirm2}/>
                        <br />
                        <a className="cancel" onClick={this._handleCancel2}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status2}</div>

                <br/>
                <DetailsTooltip
                    label={(<input type="button" value="Label as button" />)}
                    positionClassName="bottom right"
                    title="Tooltip Title"
                    open={this.state.open3}
                    onToggle={this._handleToggle3}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <div className="buttons" data-id="delete-confirmation">
                        <input
                            type="button"
                            data-id="confirm-action"
                            value="Confirm"
                            className="primary"
                            onClick={this._handleConfirm3}/>
                        <br />
                        <a className="cancel" onClick={this._handleCancel3}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status3}</div>

                <br/>
                <DetailsTooltip
                    positionClassName="bottom"
                    label="Open by default"
                    title="Tooltip Title"
                    open={this.state.open4}
                    onToggle={this._handleToggle4}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <div className="buttons" data-id="delete-confirmation">
                        <input
                            type="button"
                            data-id="confirm-action"
                            value="Confirm"
                            className="primary"
                            onClick={this._handleConfirm4}/>
                        <br />
                        <a className="cancel" onClick={this._handleCancel4}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status4}</div>

                <br/>
                <DetailsTooltip
                    label="With alert styling"
                    positionClassName="alert"
                    title="Tooltip Title"
                    open={this.state.open5}
                    onToggle={this._handleToggle5}>

                    <p>
                        Lorem ipsum dolor sit amet, nonummy non donec, ac eget. Vero et in, diam hac pharetra
                        sodales, nisl fringilla eu placerat, tellus nisl tempor, mi tellus quam urna fringilla.
                    </p>
                    <div className="buttons" data-id="delete-confirmation">
                        <input
                            type="button"
                            data-id="confirm-action"
                            value="Confirm"
                            className="primary"
                            onClick={this._handleConfirm5}/>
                        <br />
                        <a className="cancel" onClick={this._handleCancel5}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status5}</div>

                <br/>
                <DetailsTooltip
                    positionClassName="bottom right"
                    labelClassName="my-css-class"
                    label="Stateful tooltip"
                    title="Tooltip Title"
                    controlled={false}
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
