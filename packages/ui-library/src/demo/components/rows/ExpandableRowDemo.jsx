var React = require("react/addons");
var ExpandableRow = require("../../../components/rows/ExpandableRow.jsx");

var ExpandableRowDemo = React.createClass({

    render: function () {

        return (
            /* jshint ignore: start */
            <div data-id="idp-row">
                <ExpandableRow titleStyle="name" editModalTitle="Modal Title"
                    defaultToExpanded={false} showDelete={false} showEdit={true} />
                <ExpandableRow titleStyle="name" editModalTitle="Modal Title-2"
                    defaultToExpanded={true} showDelete={true} showEdit={false} />
            </div>
            /* jshint ignore: end */
        );
    }
});

module.exports = ExpandableRowDemo;


