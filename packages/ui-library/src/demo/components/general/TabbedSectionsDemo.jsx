var React = require("react");
var TabbedSections = require("./../../../components/general/TabbedSections");

/**
* @name TabbedSectionsDemo
* @memberof TabbedSections
* @desc A demo for TabbedSections
*/
class TabbedSectionsDemo extends React.Component {
    state = { selectedIndex: -1 };

    _handleSectionChange = (index) => {
        this.setState({
            selectedIndex: index
        });
    };

    render() {
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
}


module.exports = TabbedSectionsDemo;
