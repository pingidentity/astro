var React = require("react/addons");
var ExpandableRow = require("../../../components/rows/ExpandableRow.jsx");

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

        return (
            <div data-id="idp-row" className="result-set">
                <ExpandableRow
                    title="Collapsed Expandable Row"
                    subtitle="stateful"
                    editModalTitle="Modal Title"
                    defaultToExpanded={false}
                    showDelete={false}
                    showEdit={true}/>
                <ExpandableRow
                    title="Open Expandable Row"
                    subtitle="stateful"
                    editModalTitle="Modal Title-2"
                    defaultToExpanded={true}
                    showDelete={true}
                    showEdit={false}/>
                <ExpandableRow
                    title="Expandable Row in Waiting Mode"
                    subtitle="stateful"
                    editModalTitle="Modal Title-2"
                    waiting={true}
                    defaultToExpanded={true}/>
                <ExpandableRow
                    title="Expandable Row"
                    subtitle="stateless"
                    editModalTitle="Modal Title-3"
                    expanded={this.state.expanded}
                    onToggle={this._onToggle}/>
            </div>
        );
    }
});

module.exports = ExpandableRowDemo;
