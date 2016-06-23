var React = require("react");
var Section = require("../../../components/general/Section.jsx");

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
                <Section onToggle={this._toggleFirst}
                        expanded={this.state.firstSectionOpen} title="My section Stateless">
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
                <Section controlled={false}
                         title="My section Stateful"
                         id="section-2"
                         className="extra">
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
            </div>
        );
    }
});

module.exports = SectionDemo;
