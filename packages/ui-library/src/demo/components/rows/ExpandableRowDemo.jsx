var React = require("react/addons");
var ExpandableRow = require("../../../components/rows/ExpandableRow.jsx");

var ExpandableRowDemo = React.createClass({

    render: function () {

        return (
            <div data-id="idp-row" className="result-set">
                <ExpandableRow
                    title="Collapsed Expandable Row"
                    subtitle="subtitle here"
                    editModalTitle="Modal Title"
                    defaultToExpanded={false}
                    showDelete={false}
                    showEdit={true} />
                <ExpandableRow
                    title="Open Expandable Row"
                    subtitle="subtitle here"
                    editModalTitle="Modal Title-2"
                    defaultToExpanded={true}
                    showDelete={true}
                    showEdit={false} />
                <ExpandableRow
                    title="Expandable Row in Waiting Mode"
                    subtitle="subtitle here"
                    editModalTitle="Modal Title-2"
                    waiting={true}
                    defaultToExpanded={true} />
            </div>
        );
    }
});

module.exports = ExpandableRowDemo;
