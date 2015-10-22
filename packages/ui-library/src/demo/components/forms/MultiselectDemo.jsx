var React = require('react/addons');
var Multiselect = require('../../../components/forms/Multiselect.jsx');

var MultiselectDemo = React.createClass({

    _updateUserStatus: function (value,checked) {
        var message = 'Status ' + value + ' is checked? ' + checked;
        var output = document.getElementById('output');
        output.innerHTML += message + '<br />';
    },

    render: function () {
        return (
            /* jshint ignore:start */
            <div>
                <span id="output"></span>
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
