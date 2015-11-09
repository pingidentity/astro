var React = require("react/addons");
var HelpHint = require("../../../components/tooltips/HelpHint.jsx");

var HelpHintDemo = React.createClass({

    getInitialState: function () {
        return {
        };
    },

    render: function () {
        return (
            <HelpHint
                id="helpHint"
                hintStyle="short-tooltip"
                hintText="This option is unavailable"/>
        );
    }
});

module.exports = HelpHintDemo;
