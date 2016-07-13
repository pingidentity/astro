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
            toggled: false,
            userStatus: "USER DISABLED"
        };
    },

    _handleToggle: function () {
        this.setState({
            toggled: !this.state.toggled,
            userStatus: !this.state.toggled ? "USER ACTIVE" : "USER DISABLED"
        });
    },

    render: function () {
        return (
            <div>
                <Toggle data-id="user-toggle" className="row-status-toggle"
                        controlled={true}
                        toggled={this.state.toggled}
                        onToggle={this._handleToggle} />
                <br/><br/>
                <div data-id="userStatus">{this.state.userStatus}</div>
            </div>
        );
    }
});

module.exports = ToggleDemo;
