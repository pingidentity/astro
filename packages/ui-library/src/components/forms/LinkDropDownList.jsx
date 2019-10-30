import React from "react";
import PropTypes from "prop-types";
import CollapsibleLink from "../general/CollapsibleLink";
import DetailsTooltip from "../tooltips/DetailsTooltip";
import classnames from "classnames";
import { inStateContainer, toggleTransform } from "../utils/StateContainer";
import { flagsPropType, getFlags } from "../../util/FlagUtils";
import { deprecatedStatelessProp } from "../../util/DeprecationUtils";


/**
 * @callback LinkDropDownList~onClick
 * @param {object} selectedMenuItem
 *     The data object of the selected/clicked menu item
 */

/**
 * @callback LinkDropDownList~onToggle
 */

/**
 * @class LinkDropDownList
 * @desc Toggles between two states on click. Is either "off" or "on".
 *
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
        className: PropTypes.string,
        "data-id": PropTypes.string,
        label: PropTypes.node,
        labelArrowPosition: PropTypes.oneOf(Object.values(CollapsibleLink.arrowPositions)),
        onClick: PropTypes.func,
        onToggle: PropTypes.func,
        open: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedOption: PropTypes.oneOfType([PropTypes.object, PropTypes.oneOf([-1])]), // -1 means no value has been set
        flags: flagsPropType,
    };

    static defaultProps = {
        closeOnSelection: true,
        "data-id": "link-dropdown-list",
    };

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    _handleClick = (selectedOption) => {
        if (this.props.closeOnSelection) {
            this.props.onToggle();
        }

        if (this.props.onClick) {
            this.props.onClick(selectedOption);
        }
    };

    _renderLabel = () => {
        return (
            <CollapsibleLink
                data-id={this.props["data-id"] + "-label"}
                expanded={this.props.open}
                title={this.props.label}
                arrowPosition={this.props.labelArrowPosition}
            />
        );
    };

    _renderOptions = () => {
        return this.props.options.map(function (option, i) {
            return (
                <LinkDropDownListOption
                    data-id={`list-option-${option.value}`}
                    key={i}
                    onClick={this._handleClick}
                    option={option}
                    selected={option === this.props.selectedOption}
                />
            );
        }.bind(this));
    };

    render() {
        return (
            <DetailsTooltip
                data-id={this.props["data-id"]}
                placement={DetailsTooltip.tooltipPlacements.BOTTOM_RIGHT}
                contentClassName="link-dropdown-list"
                className={classnames(this.props.className, "link-dropdown-list")}
                label={this._renderLabel()}
                showClose={false}
                open={this.props.open}
                onToggle={this.props.onToggle}
                flags={getFlags(this)}
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
    flags: flagsPropType,
};

LinkDropDownList.contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

LinkDropDownList.labelArrowPositions = CollapsibleLink.arrowPositions;

class LinkDropDownListOption extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        option: PropTypes.object,
        selected: PropTypes.bool,
    };

    static defaultProps = {
        "data-id": "link-dropdown-option"
    }

    _handleClick = () => {
        this.props.onClick(this.props.option);
    };

    render() {
        var classNames = {
            "select-option": true,
            selected: this.props.selected,
        };

        return (
            <li
                data-id={this.props["data-id"]}
                data-value={this.props.option.value}
                className={classnames(classNames)}
                onClick={this._handleClick}>
                {this.props.option.label}
            </li>
        );
    }
}

export default LinkDropDownList;