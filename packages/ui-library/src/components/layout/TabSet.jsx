import React, { Component } from "react";
import PropTypes from "prop-types";
import RockerButton from "../forms/RockerButton";
import _ from "underscore";

/**
* @class TabSet
* @desc TabSet implementation, supports the rocker button into creating multiple tabs.
*
* @param {string} [data-id="tab-set"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to be set on the top-level HTML container.
* @param {array} labels
*     Array of label strings to use as button titles.
* @param {onValueChange} [onValueChange]
*     Callback to be triggered when selection changes.
* @param {number} [selectedIndex=0]
*     The index of the selected label. Is mutually exclusive with "selected".
* @param {TabConent~string} [label]
*     corresponding index for selcted label to match the TabContent to the array labels
* @example
*
*   <TabSet
*       labels={labels}
*       onValueChange={this._handleValueChange}
*       selectedIndex={this.state.selectedIndex}
*    >
*      <TabContent label="Label One">
*       Spicy jalapeno bacon ipsum dolor amet tenderloin sirloin bacon biltong pork belly
*       ribeye cow capicola tri-tip flank chuck tail ham venison.
*       Meatloaf ground round turkey corned beef pork belly boudin.
*       Pancetta ball tip meatloaf venison doner, landjaeger turkey pork bacon
*       ribeye prosciutto chicken turducken.
*       Pork loin shoulder salami frankfurter chicken.
*       </TabContent>
* </TabSet>
**/

class TabSet extends Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        labels: PropTypes.array.isRequired,
        onValueChange: PropTypes.func,
        selectedIndex: PropTypes.number,
    }

    static defaultProps = {
        "data-id": "tab-set",
        className: "",
        onValueChange: _.noop,
        selectedIndex: 0,
    }

    _getLabels = children => (
        children.reduce(({
            activeTabContent,
            labels,
        },
        {
            props: {
                children: grandChildren,
                label,
            }
        },idx) => {
            return {
                activeTabContent: idx === this.props.selectedIndex ? grandChildren : activeTabContent,
                labels: [...labels, label]
            };
        },
            {
                activeTabContent: {},
                labels: []
            })
    )

    render () {
        const {
            activeTabContent,
            labels
        } = this._getLabels(this.props.children);

        return (
            <div className="tab-set" data-id={this.props["data-id"]}>
                <RockerButton
                    stateless={true}
                    labels={labels}
                    selectedIndex={this.props.selectedIndex}
                    onValueChange={this.props.onValueChange}
                />
                <div className="tab-set-children">
                    {activeTabContent}
                </div>
            </div>
        );
    }
}

class TabContent extends Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        label: PropTypes.string,
    }

    static defaultProps = {
        "data-id": "tab-set-content"
    }

    render() {
        return (
            <div
                className="tab-set-contnet"
                label={this.props.label}
            >
                {this.props.children}
            </div>
        );
    }
}

export default { TabSet, TabContent };