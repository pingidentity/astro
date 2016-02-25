var React = require("react");
var HelpHint = require("../../../components/tooltips/HelpHint.jsx");

var HelpHintDemo = React.createClass({

    getInitialState: function () {
        return {
        };
    },

    render: function () {
        return (
            <div>
                <div style={ { paddingLeft: "180px" } }>
                    <HelpHint
                        className="top right short-tooltip"
                        hintText="Help tooltip text"/>
                    <br /><br />
                    <HelpHint
                        className="top left short-tooltip"
                        hintText="Help tooltip text"/>
                    <br /><br />
                    <HelpHint
                        className="bottom right short-tooltip"
                        hintText="Help tooltip text"/>
                    <br /><br />
                    <HelpHint
                        className="bottom left short-tooltip"
                        hintText="Help tooltip text"/>
                </div>
                <br /><br /><br />
                <HelpHint
                    className="top right"
                    hintText="Regular length tooltip text"/>
                <br /><br />
                <HelpHint
                    className="top right medium-tooltip"
                    hintText="Medium length tooltip text"/>
                <br /><br />
                <HelpHint
                    className="top right short-tooltip"
                    hintText="Short length tooltip text"/>

            </div>
        );
    }
});

module.exports = HelpHintDemo;
