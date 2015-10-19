var React = require('react/addons');
var HelpHint = require('../../../components/tooltips/HelpHint.jsx');

var HelpHintDemo = React.createClass({

    getInitialState: function () {
        return {
        };
    },

    render: function () {
        return (
             /* jshint ignore:start */
            <label className="label-text">
                <p>Demo</p>
                <HelpHint id="helpHint" hintStyle="short-tooltip" hintText="This option is unavailable"/>
            </label>
            /* jshint ignore:end */
        );
    }
});

module.exports = HelpHintDemo;
