var React = require("react"),
    classNames = require("classnames"),
    FormSelectField = require("../forms/form-select-field/index").v2,
    FormRadioGroup = require("../forms/FormRadioGroup.jsx"),
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
        className: React.PropTypes.string,
        type: React.PropTypes.string,
        supportEmpty: React.PropTypes.bool,
        emptyMessage: React.PropTypes.string,
        onValueChange: React.PropTypes.func,
        selectedIndex: React.PropTypes.number
    },

    getDefaultProps: function () {
        return {
            type: Types.SELECT,
            supportEmpty: false,
            emptyMessage: "-- Select an option --",
            selectedIndex: 0
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
            var emptyDiv = React.createElement ("div", { label: this.props.emptyMessage } );
            this.props.children.splice(0, 0, emptyDiv);
        }
    },

    _getOptions: function () {
        var options = [];
        var index = 0;
        if (this.props.supportEmpty) {
            this._addEmptyNode();
        }
        var dataId = this.props["data-id"] + "-options";
        if (this.props.type === Types.SELECT) {
            React.Children.forEach(this.props.children, function (child) {
                options.push({ value: (index), label: child.props.label });
                index = index + 1;
            });
            return (
                <FormSelectField
                    ref="options"
                    controlled={true}
                    data-id={dataId}
                    label=""
                    options={options}
                    onValueChange={this.props.onValueChange}
                    value={this.props.selectedIndex}
                />
            );
        } else {
            React.Children.forEach(this.props.children, function (child) {
                options.push({ id: (index), name: child.props.label });
                index = index + 1;
            });
            return (
                <FormRadioGroup
                    ref="options"
                    data-id={dataId}
                    groupName={this.props["data-id"]+"-radio-group"}
                    stacked={false}
                    selected={this.props.selectedIndex}
                    onValueChange={this.props.onValueChange}
                    items={options}
                />
            );
        }
    },

    render: function () {
        var options = this._getOptions();
        var showFieldset = (this.props.children[this.props.selectedIndex].props.children !== undefined);
        var className = classNames({ focused: showFieldset, unfocused: !showFieldset });
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

var ConditionalFieldsetStateful = React.createClass({

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
 * @param {boolean} [controlled=false]
 *          To enable the component to be externally managed. True will relinquish control to the component's owner.
 *          False or not specified will cause the component to manage state internally. If True, onValueChange and
 *          selectedIndex will be managed by the component.
 * @param {ConditionalFieldset.Type} [type=ConditionalFieldset.Type.SELECT]
 *          Type of selector to display to expose form options
 * @param {boolean} [supportEmpty=false]
 *          Set this if you want to have an empty option inserted. Alternatively you may pass an empty div in as
 *          can be seen in the examples.
 * @param {string} [emptyMessage="-- Select an option --"]
 *          Only really applies if supportEmpty is set to true and no empty div was passed. If that's the case it will
 *          insert an empty div with the emptyMessage as the option.
 * @param {number} selectedIndex
 *          The currently selected option. If using the controlled=false option this is not required.
 * @param {ConditionalFieldset~onValueChange} onValueChange
 *          Callback to be triggered when the selection is changed. If using the controlled=false
 *          option this is not required.
 *
 * @example <div className="input-row">
 *               <label>ConditionalFieldset with empty support, set through props</label>
 *               <ConditionalFieldset data-id="fieldset-1"
 *                                       onValueChange={this._onCondition1ValueChange}
 *                                       selectedIndex={this.state.selectedCondition1Index}
 *                                       supportEmpty={true}
 *                                       controlled={true}
 *                                       emptyMessage={"Do Nothing"}
 *                                       type={this.state.selectedTypeName} >
 *                   <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
 *                   <div title="Option 2">Option 2</div>
 *               </ConditionalFieldset>
 *           </div>
 *
 * @example <div className="input-row">
 *               <label>ConditionalFieldset with empty support, set through dom, stateful</label>
 *               <ConditionalFieldset data-id="fieldset-4"
 *                                   type={this.state.selectedTypeName} >
 *                   <div title="Do nothing"></div>
 *                   <div title="Option 1"><span>Option with some <strong>MARKUP</strong></span></div>
 *                   <div title="Option 2">Option 2</div>
 *               </ConditionalFieldset>
 *           </div>
 *
 */
var ConditionalFieldset = React.createClass({

    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false
        };
    },

    render: function () {
        return this.props.controlled
            ? React.createElement(ConditionalFieldsetStateless, //eslint-disable-line no-use-before-define
            _.defaults({ ref: "ConditionalFieldsetStateless" }, this.props), this.props.children)
            : React.createElement(ConditionalFieldsetStateful, //eslint-disable-line no-use-before-define
            _.defaults({ ref: "ConditionalFieldsetStateful" }, this.props), this.props.children);
    }
});

ConditionalFieldset.Types = Types;

module.exports = ConditionalFieldset;