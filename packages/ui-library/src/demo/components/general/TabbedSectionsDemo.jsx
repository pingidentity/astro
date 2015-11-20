var React = require("react/addons");
var TabbedSections = require("./../../../components/general/TabbedSections.jsx");

var TabbedSectionsDemo = React.createClass({
    _handleSectionChange: function (index) {
        this.setState({
            active: index
        });
    },

    getInitialState: function () {
        return { active: -1 };
    },

    render: function () {
        return (
            <TabbedSections active={this.state.active} onSectionChange={this._handleSectionChange} >
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
