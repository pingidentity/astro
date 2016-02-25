var React = require("react");
var ExpandableRow = require("../../../components/rows/ExpandableRow.jsx");
var Toggle = require("../../../components/forms/Toggle.jsx");

var ExpandableRowDemo = React.createClass({

    _onToggle: function (isExpanded) {
        this.setState({
            expanded: !isExpanded
        });
    },

    getInitialState: function () {
        return {
            expanded: false
        };
    },

    render: function () {


        var rowAccessories = (<div>
            <a>Link</a>
            <input type="button" className="button inline" value="Inline Button" />
            <Toggle />
            <div className="status good"></div>
        </div>);

        return (
            <div data-id="idp-row" className="result-set">
                <ExpandableRow
                    title="Row With Right Content"
                    subtitle="Row Subtitle"
                    rowAccessories={rowAccessories}
                    showEdit={false} />
                <ExpandableRow
                    title="Collapsed Expandable Row"
                    subtitle="stateful"
                    defaultToExpanded={false}
                    showDelete={false}
                    showEdit={true} />
                <ExpandableRow
                    title="Open Expandable Row"
                    subtitle="stateful"
                    defaultToExpanded={true}
                    showDelete={true}
                    showEdit={false}/>
                <ExpandableRow
                    title="Expandable Row in Waiting Mode"
                    subtitle="stateful"
                    waiting={true}
                    defaultToExpanded={true}/>
                <ExpandableRow
                    title="Expandable Row"
                    subtitle="stateless"
                    expanded={this.state.expanded}
                    onToggle={this._onToggle}/>
            </div>
        );
    }
});

module.exports = ExpandableRowDemo;
