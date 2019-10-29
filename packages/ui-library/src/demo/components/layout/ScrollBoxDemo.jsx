import React from "react";
import ScrollBox from "ui-library/lib/components/layout/ScrollBox";
import Toggle from "ui-library/lib/components/forms/form-toggle";
import ValueItem from "ui-library/lib/components/layout/ValueItem";
import FlexRow from "ui-library/lib/components/layout/FlexRow";

/**
* @name ScrollBoxDemo
* @memberof ScrollBox
* @desc A demo for ScrollBox
*/

class ScrollBoxDemo extends React.Component {
    state = {
        short: false,
        fixHeight: false,
    }

    _handleToggle = () => this.setState(state => ({ short: !state.short }));
    _handleFixToggle = () => this.setState(state => ({ fixHeight: !state.fixHeight }));

    render () {
        return (
            <div>
                <FlexRow spacing="md">
                    <ValueItem
                        icon={
                            <Toggle toggled={this.state.short} onToggle={this._handleToggle} />
                        }
                    >Short content</ValueItem>
                    <ValueItem
                        icon={
                            <Toggle toggled={this.state.fixHeight} onToggle={this._handleFixToggle} />
                        }
                    >Fix height</ValueItem>
                </FlexRow>
                <hr className="hr" />
                <ScrollBox height={150} fixHeight={this.state.fixHeight}>
                    {
                        this.state.short
                            ? <p>Short content</p>
                            : <div>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                                <p>Some content</p>
                            </div>
                    }
                </ScrollBox>
            </div>
        );
    }
}

module.exports = ScrollBoxDemo;