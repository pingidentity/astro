var React = require("react");
var Section = require("../../../components/general/Section.jsx");

/**
* @name SectionDemo
* @memberof Section
* @desc A demo for Section
*/
var SectionDemo = React.createClass({

    getInitialState: function () {
        return {
            firstSectionOpen: false
        };
    },

    _toggleFirst: function () {
        this.setState({
            firstSectionOpen: !this.state.firstSectionOpen
        });
    },

    render: function () {
        return (
            <div>
                <Section
                    stateless={true}
                    title="My section Stateless"
                    titleValue="value here"
                    onToggle={this._toggleFirst}
                    expanded={this.state.firstSectionOpen}>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas lectus vulputate
                        diam porta rhoncus. Aenean sollicitudin nunc dui, eget cursus nisi interdum vitae. Donec
                        nec justo quis velit ullamcorper dictum vel sed quam. Etiam purus libero, porttitor
                        vitae risus ac, venenatis luctus lacus.
                    </div>
                </Section>
                <Section
                    title="My section Stateful"
                    stateless={false}
                    data-id="section-2"
                    className="extra">
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas lectus vulputate
                        diam porta rhoncus. Aenean sollicitudin nunc dui, eget cursus nisi interdum vitae. Donec
                        nec justo quis velit ullamcorper dictum vel sed quam. Etiam purus libero, porttitor
                        vitae risus ac, venenatis luctus lacus.
                    </div>
                </Section>
                <Section
                    title="My unopenable section"
                    stateless={true}
                    data-id="section-2"
                    className="extra"
                    disableExpand={true}>
                    <div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas lectus vulputate
                        diam porta rhoncus. Aenean sollicitudin nunc dui, eget cursus nisi interdum vitae. Donec
                        nec justo quis velit ullamcorper dictum vel sed quam. Etiam purus libero, porttitor
                        vitae risus ac, venenatis luctus lacus.
                    </div>
                </Section>
            </div>
        );
    }
});

module.exports = SectionDemo;
