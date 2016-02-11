var React = require("react/addons");
var Section = require("../../../components/general/CollapsibleSection.jsx");

var CollapsibleSectionDemo = React.createClass({

    getInitialState: function () {
        return {
            open: false
        };
    },

    _toggle: function (isOpen) {
        this.setState({
            open: !isOpen
        });
    },

    render: function () {
        return (
            <Section className="condition-title" controlled={false} onToggle={this._toggle} expanded={this.state.open}>
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
