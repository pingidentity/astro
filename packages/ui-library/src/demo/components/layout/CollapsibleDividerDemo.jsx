import React from "react";
import CollapsibleDivider from "../../../components/layout/CollapsibleDivider";

/**
* @name CollapsibleDividerDemo
* @memberof CollapsibleDivider
* @desc A demo for CollapsibleDivider
*/

class CollapsibleDividerDemo extends React.Component {
    state = {
        open: false,
    }

    _handleToggle = () => this.setState({ open: !this.state.open });

    render () {
        const { open } = this.state;

        return (
            <div>
                <CollapsibleDivider title="Expand Me" onToggle={this._handleToggle} open={open}/>
                {open &&
                    <p>Content that can be shown or hidden with the collapsible divider</p>
                }
            </div>
        );
    }
}

module.exports = CollapsibleDividerDemo;