import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import FormDropDownList from "../forms/FormDropDownList";
import FormLabel from "../forms/FormLabel";
import FormRadioGroup from "../forms/FormRadioGroup";

import Utils from "../../util/Utils.js";
import _ from "underscore";


/**
 * @enum {string}
 * @alias ConditionalFieldset.Type
 **/
const Types = {
    /** radio group */
    RADIO: "radio",
    /** select field */
    SELECT: "select",
};

class ConditionalFieldsetStateless extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        "data-id": PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        emptyMessage: PropTypes.string,
        name: PropTypes.string,
        onValueChange: PropTypes.func,
        label: PropTypes.string,
        listClassName: PropTypes.string,
        required: PropTypes.bool,
        selectedIndex: PropTypes.number,
        supportEmpty: PropTypes.bool,
        type: PropTypes.string,
        flags: PropTypes.arrayOf(PropTypes.string),
    };

    static defaultProps = {
        disabled: false,
        emptyMessage: "-- Select an option --",
        required: false,
        selectedIndex: 0,
        supportEmpty: false,
    };

    _handleSelectValueChange = (option) => {
        this.props.onValueChange(option.value);
    };

    _handleRadioValueChange = (value) => {
        this.props.onValueChange(Number(value));
    };

    _getOptions = type => {
        const dataId = this.props["data-id"] + "-options";
        const { flags } = this.props;

        if (this.props.required || type === Types.SELECT) {
            const indexOffset = this.props.supportEmpty ? 1 : 0;
            const options = _.map(this.props.children, (child, i) => {
                return ({
                    value: i + indexOffset,
                    label: child.props.title
                });
            });
            const noneData = {
                label: this.props.emptyMessage || null,
                value: 0
            };
            const noneOption = this.props.supportEmpty ? noneData : null;
            const noneSelected = this.props.supportEmpty && this.props.selectedIndex === 0;
            const selectedOption = noneSelected ? noneData : options[this._getConvertedIndex()];

            return (
                <FormDropDownList
                    data-id={dataId}
                    className={this.props.listClassName}
                    disabled={this.props.disabled}
                    name={this.props.name}
                    noneOption={noneOption}
                    options={options}
                    onValueChange={this._handleSelectValueChange}
                    required={this.props.required && this.props.supportEmpty} // indicator only shows if noneOption is selected
                    selectedOption={selectedOption}
                    title={selectedOption.label}
                    width={this.props.inputWidth}
                    flags={flags}
                />
            );
        } else {
            const options = _.map(this.props.children, (child, i) => {
                return ({
                    id: i,
                    name: child.props.title
                });
            });

            return (
                <FormRadioGroup
                    ref="options"
                    data-id={dataId}
                    disabled={this.props.disabled}
                    groupName={this.props.name || this.props["data-id"]+"-radio-group"}
                    stacked={false}
                    selected={this.props.selectedIndex}
                    onValueChange={this._handleRadioValueChange}
                    items={options}
                />
            );
        }
    };

    _getConvertedIndex = () => {
        return this.props.supportEmpty ? this.props.selectedIndex - 1 : this.props.selectedIndex;
    }

    _getChild = index => {
        const { type, props } = this.props.children[index];
        return React.createElement(type, _.omit(props, ["title"]));
    }

    render() {
        const type = this.props.type || ((this.props.children.length > 2) ? Types.SELECT : Types.RADIO);
        const options = this._getOptions(type);
        const index = this._getConvertedIndex();
        const showFieldset = !(this.props.supportEmpty && this.props.selectedIndex === 0) &&
            this.props.children[index].props.children;
        const className = classNames({ focused: showFieldset, unfocused: !showFieldset }, "conditional-fieldset");

        return (
            <div>
                <FormLabel data-id={`${this.props["data-id"]}-label`} className="detached">
                    {this.props.label}
                </FormLabel>
                <fieldset data-id={this.props["data-id"]} className={className}>
                    <legend>
                        {options}
                    </legend>
                    {showFieldset ? this._getChild(index) : null}
                </fieldset>
            </div>
        );
    }
}

class ConditionalFieldsetStateful extends React.Component {
    state = {
        selectedIndex: this.props.selectedIndex || 0
    };

    _handleValueChange = (index) => {
        this.setState({
            selectedIndex: Number(index)
        });
    };

    render() {
        const props = _.defaults({
            ref: "ConditionalFieldsetStateless",
            selectedIndex: this.state.selectedIndex,
            onValueChange: this._handleValueChange
        }, this.props);

        return React.createElement(ConditionalFieldsetStateless, props, this.props.children);
    }
}

/**
 * @callback ConditionalFieldset~onValueChange
 * @param {number} index
 *     Currently selected option
 **/

/**
 * @class ConditionalFieldset
 * @desc Combines a radio group or select component with a bordered area that will allow you to expand a visible series
 *     of components in a bordered area depending on your selection. It aims to make this very easy by allowing the
 *     developer to set a few divs with labels containing the different options. An empty div can be passed as a "do
 *     nothing" type of option.
 *
 * @param {string} [className]
 *     CSS class to set on the top HTML element
 * @param {string} data-id
 *     To define the base "data-id" value for the top-level HTML container. Unlike a lot of our components, this is
 *     required.
 * @param {boolean} [disabled=false]
 *     Disables the ConditionalFieldset options
 * @param {string} [emptyMessage="-- Select an option --"]
 *     Only really applies if supportEmpty is set to true and no empty div was passed. If that's the case it will
 *     insert an empty div with the emptyMessage as the option.
 * @param {("XS" | "SM" | "MD" | "LG" | "XL" | "XX" | "MAX")} [inputWidth]
 *    Specifies the width of the drop-down input. Should be used in place of "listClassName" to control its width
 * @param {string} [listClassName]
 *     CSS class to set on the FormDropDownList
 * @param {string} [name]
 *    Name attribute for the input.
 * @param {ConditionalFieldset~onValueChange} onValueChange Callback to be triggered when the selection is changed. If
 *     using the stateless=false option this is not required.
 * @param {number} selectedIndex
 *     The index of the currently selected option. If using the stateless=false option this is not required.
 * @param {array} [flags]
 *     Set the flag for "use-portal" to render dropdown with popper.js and react-portal
 * @param {boolean} [stateless]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally. If True, onValueChange and
 *     selectedIndex will be managed by the component.
 * @param {boolean} [supportEmpty=false]
 *     Set this if you want to have an empty option inserted. Alternatively you may pass an empty div in as
 *     can be seen in the examples.
 * @param {ConditionalFieldset.Type} [type]
 *     Type of selector to display to expose form options. If not set, it will default to RADIO for 2 options
 *     and select for 3 or more.
 *
 * @example
 *     <div className="input-row">
 *         <label className="detached">ConditionalFieldset with empty support, set through props</label>
 *         <ConditionalFieldset
 *             data-id="fieldset-1"
 *             onValueChange={this._onCondition1ValueChange}
 *             selectedIndex={this.state.selectedCondition1Index}
 *             supportEmpty={true}
 *             stateless={true}
 *             emptyMessage={"Do Nothing"}
 *             type={this.state.selectedTypeName} >
 *             <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
 *             <div title="Option 2">Option 2</div>
 *         </ConditionalFieldset>
 *     </div>
 *
 * @example
 *     <div className="input-row">
 *         <label className="detached">ConditionalFieldset with empty support, set through dom, stateful</label>
 *         <ConditionalFieldset
 *             data-id="fieldset-4"
 *             type={this.state.selectedTypeName} >
 *             <div title="Do nothing"></div>
 *             <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
 *             <div title="Option 2">Option 2</div>
 *         </ConditionalFieldset>
 *     </div>
 *
 */
class ConditionalFieldset extends React.Component {
    static propTypes = {
        stateless: PropTypes.bool
    };

    static defaultProps = {
        stateless: false
    };

    componentWillMount() {
        if (!Utils.isProduction() && this.props.controlled !== undefined) {
            throw new Error(Utils.deprecatePropError("controlled", "stateless"));
        }
    }

    render() {
        return this.props.stateless
            ? React.createElement(ConditionalFieldsetStateless,
                _.defaults({ ref: "ConditionalFieldsetStateless" }, this.props), this.props.children)
            : React.createElement(ConditionalFieldsetStateful,
                _.defaults({ ref: "ConditionalFieldsetStateful" }, this.props), this.props.children);
    }
}

ConditionalFieldset.Types = Types;

module.exports = ConditionalFieldset;
