
import PropTypes from "prop-types";
import React from "react";
import CollapsibleLink from "../general/CollapsibleLink";
import DetailsTooltip from "../tooltips/DetailsTooltip";
import classnames from "classnames";
import _ from "underscore";
import { cannonballProgressivleyStatefulWarning } from "../../util/DeprecationUtils";
import { inStateContainer, toggleTransform } from "../utils/StateContainer";


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
 * @param {object|string} [label]
 *     A string or JSX object that serves as the trigger label.
* @param {string} [className]
 *     CSS classes to be set on the top-level HTML container.
 * @param {array} [flags]
 *     Set the flag for "use-portal" to render with popper.js and react-portal
 *
 * @param {object} [bottomPanel]
 *     Link actions for the bottom of the list
 *
 * @param {boolean} [stateless]
 *     Enables whether the open state of teh component to be externally managed. True will relinquish control to the
 *     component's parent component. False or not specified will cause the component to manage state internally.
 * @param {boolean} [open=false]
 *     Determines whether the LinkDropDownList is visible. True = visible, False = hidden.
 * @param {object} [initialState]
 *     When the 'p-stateful' flag is set 'selectedOption' needs to be passed into the initialState prop.
 *     selectedOption determines the initial state of 'selectedOption'.
 *
 * @param {LinkDropDownList~onClick} [onClick]
 *     Callback triggered when a menu item is selected
 * @param {LinkDropDownList~onToggle} [onToggle]
 *     Callback triggered when the menu visibility is changed
 *
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
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object]),
        onClick: PropTypes.func,
        onToggle: PropTypes.func,
        open: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedOption: PropTypes.object,
        flags: PropTypes.arrayOf(PropTypes.string),
    };

    static defaultProps = {
        closeOnSelection: true,
        "data-id": "link-dropdown-list"
    };

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
            />
        );
    };

    _renderOptions = () => {
        return this.props.options.map(function (option, i) {
            return (
                <LinkDropDownListOption
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
                positionClassName="bottom right"
                contentClassName="link-dropdown-list"
                className={classnames(this.props.className, "link-dropdown-list")}
                label={this._renderLabel()}
                showClose={false}
                open={this.props.open}
                onToggle={this.props.onToggle}
                flags={this.props.flags}
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

class LinkDropDownListStateful extends React.Component {
    static propTypes = {
        bottomPanel: PropTypes.object,
        className: PropTypes.string,
        "data-id": PropTypes.string,
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object]),
        onClick: PropTypes.func,
        onToggle: PropTypes.func,
        open: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedOption: PropTypes.object,
    };

    static defaultProps = {
        onToggle: _.noop
    };

    state = {
        open: this.props.open || false,
        selectedOption: this.props.selectedOption
    };

    _handleClick = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        });
        if (this.props.onClick) {
            this.props.onClick(selectedOption);
        }
    };

    _handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
        this.props.onToggle();
    };

    render() {
        var props = _.defaults({
            onClick: this._handleClick,
            onToggle: this._handleToggle,
            open: this.state.open,
            selectedOption: this.state.selectedOption,
            ref: "LinkDropDownListStateful"
        }, this.props);

        return React.createElement(LinkDropDownListStateless, props);
    }
}

export default class LinkDropDownList extends React.Component {
    static propTypes = {
        stateless: PropTypes.bool,
        flags: PropTypes.arrayOf(PropTypes.oneOf(["p-stateful", "use-portal"])),
    };

    static defaultProps = {
        stateless: false,
        flags: [],
    };

    componentDidMount() {
        if (!this._usePStateful()) {
            cannonballProgressivleyStatefulWarning({
                name: "LinkDropDownList"
            });
        }
    }

    _usePStateful = () => this.props.flags.includes("p-stateful");

    render() {

        if (this._usePStateful()) {
            return <PStatefulLinkDropDownList {...this.props} />;
        }

        return this.props.stateless
            ? React.createElement(LinkDropDownListStateless, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "LinkDropDownListStateless" }, this.props))
            : React.createElement(LinkDropDownListStateful, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "LinkDropDownListStateful" }, this.props));
    }
}

const PStatefulLinkDropDownList = inStateContainer([
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
        initial: 0,
        setter: "onClick"
    },

])(LinkDropDownListStateless);
PStatefulLinkDropDownList.displayName = "PStatefulLinkDropDownList";


class LinkDropDownListOption extends React.Component {
    static propTypes = {
        option: PropTypes.object,
        selected: PropTypes.bool
    };

    _handleClick = () => {
        this.props.onClick(this.props.option);
    };

    render() {
        var classNames = {
            "select-option": true,
            selected: this.props.selected
        };

        return (
            <li data-value={this.props.option.value}
                className={classnames(classNames)}
                onClick={this._handleClick}>
                {this.props.option.label}
            </li>
        );
    }
}

