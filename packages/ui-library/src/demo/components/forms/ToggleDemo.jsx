var React = require("react");
var Toggle = require("../../../components/forms/form-toggle");

/**
* @name ToggleDemo
* @memberof Toggle
* @desc A demo for Toggle
*/
var ToggleDemo = React.createClass({

    getInitialState: function () {
        return {
            toggled1: false,
            toggled2: false,
            userStatus1: "OFF",
            userStatus2: "LOCKED"
        };
    },

    _handleToggle1: function () {
        this.setState({
            toggled1: !this.state.toggled1,
            userStatus1: !this.state.toggled1 ? "ON" : "OFF"
        });
    },

    _handleToggle2: function () {
        this.setState({
            toggled2: !this.state.toggled2,
            userStatus2: !this.state.toggled2 ? "ON" : "LOCKED"
        });
    },

    render: function () {
        return (
            <div>
                <div className="input-row">
                    <Toggle
                        data-id="user-toggle"
                        className="row-status-toggle"
                        stateless={true}
                        toggled={this.state.toggled1}
                        onToggle={this._handleToggle1}
                    />
                    <br/><br/>
                    "{this.state.userStatus1}" state
                </div>
                <p>Optional locked styling:</p>
                <Toggle
                    data-id="user-toggle"
                    className="row-status-toggle"
                    stateless={true}
                    status={Toggle.Status.LOCKED}
                    toggled={this.state.toggled2}
                    onToggle={this._handleToggle2}
                />
                <br/><br/>
                "{this.state.userStatus2}" state
            </div>
        );
    }
});

module.exports = ToggleDemo;
