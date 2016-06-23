var React = require("react");
var _ = require("underscore");
var DetailsTooltip = require("../../../components/tooltips/DetailsTooltip.jsx");

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
            this["_toggle" + i] = this._toggle.bind(null, i);
            this["_cancel" + i] = this._cancel.bind(null, i);
            this["_confirm" + i] = this._confirm.bind(null, i);
        }
    },

    render: function () {
        return (
            <div className="controls">
                <DetailsTooltip
                    positionStyle="bottom right"
                    label="With a label (label is passed into component)"
                    title="Tooltip Title"
                    open={this.state.open1}
                    onToggle={this._toggle1}>

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
                            onClick={this._confirm1} />
                        <br />
                        <a className="cancel" onClick={this._cancel1}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status1}</div>

                <br/>
                <a onClick={this._toggle2}>Without label (label is outside component)</a>
                <DetailsTooltip
                    positionStyle="bottom right"
                    title="Tooltip Title"
                    open={this.state.open2}
                    onToggle={this._toggle2}>

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
                            onClick={this._confirm2}/>
                        <br />
                        <a className="cancel" onClick={this._cancel2}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status2}</div>

                <br/>
                <DetailsTooltip
                    label={(<input type="button" value="Label as button" />)}
                    positionStyle="bottom right"
                    title="Tooltip Title"
                    open={this.state.open3}
                    onToggle={this._toggle3}>

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
                            onClick={this._confirm3}/>
                        <br />
                        <a className="cancel" onClick={this._cancel3}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status3}</div>

                <br/>
                <DetailsTooltip
                    positionStyle="bottom"
                    label="Open by default"
                    title="Tooltip Title"
                    open={this.state.open4}
                    onToggle={this._toggle4}>

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
                            onClick={this._confirm4}/>
                        <br />
                        <a className="cancel" onClick={this._cancel4}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status4}</div>

                <br/>
                <DetailsTooltip
                    label="With alert styling"
                    positionStyle="alert"
                    title="Tooltip Title"
                    open={this.state.open5}
                    onToggle={this._toggle5}>

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
                            onClick={this._confirm5}/>
                        <br />
                        <a className="cancel" onClick={this._cancel5}>Cancel</a>
                    </div>
                </DetailsTooltip>
                <div>{this.state.status5}</div>

                <br/>
                <DetailsTooltip
                    positionStyle="bottom right"
                    labelStyle="my-css-class"
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
