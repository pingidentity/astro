import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { callIfOutsideOfContainer } from "../../util/EventUtils.js";
import _ from "underscore";
import Utils from "../../util/Utils.js";
import Popover from "../tooltips/Popover";

/**
 * @callback DropDownButton~onValueChange
 * @param {object} value
 *     Selected value from menu (ie. the value of the selected item in the options object).
 */

/**
 * @callback DropDownButton~onToggle
 * @param {boolean} isOpen
 *     Current open/closed status before click.
 */

/**
 * @class DropDownButton
 * @desc Button which triggers drop down menu using list of provided options.
 *
 * @param {string} [data-id="drop-down-button"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {boolean} [stateless]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally.
 *
 * @param {object} options
 *     An object where the keys are the item IDs, and the values are the corresponding labels.
 * @param {DropDownButton~onValueChange} [onValueChange]
 *     Callback to be triggered when the selection changed.
 * @param {DropDownButton~onToggle} [onToggle]
 *     Callback to be triggered when open/closed state changed. Used only when stateless=true.
 * @param {boolean} [open=false]
 *     Boolean state of open/closed menu. Used only when stateless=true.
 * @param {function} [renderButton]
 *     Function that gets passed the onClick function for the drop down button;
 *     used to render something other than the default button.
 * @param {string} [label]
 *     Label text for button. Not necessary if renderButton is being passed in.
 * @param {string} [title]
 *     Menu title text
 *
 * @example
 *
 *      <DropDownButton title="Drop Down"
 *              data-id="drop-down-menu"
 *              onValueChange={this._changeARule}
 *              options={optionsMenu}
 *      />
 *
 *      <DropDownButton stateless={true}
 *          data-id="drop-down-menu"
 *          title="My menu"
 *          onValueChange={this._changeARule}
 *          open={this.state.menuOpen}
 *          onToggle={this._toggleMenu}
 *          options={{
 *              one: "One",
 *              two: "Two",
 *              three: "Three"
 *          }}
 *     />
 */


class Stateless extends Component {

    static displayName = "DropDownButtonStateless";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        label: PropTypes.string,
        options: PropTypes.object.isRequired,
        onValueChange: PropTypes.func,
        onToggle: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        renderButton: PropTypes.func,
        title: PropTypes.string
    };

    static defaultProps = {
        "data-id": "drop-down-button",
        onValueChange: _.noop,
        options: {},
        open: false
    };

    constructor(props) {
        super(props);
        // TODO: figure out why Jest test was unable to detect the specific error, create tests for throws
        /* istanbul ignore if  */
        if (!Utils.isProduction()) {
            /* istanbul ignore if  */
            if (props.id) {
                /* istanbul ignore next  */
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            /* istanbul ignore if  */
            if (props.controlled !== undefined) {
                /* istanbul ignore next  */
                throw new Error(Utils.deprecatePropError("controlled", "stateless"));
            }
            /* istanbul ignore if  */
            if (props.onSelect) {
                /* istanbul ignore next  */
                throw new Error(Utils.deprecatePropError("onSelect", "onValueChange"));
            }
        }
    }

    /**
     * Triggered
     * @method DropDownButton#_toggle
     * @param {object} e
     *     The ReactJS synthetic event
     * @private
     * @ignore
     */
    _toggle = (e) => {
        e.stopPropagation();
        this.props.onToggle(this.props.open);
    };

    /**
     * On option selected
     * @method DropDownButton#_onValueChanged
     * @param {value} value
     *     The value selected from drop down
     * @private
     * @ignore
     */
    _onValueChanged = (value) => {
        this.props.onValueChange(value);
    };

    _handleGlobalClick = (e) => {
        if (this.props.open) {
            callIfOutsideOfContainer(
                ReactDOM.findDOMNode(this.refs.menu),
                _.partial(this.props.onToggle, this.props.open),
                e
            );
        }
    };

    _handleGlobalKeyDown = (e) => {
        if (e.keyCode === 27 && this.props.open) {
            this.props.onToggle(this.props.open);
        }
    };

    _renderOptionNodes = () => _.map(this.props.options, (value, key) => (
        <a
            data-id={key}
            onClick={_.partial(this._onValueChanged, key)}
            key={key}
            className="dropdown-button__option">
            {value}
        </a>
    ));

    componentDidMount() {
        window.addEventListener("click", this._handleGlobalClick);
        window.addEventListener("keydown", this._handleGlobalKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this._handleGlobalClick);
        window.removeEventListener("keydown", this._handleGlobalKeyDown);
    }

    render() {
        const {
            label,
            open,
            renderButton,
            title
        } = this.props;

        return (
            <Popover
                className={this.props.className}
                data-id={this.props["data-id"]}
                label={
                    renderButton
                        ? renderButton({
                            onClick: this._toggle,
                            label
                        })
                        : <div data-id="action" className="add button inline" onClick={this._toggle}>
                            {label}
                        </div>
                }
                open={open}
            >
                <div className="dropdown-button__options" data-id="options">
                    {title &&
                        <div className="dropdown-button__title" data-id="options-title">{title}</div>}
                    {open && this._renderOptionNodes()}
                </div>
            </Popover>
        );
    }
}

class Stateful extends Component {
    static displayName = "DropDownButtonStateful";

    static defaultProps = {
        onValueChange: _.noop
    };

    state = {
        open: false
    };

    _toggle = () =>
        this.setState(({ open }) => ({
            open: !open
        }));

    _select = (value) => {
        this.setState({
            open: false
        }, function () {
            this.props.onValueChange(value);
        });
    };

    render() {
        const props = _.defaults({
            onToggle: this._toggle,
            onValueChange: this._select,
            open: this.state.open
        }, this.props);
        return <Stateless {...props} />;
    }
}

module.exports = class DropDownButton extends Component {
    static displayName = "DropDownButton";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        stateless: PropTypes.bool,
        options: PropTypes.object,
        onValueChange: PropTypes.func,
        onToggle: PropTypes.func,
        open: PropTypes.bool,
        renderButton: PropTypes.func,
        label: PropTypes.string,
        title: PropTypes.string
    };

    static defaultProps = {
        "data-id": "drop-down-button",
        stateless: false,
        open: false
    };

    render() {
        return this.props.stateless
            ? <Stateless {..._.defaults({ ref: "Stateless" }, this.props)} />
            : <Stateful {..._.defaults({ ref: "Stateful" }, this.props)} />;
    }
};
