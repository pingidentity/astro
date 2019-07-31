import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import FormDropDownList from "../forms/FormDropDownList";
import FormLabel from "../forms/FormLabel";
import FormRadioGroup from "../forms/FormRadioGroup";

import Utils from "../../util/Utils.js";
import _ from "underscore";
import { cannonballPortalWarning } from "../../util/DeprecationUtils";

import { cannonballProgressivelyStatefulWarning } from "../../util/DeprecationUtils";
import { inStateContainer } from "../utils/StateContainer";
import { flagsPropType, hasFlag, getFlags } from "../../util/FlagUtils";


/**
 * @enum {string}
 * @alias ConditionalFieldset.Type
 */
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
        "data-id": PropTypes.string,
        description: PropTypes.node,
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
        flags: flagsPropType,
    };

    static defaultProps = {
        "data-id": "conditional-fieldset",
        disabled: false,
        emptyMessage: "-- Select an option --",
        required: false,
        selectedIndex: 0,
        supportEmpty: false,
    };

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    componentDidMount() {
        if (!hasFlag(this, "use-portal")) {
            cannonballPortalWarning({ name: "ConditionalFieldset" });
        }
    }

    _handleSelectValueChange = (option) => {
        this.props.onValueChange(option.value);
    };

    _handleRadioValueChange = (value) => {
        this.props.onValueChange(Number(value));
    };

    _getOptions = type => {
        const dataId = this.props["data-id"] + "-options";

        if (this.props.required || type === Types.SELECT) {
            const indexOffset = this.props.supportEmpty ? 1 : 0;
            const options = _.map(this.props.children, (child, i) => {
                return ({
                    value: i + indexOffset,
                    label: child.props.title,
                    iconName: child.props.icon ? child.props.icon : null,
                    type: "inline",
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
                    flags={getFlags(this)}
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
        const {
            children,
            "data-id": dataId,
            label,
            selectedIndex,
            supportEmpty,
            type,
        } = this.props;

        const checkedType = type || ((children.length > 2) ? Types.SELECT : Types.RADIO);
        const options = this._getOptions(checkedType);
        const index = this._getConvertedIndex();
        const showFieldset = !(supportEmpty && selectedIndex === 0) && children[index].props.children;
        const className = classNames({ focused: showFieldset, unfocused: !showFieldset }, "conditional-fieldset");

        return (
            <div>
                <FormLabel data-id={`${dataId}-label`} className="detached" description={this.props.description}>
                    {label}
                </FormLabel>
                <fieldset data-id={dataId} className={className}>
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
 */

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
 *     Add the "use-portal" flag to render dropdown with popper.js and react-portal
 *     Add the "p-stateful" flag to use the progressivly stateful version of this component.
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
 *     <InputRow>
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
 *     </InputRow>
 *
 * @example
 *     <InputRow>
 *         <label className="detached">ConditionalFieldset with empty support, set through dom, stateful</label>
 *         <ConditionalFieldset
 *             data-id="fieldset-4"
 *             type={this.state.selectedTypeName} >
 *             <div title="Do nothing"></div>
 *             <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
 *             <div title="Option 2">Option 2</div>
 *         </ConditionalFieldset>
 *     </InputRow>
 *
 */
export default class ConditionalFieldset extends React.Component {

    static propTypes = {
        stateless: PropTypes.bool
    };

    static defaultProps = {
        stateless: false,
    };

    static Types = Types;

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    _usePStateful = () => hasFlag(this, "p-stateful");

    componentDidMount () {
        if (!Utils.isProduction() && this.props.controlled !== undefined) {
            throw new Error(Utils.deprecatePropError("controlled", "stateless"));
        }
        if (!this._usePStateful()) {
            cannonballProgressivelyStatefulWarning({ name: "ConditionalFieldset" });
        }
    }

    render() {

        if (this._usePStateful()) {
            return <PStatefulConditionalFieldset {...this.props} />;
        }

        return this.props.stateless
            ? React.createElement(ConditionalFieldsetStateless,
                _.defaults({ ref: "ConditionalFieldsetStateless" }, this.props), this.props.children)
            : React.createElement(ConditionalFieldsetStateful,
                _.defaults({ ref: "ConditionalFieldsetStateful" }, this.props), this.props.children);
    }
}

const PStatefulConditionalFieldset = inStateContainer([
    {
        name: "selectedIndex",
        initial: 0,
        setter: "onValueChange",
    }
])(ConditionalFieldsetStateless);
PStatefulConditionalFieldset.displayName = "PStatefulConditionalFieldset";
