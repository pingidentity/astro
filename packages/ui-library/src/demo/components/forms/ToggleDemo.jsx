var React = require("react");
var Toggle = require("../../../components/forms/Toggle.jsx");

var ToggleDemo = React.createClass({

    getInitialState: function () {
        return {
            userStatus: "DISABLED"
        };
    },

    _isToggled: function () {
        return this.state.userStatus === "ACTIVE";
    },

    _onStatusToggle: function (toggledOn) {
        if (toggledOn) {
            this.setState({
                userStatus: "ACTIVE"
            });
        } else {
            this.setState({
                userStatus: "DISABLED"
            });
        }
        return true;
    },

    render: function () {
        return (
            <div>
                <Toggle onToggle={this._onStatusToggle} id="toggle" toggled={this._isToggled()}
                    disabled={false} className="row-status-toggle" />
                <br/><br/>
                <div>{this.state.userStatus}</div>
            </div>
        );
    }
});

module.exports = ToggleDemo;
