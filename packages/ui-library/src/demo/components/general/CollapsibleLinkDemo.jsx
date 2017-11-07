var React = require("react");
var CollapsibleLink = require("../../../components/general/CollapsibleLink.jsx"),
    If = require("../../../components/general/If.jsx");

/**
* @name CollapsibleLinkDemo
* @memberof CollapsibleLink
* @desc A demo for CollapsibleLink
*/
class CollapsibleLinkDemo extends React.Component {
    state = {
        isOpen: false,
        isOpenLink: false
    };

    _toggle = () => {
        this.setState({
            isOpenLink: !this.state.isOpenLink,
        });
    };

    _toggleCollapse = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    };

    render() {
        return (
            <div>
                <div>CollapsibleLink with title only</div>
                <CollapsibleLink
                    data-id="collapsible-link-1"
                    title="Normal link"
                    onToggle={this._toggle}
                    expanded={this.state.isOpenLink} />
                <If test={this.state.isOpenLink}>
                    <p>You only see me when link is expanded.</p>
                </If>
                <br />
                <br />
                <div>CollapsibleLink with title and toggled title</div>
                <CollapsibleLink
                    data-id="collapsible-link-2"
                    title="Collapsed link"
                    toggledTitle="Expanded link"
                    onToggle={this._toggleCollapse}
                    expanded={this.state.isOpen} />
                <If test={this.state.isOpen}>
                    <p>You only see me when link is expanded and you can see title is changed too.</p>
                </If>
            </div>
        );
    }
}

module.exports = CollapsibleLinkDemo;
