var React = require("re-react"),
    ReactVanilla = require("react"),
    classNames = require("classnames"),
    FormDropDownList = require("../forms/FormDropDownList.jsx"),
    FormRadioGroup = require("../forms/FormRadioGroup.jsx"),
    Utils = require("../../util/Utils.js"),
    _ = require("underscore");

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

var ConditionalFieldsetStateless = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string.isRequired,
        className: React.PropTypes.string.affectsRendering,
        type: React.PropTypes.string.affectsRendering,
        supportEmpty: React.PropTypes.bool.affectsRendering,
        emptyMessage: React.PropTypes.string.affectsRendering,
        onValueChange: React.PropTypes.func,
        selectedIndex: React.PropTypes.number.affectsRendering,
        disabled: React.PropTypes.bool.affectsRendering,
        children: React.PropTypes.node.affectsRendering
    },

    getDefaultProps: function () {
        return {
            supportEmpty: false,
            emptyMessage: "-- Select an option --",
            selectedIndex: 0,
            disabled: false
        };
    },

    _addEmptyNode: function () {
        var alreadyAdded = false;
        React.Children.forEach(this.props.children, function (child) {
            if (child.props.children === undefined) {
                alreadyAdded = true;
                return;
            }
        });
        if (!alreadyAdded) {
            var emptyDiv = React.createElement ("div", { title: this.props.emptyMessage } );
            this.props.children.splice(0, 0, emptyDiv);
        }
    },

    _handleSelectValueChange: function (option) {
        this.props.onValueChange(option.value);
    },

    _handleRadioValueChange: function (value) {
        this.props.onValueChange(Number(value));
    },

    _getOptions: function (type) {
        var options = [];
        var index = 0;
        if (this.props.supportEmpty) {
            this._addEmptyNode();
        }
        var dataId = this.props["data-id"] + "-options";
        if (type === Types.SELECT) {
            React.Children.forEach(this.props.children, function (child) {
                options.push({ value: (index), label: child.props.title });
                index = index + 1;
            });

            return (
                <FormDropDownList data-id={dataId}
                    disabled={this.props.disabled}
                    options={options}
                    onValueChange={this._handleSelectValueChange}
                    selectedOption={options[this.props.selectedIndex]}
                    title={options[this.props.selectedIndex].label} />
            );
        } else {
            React.Children.forEach(this.props.children, function (child) {
                options.push({ id: (index), name: child.props.title });
                index = index + 1;
            });
            return (
                <FormRadioGroup
                    ref="options"
                    data-id={dataId}
                    disabled={this.props.disabled}
                    groupName={this.props["data-id"]+"-radio-group"}
                    stacked={false}
                    selected={this.props.selectedIndex}
                    onValueChange={this._handleRadioValueChange}
                    items={options}
                />
            );
        }
    },

    render: function () {
        var type = this.props.type || ((this.props.children.length > 2) ? Types.SELECT : Types.RADIO);
        var options = this._getOptions(type);
        var showFieldset = (this.props.children[this.props.selectedIndex].props.children !== undefined);
        var className = classNames({ focused: showFieldset, unfocused: !showFieldset }, "conditional-fieldset");
        return (
            <fieldset data-id={this.props["data-id"]} className={className}>
                <legend>
                    {options}
                </legend>
                {this.props.children[this.props.selectedIndex]}
            </fieldset>
        );
    }
});

var ConditionalFieldsetStateful = ReactVanilla.createClass({

    _handleValueChange: function (index) {
        this.setState({
            selectedIndex: Number(index)
        });
    },

    getInitialState: function () {
        return {
            selectedIndex: this.props.selectedIndex || 0
        };
    },

    render: function () {
        var props = _.defaults({
            ref: "ConditionalFieldsetStateless",
            selectedIndex: this.state.selectedIndex,
            onValueChange: this._handleValueChange
        }, this.props);

        return React.createElement(ConditionalFieldsetStateless, props, this.props.children);
    }
});

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
 * @param {boolean} [stateless]
 *          To enable the component to be externally managed. True will relinquish control to the component's owner.
 *          False or not specified will cause the component to manage state internally. If True, onValueChange and
 *          selectedIndex will be managed by the component.
 * @param {boolean} [controlled=false]
 *     DEPRECATED. Use "stateless" instead.
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
var ConditionalFieldset = ReactVanilla.createClass({

    propTypes: {
        controlled: React.PropTypes.bool, //TODO: remove in new version
        stateless: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false //TODO: change to stateless in new version
        };
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("controlled", "stateless"));
        }
    },

    render: function () {
        var stateless = this.props.stateless !== undefined ? this.props.stateless : this.props.controlled;

        return stateless
            ? React.createElement(ConditionalFieldsetStateless, //eslint-disable-line no-use-before-define
            _.defaults({ ref: "ConditionalFieldsetStateless" }, this.props), this.props.children)
            : React.createElement(ConditionalFieldsetStateful, //eslint-disable-line no-use-before-define
            _.defaults({ ref: "ConditionalFieldsetStateful" }, this.props), this.props.children);
    }
});

ConditionalFieldset.Types = Types;

module.exports = ConditionalFieldset;
