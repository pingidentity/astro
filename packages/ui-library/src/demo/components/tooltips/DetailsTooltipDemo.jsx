var React = require("react");
var _ = require("underscore");
var DetailsTooltip = require("../../../components/tooltips/DetailsTooltip.jsx");

var DetailsTooltipDemo = React.createClass({

    _firstCancel: function () {
        this.setState({
            firstOpen: false,
            firstConfirmed: "Cancelled"
        });
    },

    _secondCancel: function () {
        this.setState({
            secondOpen: false,
            secondConfirmed: "Cancelled"
        });
    },

    _thirdCancel: function () {
        this.setState({
            thirdOpen: false,
            thirdConfirmed: "Cancelled"
        });
    },

    _secondConfirm: function () {
        this.setState({
            secondOpen: false,
            secondConfirmed: "Confirmed"
        });
    },

    _firstConfirm: function () {
        this.setState({
            firstOpen: false,
            firstConfirmed: "Confirmed"
        });
    },

    _thirdConfirm: function () {
        this.setState({
            thirdOpen: false,
            thirdConfirmed: "Confirmed"
        });
    },

    _toggleConfirmation: function () {
        this.setState({
            firstOpen: !this.state.firstOpen,
            firstConfirmed: ""
        });
    },

    _toggleOutside: function () {
        this.setState({
            secondOpen: !this.state.secondOpen,
            secondConfirmed: ""
        });
    },

    _toggleThird: function () {
        this.setState({
            thirdOpen: !this.state.thirdOpen,
            thirdConfirmed: ""
        });
    },

    getInitialState: function () {
        return {
            firstOpen: false,
            secondOpen: false,
            thirdOpen: true,
            firstConfirmed: "",
            secondConfirmed: "",
            thirdConfirmed: ""
        };
    },

    render: function () {
        return (
            <div className="controls">
                <DetailsTooltip
                    positionStyle="bottom right"
                    labelStyle="my-css-class"
                    label="Label"
                    title="Tooltip Title"
                    open={this.state.firstOpen}
                    onToggle={this._toggleConfirmation}>

                    <p>
                        Are you sure you want to delete this rule?
                    </p>
                    <div className="buttons" data-id="delete-confirmation">
                        <input
                            type="button"
                            data-id="cancel-action"
                            value="Cancel"
                            className="secondary"
                            onClick={this._firstCancel}/>
                        <input
                            type="button"
                            data-id="confirm-action"
                            value="Confirm"
                            className="primary"
                            onClick={this._firstConfirm}/>
                    </div>
                </DetailsTooltip>

                {this.state.firstConfirmed ? (
                <div>
                    <br/>
                    {this.state.firstConfirmed}
                </div>
                    ):null}

                <br/><br/>
                <a onClick={this._toggleOutside}>Outside label</a>
                <DetailsTooltip
                    positionStyle="bottom right"
                    labelStyle="my-css-class"
                    title="Tooltip Title"
                    open={this.state.secondOpen}
                    onToggle={this._toggleOutside}>

                    <p>
                        Are you sure you want to delete this rule?
                    </p>
                    <div className="buttons" data-id="delete-confirmation">
                        <input
                            type="button"
                            data-id="cancel-action"
                            value="Cancel"
                            className="secondary"
                            onClick={this._secondCancel}/>
                        <input
                            type="button"
                            data-id="confirm-action"
                            value="Confirm"
                            className="primary"
                            onClick={this._secondConfirm}/>
                    </div>
                </DetailsTooltip>

                {this.state.secondConfirmed ? (
                <div>
                    <br/>
                    {this.state.secondConfirmed}
                </div>
                    ):null}

                <br/><br/>
                <a onClick={this._toggleThird}>Open by default label</a>
                <DetailsTooltip
                    positionStyle="bottom right"
                    labelStyle="my-css-class"
                    title="Tooltip Title"
                    open={this.state.thirdOpen}
                    onToggle={this._toggleThird}>

                    <p>
                        Are you sure you want to delete this rule?
                    </p>
                    <div className="buttons" data-id="delete-confirmation">
                        <input
                            type="button"
                            data-id="cancel-action"
                            value="Cancel"
                            className="secondary"
                            onClick={this._thirdCancel}/>
                        <input
                            type="button"
                            data-id="confirm-action"
                            value="Confirm"
                            className="primary"
                            onClick={this._thirdConfirm}/>
                    </div>
                </DetailsTooltip>

                {this.state.thirdConfirmed ? (
                <div>
                    <br/>
                    {this.state.thirdConfirmed}
                </div>
                    ):null}
                <br/><br/>

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
