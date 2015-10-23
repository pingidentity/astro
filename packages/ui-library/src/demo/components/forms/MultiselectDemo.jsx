var React = require('react/addons');
var Multiselect = require('../../../components/forms/Multiselect.jsx');

var MultiselectDemo = React.createClass({


    getInitialState: function () {
        return {
            userStatus: '',
            checkedValue: false
        };
    },

    _updateUserStatus: function (value,checked) {
        this.setState({
            userStatus: value,
            checkedValue: checked
        });
    },

    render: function () {
        return (
            /* jshint ignore:start */
            <div>
                <p>Status type {this.state.userStatus} is checked ? {this.state.checkedValue ? ' true' : ' false'}</p>

                <Multiselect title="Status"
                    options={{
                        Active: 'ACTIVE',
                        Disabled: 'DISABLED',
                        Suspended: 'SUSPENDED'
                    }}
                onChange={this._updateUserStatus} />
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = MultiselectDemo;
