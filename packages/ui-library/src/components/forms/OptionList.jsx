import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import classnames from "classnames";
import Icon from "../general/Icon";
import HelpHint from "../tooltips/HelpHint";
import _ from "underscore";

/**
 * @class OptionList
 *
 * @desc Renders a list of options. Used for dropdowns
 *
 * @param {string} [data-id="option-list"]
 *     To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {array<OptionList~Option>} [options=[]]
 *     Array of objects that define each option in the list.
 * @param {string} [value]
 *     The current selected value. Should match with the value attribute of an option
 * @param {number} [highlightedIndex]
 *     The highlighted item. -1 means nothing's highlighted.
 * @param {function} [onKeyDown]
 *     Handle key down events
 * @param {function} [onValueChange]
 *     Callback that receives the new selection when it changes
 * @param {function} [onFocus]
 *     Handle focus events
*/

/**
 * @typedef {object} OptionList~Option
 * @desc Defines an option in the list
 * @param {string} [data-id="option-item"]
 *     To define the base "data-id" value for the top-level HTML container.
 * @property {boolean} heading
 *      Is this a heading for a group of options?
 * @property {string} helpHintText
 *      When supplied, renders a help hint for this item
 * @property {string} iconName
 *      When supplied, renders an icon by this name
 * @property {string} label
 *      The text for this option
 * @property {string} value
 *      The value for this option
*/

/**
 * @class OptionList~OptionItem
 *
 * @desc Component that renders an item in the option list
 *
 * @param {boolean} active
 *      Is this the active item?
 * @param {boolean} heading
 *      Is this a heading for a group of options?
 * @param {string} helpHintText
 *      When supplied, renders a help hint for this item
 * @param {string} iconName
 *      When supplied, renders an icon by this name
 * @param {string} label
 *      The text for this option
 * @param {function} onSelect
 *      Handles event when this item is selected
 * @param {boolean} selected
 *      Is this the selected item?
 * @param {boolean} withIcon
 *      True when in a list with icons. If iconName isn't supplied, this option will show empty space instead
 */

const makeHandleValueChange = (onValueChange, value) => () => onValueChange(value);

const maybeHelpHintWrapper = (helpHintText, content) => (
    helpHintText
        ? <HelpHint
            delayHide={0}
            placement="right"
            hintText={helpHintText}
            className="option-list__helphint-trigger"
            unstyleTrigger
        >
            {content}
        </HelpHint>
        : content
);

class OptionItem extends React.Component {
    static propTypes = {
        active: PropTypes.bool,
        "data-id": PropTypes.string,
        heading: PropTypes.bool,
        helpHintText: PropTypes.string,
        iconName: PropTypes.string,
        label: PropTypes.string,
        onSelect: PropTypes.func,
        selected: PropTypes.bool,
        withIcon: PropTypes.bool,
    };

    static defaultProps = {
        active: false,
        "data-id": "option-item",
        heading: false,
        onSelect: _.noop,
        selected: false,
        withIcon: false,
    };

    _makeVisible = () => this.props.active && ReactDOM.findDOMNode(this).scrollIntoView({ block: "center" });

    componentDidUpdate = () => this._makeVisible();
    componentDidMount = () => this._makeVisible();

    render () {
        const {
            "data-id": dataId,
            heading,
            value,
            label = value,
            helpHintText,
            iconName,
            selected,
            onSelect,
            active,
            withIcon,
        } = this.props;
        return heading
            ? <li
                data-id={dataId}
                className="option-list__heading"
            >{label}</li>
            : <li
                data-id={dataId}
                onClick={onSelect}
                className={classnames("option-list__item", {
                    "option-list__item--selected": selected,
                    "option-list__item--active": active,
                })}
            >
                {maybeHelpHintWrapper(helpHintText,
                    <div>
                        {(withIcon || iconName) &&
                            <Icon iconName={iconName || ""} type="leading" className="option-list__icon"/>
                        }
                        {label}
                    </div>
                )}
            </li>;
    }
}

const OptionList = ({
    className,
    "data-id": dataId,
    highlightedIndex,
    value,
    options,
    onKeyDown,
    onValueChange,
    onFocus,
}) => {
    const hasIcons = options.some(option => option.iconName);

    return (
        <ul
            className={classnames("option-list", className)}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            data-id={dataId}
        >
            {options.map((option, index) => (
                <OptionItem
                    {...option}
                    key={option.value || option.heading}
                    active={highlightedIndex === index}
                    selected={value === option.value}
                    onSelect={makeHandleValueChange(onValueChange, option.value)}
                    withIcon={hasIcons}
                />
            ))}
        </ul>
    );
};

OptionList.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    highlightedIndex: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            heading: PropTypes.bool,
            helpHintText: PropTypes.string,
            iconName: PropTypes.string,
            label: PropTypes.string,
            value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
        })
    ),
    onKeyDown: PropTypes.func,
    onValueChange: PropTypes.func,
    onFocus: PropTypes.func,
};

OptionList.defaultProps = {
    "data-id": "option-list",
    highlightedIndex: -1,
    options: [],
    onKeyDown: _.noop,
    onValueChange: _.noop,
    onFocus: _.noop,
};

export default OptionList;