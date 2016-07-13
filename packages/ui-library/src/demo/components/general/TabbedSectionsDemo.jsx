var React = require("react");
var TabbedSections = require("./../../../components/general/TabbedSections.jsx");

/**
* @name TabbedSectionsDemo
* @memberof TabbedSections
* @desc A demo for TabbedSections
*/
var TabbedSectionsDemo = React.createClass({
    _handleSectionChange: function (index) {
        this.setState({
            selectedIndex: index
        });
    },

    getInitialState: function () {
        return { selectedIndex: -1 };
    },

    render: function () {
        return (
            <TabbedSections selectedIndex={this.state.selectedIndex}
                            onValueChange={this._handleSectionChange} >
                <div title="Section 1">
                    <span>This is the content of section 1</span>
                </div>
                <div title="Section 2">
                    <div>This is the content of section 2</div>
                    <div>This is the content of section 2.1</div>
                    <div>This is the content of section 2.2</div>
                </div>
            </TabbedSections>
        );
    }
});


module.exports = TabbedSectionsDemo;
