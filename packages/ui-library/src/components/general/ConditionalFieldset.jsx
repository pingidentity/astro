var PropTypes = require("prop-types");
var React = require("react"),
    classNames = require("classnames"),
    FormDropDownList = require("../forms/FormDropDownList"),
    FormRadioGroup = require("../forms/FormRadioGroup"),
    Utils = require("../../util/Utils.js"),
    _ = require("underscore");

import FormLabel from "../forms/FormLabel";

/**
 * @enum {string}
 * @alias ConditionalFieldset.Type
 **/
var Types = {
    /** radio group */
    RADIO: "radio",
    /** select field */
    SELECT: "select",
};

class ConditionalFieldsetStateless extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string.isRequired,
        className: PropTypes.string,
        listClassName: PropTypes.string,
        type: PropTypes.string,
        supportEmpty: PropTypes.bool,
        emptyMessage: PropTypes.string,
        onValueChange: PropTypes.func,
        selectedIndex: PropTypes.number,
        disabled: PropTypes.bool,
        children: PropTypes.node,
        name: PropTypes.string,
        label: PropTypes.string
    };

    static defaultProps = {
        supportEmpty: false,
        emptyMessage: "-- Select an option --",
        selectedIndex: 0,
        disabled: false
    };

    _handleSelectValueChange = (option) => {
        this.props.onValueChange(option.value);
    };

    _handleRadioValueChange = (value) => {
        this.props.onValueChange(Number(value));
    };

    _getOptions = (type) => {
        let children = this.props.children.slice();
        //add empty child to the array
        if (this.props.supportEmpty) {
            children.unshift(React.createElement ("div", { title: this.props.emptyMessage } ));
        }

        var dataId = this.props["data-id"] + "-options";
        if (type === Types.SELECT) {
            let options = _.map(children, (child, i) => {
                return ({
                    value: i,
                    label: child.props.title
                });
            });
            return (
                <FormDropDownList
                    data-id={dataId}
                    className={this.props.listClassName}
                    disabled={this.props.disabled}
                    name={this.props.name}
                    options={options}
                    onValueChange={this._handleSelectValueChange}
                    selectedOption={options[this.props.selectedIndex]}
                    title={options[this.props.selectedIndex].label} />
            );
        } else {
            let options = _.map(children, (child, i) => {
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

    render() {
        var type = this.props.type || ((this.props.children.length > 2) ? Types.SELECT : Types.RADIO);
        var options = this._getOptions(type);

        var childIndex;
        var showFieldset;

        //crazy code, but now that we removed mutating of children (terrible thing to do anyway) we need these calculations
        if (this.props.supportEmpty) {
            showFieldset = this.props.selectedIndex === 0 ? false : true;
            //add to child index if there is an empty option
            if (showFieldset) {
                childIndex = this.props.selectedIndex - 1;
            }
        }
        else {
            showFieldset = this.props.children[this.props.selectedIndex].props.children !== undefined;
            childIndex = this.props.selectedIndex;
        }

        var className = classNames({ focused: showFieldset, unfocused: !showFieldset }, "conditional-fieldset");

        return (
            <div>
                <FormLabel data-id={`${this.props["data-id"]}-label`} className="detached">
                    {this.props.label}
                </FormLabel>
                <fieldset data-id={this.props["data-id"]} className={className}>
                    <legend>
                        {options}
                    </legend>
                    {showFieldset ? this.props.children[childIndex] : null}
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
        var props = _.defaults({
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
 *          of components in a bordered area depending on your selection. It aims to make this very easy by
 *          allowing the developer to set a few divs with labels containing the different options. An empty
 *          div can be passed as a "do nothing" type of option.
 *
 * @param {string} data-id
 *          To define the base "data-id" value for the top-level HTML container. Unlike a lot of our components, this is
 *          required.
 * @param {string} [className]
 *          CSS class to set on the top HTML element
 * @param {string} [listClassName]
 *          CSS class to set on the FormDropDownList
 * @param {string} [name]
 *    Name attribute for the input.
 * @param {boolean} [stateless]
 *          To enable the component to be externally managed. True will relinquish control to the component's owner.
 *          False or not specified will cause the component to manage state internally. If True, onValueChange and
 *          selectedIndex will be managed by the component.
 * @param {ConditionalFieldset.Type} [type]
 *          Type of selector to display to expose form options. If not set, it will default to RADIO for 2 options
 *          and select for 3 or more.
 * @param {boolean} [supportEmpty=false]
 *          Set this if you want to have an empty option inserted. Alternatively you may pass an empty div in as
 *          can be seen in the examples.
 * @param {string} [emptyMessage="-- Select an option --"]
 *          Only really applies if supportEmpty is set to true and no empty div was passed. If that's the case it will
 *          insert an empty div with the emptyMessage as the option.
 * @param {number} selectedIndex
 *          The currently selected option. If using the stateless=false option this is not required.
 * @param {ConditionalFieldset~onValueChange} onValueChange
 *          Callback to be triggered when the selection is changed. If using the stateless=false
 *          option this is not required.
 * @param {boolean} [disabled=false]
 *          Disables the ConditionalFieldset options
 *
 * @example <div className="input-row">
 *               <label className="detached">ConditionalFieldset with empty support, set through props</label>
 *               <ConditionalFieldset data-id="fieldset-1"
 *                                       onValueChange={this._onCondition1ValueChange}
 *                                       selectedIndex={this.state.selectedCondition1Index}
 *                                       supportEmpty={true}
 *                                       stateless={true}
 *                                       emptyMessage={"Do Nothing"}
 *                                       type={this.state.selectedTypeName} >
 *                   <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
 *                   <div title="Option 2">Option 2</div>
 *               </ConditionalFieldset>
 *           </div>
 *
 * @example <div className="input-row">
 *               <label className="detached">ConditionalFieldset with empty support, set through dom, stateful</label>
 *               <ConditionalFieldset data-id="fieldset-4"
 *                                   type={this.state.selectedTypeName} >
 *                   <div title="Do nothing"></div>
 *                   <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
 *                   <div title="Option 2">Option 2</div>
 *               </ConditionalFieldset>
 *           </div>
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
            ? React.createElement(ConditionalFieldsetStateless, //eslint-disable-line no-use-before-define
            _.defaults({ ref: "ConditionalFieldsetStateless" }, this.props), this.props.children)
            : React.createElement(ConditionalFieldsetStateful, //eslint-disable-line no-use-before-define
            _.defaults({ ref: "ConditionalFieldsetStateful" }, this.props), this.props.children);
    }
}

ConditionalFieldset.Types = Types;

module.exports = ConditionalFieldset;
