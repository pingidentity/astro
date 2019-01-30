import React, { Component } from "react";
import PropTypes from "prop-types";
import RockerButton from "../forms/RockerButton";
import classnames from "classnames";
import _ from "underscore";

/**
 * @callback TabSet~renderLabels
 *
 * @param {Object} data
 *     An object containing information required or useful to generating  the TabSet label markup
 * @param {Object} data.props
 *     The props from the TabSet component.
 * @param {Object} data.defaultLabels
 *     The label markup (RockerButton) normally displayed
 */

/**
* @class TabSet
* @desc TabSet implementation, supports the rocker button into creating multiple tabs.
*
* @param {string} [data-id="tab-set"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to be set on the top-level HTML container.
* @param {onValueChange} [onValueChange]
*     Callback to be triggered when selection changes.
* @param {number} [selectedIndex=0]
*     The index of the selected label. Is mutually exclusive with "selected".
* @param {TabSet~renderLabels} [renderLabels]
*     When provided, this function renders in place of the tabs (rockerButtons).
* @example
*
*     <TabSet
*         onValueChange={this._handleValueChange}
*         selectedIndex={this.state.selectedIndex}
*     >
*         <TabContent label="Label One">One</TabContent>
*         <TabContent label="Label Two">Two</TabContent>
*    </TabSet>
**/



class TabSet extends Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        onValueChange: PropTypes.func,
        renderLabels: PropTypes.func,
        selectedIndex: PropTypes.number,
    }

    static defaultProps = {
        "data-id": "tab-set",
        className: "",
        onValueChange: _.noop,
        selectedIndex: 0,
        renderLabels: null,
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
            children = [],
            onValueChange,
            renderLabels,
            selectedIndex,
        } = this.props;

        const {
            activeTabContent,
            labels
        } = this._getLabels(children);

        const defaultLabels = (
            <RockerButton
                stateless={true}
                labels={labels}
                selectedIndex={selectedIndex}
                onValueChange={onValueChange}
            />
        );

        return (
            <div className="tab-set" data-id={this.props["data-id"]}>
                {renderLabels
                    ? renderLabels({
                        labels: labels,
                        props: this.props,
                        defaultLabels: defaultLabels,
                    }) : (
                        defaultLabels
                    )
                }
                <div className="tab-set-children">
                    {activeTabContent}
                </div>
            </div>
        );
    }
}


/**
* @class TabContent
* @desc TabContent implementation, the labels for the tabs
* @param {string} [label]
*     corresponding index for selected label to match the TabContent to the array labels
* @param {string} [data-id="tab-set-content"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to be set on the top-level HTML container.

* @example
*   <TabContent label="Label One">One</TabContent>
*   <TabContent label="Label Two">Two</TabContent>
**/


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
                className={classnames("tab-set-content", this.props.className)}
                data-id={this.props["data-id"]}
                label={this.props.label}
            >
                {this.props.children}
            </div>
        );
    }
}

export default { TabSet, TabContent };