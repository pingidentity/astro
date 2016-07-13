var React = require("react");
var Section = require("../../../components/general/CollapsibleSection.jsx");

/**
* @name CollapsibleSectionDemo
* @memberof CollapsibleSection
* @desc A demo for CollapsibleSection
*/
var CollapsibleSectionDemo = React.createClass({

    getInitialState: function () {
        return {
            open: false,
            openNew: false
        };
    },

    _toggle: function () {
        this.setState({
            open: !this.state.open
        });
    },

    render: function () {
        return (
            <Section
                className="condition-title"
                controlled={false}
                onToggle={this._toggle}
                expanded={this.state.open}>

                <span title={true} className="icon-dropdown-arrow show-condition"></span>
                Collapsible Title

                <div className="condition">
                    <div className="condition-fields">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas lectus vulputate
                            diam porta rhoncus. Aenean sollicitudin nunc dui, eget cursus nisi interdum vitae. Donec
                            nec justo quis velit ullamcorper dictum vel sed quam. Etiam purus libero, porttitor
                            vitae risus ac, venenatis luctus lacus.
                        </p>
                    </div>
                </div>
            </Section>

        );
    }
});

module.exports = CollapsibleSectionDemo;
