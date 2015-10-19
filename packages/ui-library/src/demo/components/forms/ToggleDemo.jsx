var React = require('react/addons');
var Toggle = require('../../../components/forms/Toggle.jsx');

var ToggleDemo = React.createClass({

    getInitialState: function () {
        return {
            userStatus: ''
        };
    },

    _isToggled: function () {
        return this.state.userStatus === 'ACTIVE';
    },

    _onStatusToggle: function (toggledOn) {
        if (toggledOn) {
            this.setState({
                userStatus: 'ACTIVE'
            });
        } else {
            this.setState({
                userStatus: 'DISABLED'
            });
        }
        return true;
    },



    render: function () {
        return (
            /* jshint ignore:start */
            <div className="collapsed-content">
                <Toggle onToggle={this._onStatusToggle} id="toggle" toggled={this._isToggled()}
                    disabled={false} className="row-status-toggle" />
                <br/>
                <p>{this.state.userStatus}</p>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = ToggleDemo;
