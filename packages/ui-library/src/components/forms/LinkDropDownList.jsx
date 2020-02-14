import React from "react";
import PropTypes from "prop-types";
import CollapsibleLink from "../general/CollapsibleLink";
import DetailsTooltip from "../tooltips/DetailsTooltip";
import classnames from "classnames";
import { inStateContainer, toggleTransform } from "../utils/StateContainer";
import { deprecatedStatelessProp } from "../../util/DeprecationUtils";
import Disabled from "../layout/Disabled";
import { defaultRender } from "../../util/PropUtils";

/**
 * @enum {string}
 * @alias LinkDropDownList.alignments
 */
const alignments = {
    /** left */
    LEFT: "left",
    /** right */
    RIGHT: "right",
};

/**
 * @callback LinkDropDownList~onClick
 * @param {object} selectedMenuItem
 *     The data object of the selected/clicked menu item
 */

/**
 * @callback LinkDropDownList~onToggle
 */

/**
 * @class LinkDropDownListOption
 * @param {string} [data-id=link-dropdown-option]
 *     The "data-id" value for top-level HTML container.
 * @param {boolean} [disabled]
 *     dropdown option will not function when true.
  * @param {object} option
 *     Array of group sections for the linkDropDownList.
 * @param {boolean} selected
 *    The selected list option.
 */

/**
 * @class LinkDropDownList
 * @desc Toggles between two states on click. Is either "off" or "on".
 *
 * @param {LinkDropDownList.alignments} [alignment=left]
 *     Right or left alignment of the dropdown.
 * @param {string} [data-id=toggle]
 *     The "data-id" value for top-level HTML container.

 * @param {node} [label]
 *     A string or JSX object that serves as the trigger label.
 * @param {string} [className]
 *     CSS classes to be set on the top-level HTML container.
 *
 * @param {object} [bottomPanel]
 *     Link actions for the bottom of the list
 *
 * @param {boolean} [stateless]
 *     Enables whether the open state of teh component to be externally managed. True will relinquish control to the
 *     component's parent component. False or not specified will cause the component to manage state internally.
 * @param {boolean} [open=false]
 *     Determines whether the LinkDropDownList is visible. True = visible, False = hidden.
 *     When not provided, the component will manage this value.
 * @param {object} [initialState]
 *     selectedOption determines the initial state of 'selectedOption'.
 * @param {function} [renderLink]
 *     Function to render the CollapsibleLink.
 * @param {FormDropDownList~option} selectedOption
 *     The selected list option.
 *     When not provided, the component will manage this value.
 * @param {LinkDropDownList~onClick} [onClick]
 *     Callback triggered when a menu item is selected
 * @param {LinkDropDownList~onToggle} [onToggle]
 *     Callback triggered when the menu visibility is changed
 *
 * @example
 *     <LinkDropDownList
 *         options={data.options}
 *         selectedOption={this.state.selectedOption}
 *         onClick{this._handleClick}
 *         onToggle={this._handleToggle}
 *     />
 */



class LinkDropDownListStateless extends React.Component {
    static propTypes = {
        alignment: PropTypes.oneOf(Object.values(alignments)),
        className: PropTypes.string,
        "data-id": PropTypes.string,
        label: PropTypes.node,
        labelArrowPosition: PropTypes.oneOf(Object.values(CollapsibleLink.arrowPositions)),
        onClick: PropTypes.func,
        onToggle: PropTypes.func,
        open: PropTypes.bool,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.node,
                disabled: PropTypes.bool,
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ]).isRequired
            })
        ),
        renderLink: PropTypes.func,
        selectedOption: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([-1])]), // -1 means no value has been set
    };

    static defaultProps = {
        closeOnSelection: true,
        "data-id": "link-dropdown-list",
        renderLink: defaultRender,
    };

    _handleClick = (selectedOption) => {
        if (this.props.closeOnSelection) {
            this.props.onToggle();
        }

        if (this.props.onClick) {
            this.props.onClick(selectedOption);
        }
    };

    _renderLabel = () => this.props.renderLink({
        className: "link-dropdown-list__link",
        "data-id": this.props["data-id"] + "-label",
        expanded: this.props.open,
        title: this.props.label,
        arrowPosition: this.props.labelArrowPosition,
    }, CollapsibleLink);

    _renderOptions = () => {
        return this.props.options.map(function (option, i) {
            return (
                <LinkDropDownListOption
                    data-id={`list-option-${option.value}`}
                    key={i}
                    onClick={this._handleClick}
                    option={option}
                    selected={option === this.props.selectedOption}
                    disabled={option.disabled}
                />
            );
        }.bind(this));
    };

    render() {
        return (
            <DetailsTooltip
                data-id={this.props["data-id"]}
                placement={
                    this.props.alignment === alignments.RIGHT
                        ? DetailsTooltip.tooltipPlacements.BOTTOM_LEFT
                        : DetailsTooltip.tooltipPlacements.BOTTOM_RIGHT
                }
                contentClassName="link-dropdown-list"
                className={classnames(this.props.className, "link-dropdown-list")}
                label={this._renderLabel()}
                showClose={false}
                open={this.props.open}
                onToggle={this.props.onToggle}
            >
                <ul className="select-list" data-id={this.props["data-id"] + "-menu"}>
                    {this._renderOptions()}
                </ul>
                {this.props.bottomPanel &&
                    <div data-id={this.props["data-id"] + "-bottom-links"} className="list-input__bottom-links">
                        {this.props.bottomPanel}
                    </div>
                }
            </DetailsTooltip>
        );
    }
}

const LinkDropDownList = inStateContainer([
    {
        name: "open",
        initial: false,
        callbacks: [
            {
                name: "onToggle",
                transform: toggleTransform
            },
        ],
    },
    {
        name: "selectedOption",
        initial: -1,
        setter: "onClick"
    },

])(LinkDropDownListStateless);
LinkDropDownList.displayName = "LinkDropDownList";

LinkDropDownList.propTypes = {
    stateless: deprecatedStatelessProp,
};

LinkDropDownList.labelArrowPositions = CollapsibleLink.arrowPositions;

LinkDropDownList.alignments = alignments;


class LinkDropDownListOption extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        disabled: PropTypes.bool,
        option: PropTypes.object,
        selected: PropTypes.bool,
    };

    static defaultProps = {
        "data-id": "link-dropdown-option",
        disabled: false
    }

    _handleClick = () => {
        if (!this.props.disabled) {
            return this.props.onClick(this.props.option);
        }
    };

    classNames = {
        "select-option": true,
        disabled: this.props.disabled,
        selected: this.props.selected,
    };

    render() {
        const list = (
            <li
                data-id={this.props["data-id"]}
                data-value={this.props.option.value}
                className={classnames(this.classNames)}
                onClick={this._handleClick}
            >
                {this.props.option.label}
            </li>
        );

        /* istanbul ignore if  */
        if (this.props.disabled) {
            return (
                <Disabled>
                    {list}
                </Disabled>
            );
        } else {
            return (
                list
            );
        }
    }
}

export default LinkDropDownList;