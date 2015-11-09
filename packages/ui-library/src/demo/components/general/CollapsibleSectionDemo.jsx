var React = require("react/addons");
var Section = require("../../../components/general/CollapsibleSection.jsx");

var CollapsibleSectionDemo = React.createClass({

    render: function () {
        return (
            <Section className="condition-title">
                <span title={true} className="icon-dropdown-arrow show-condition"></span>
                Collapsible Title

                <div className="condition">
                    <div className="condition-fields">
                        <p>This is a text field</p>
                    </div>
                </div>
            </Section>
        );
    }
});

module.exports = CollapsibleSectionDemo;
