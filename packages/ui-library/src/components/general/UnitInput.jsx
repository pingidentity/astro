"use strict";


import React from "react";
import PropTypes from "prop-types";
import FormDropDownList from "../forms/FormDropDownList";
import FormTextField from "../forms/form-text-field";
import FormMessage from "../forms/FormMessage";
import FormLabel from "../forms/FormLabel";
import classnames from "classnames";

/**
 * @class UnitInput
 * @desc  A text field and drop-down compound input for entering a unit and a value.
 *
 * @param {string} [data-id="unit-selection"]
 *     The data-id assigned to the top-level of the component
 * @param {string}   [className]
 *     CSS class names to assign to the top-level of the component
 * @param {string}   [labelText]
 *     The label text for the compound input
 * @param {string} [label]
 *     Alias for labelText
 * @param {object} [textFieldProps]
 *              The value to the properties for the FormTextField
 * @param {object} [dropDownListProps]
 *              The value of the properties for the DropDownList
 */
module.exports = class extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        errorMessage: PropTypes.string,
        labelText: PropTypes.string,
        label: PropTypes.string,
        labelHelpText: PropTypes.string,
        textFieldProps: PropTypes.object,
        dropDownListProps: PropTypes.object,
    };

    static defaultProps = {
        "data-id": "unit-input",
        textFieldProps: {},
        dropDownListProps: {},
    };

    unitInputRef = {};

    calculateErrorRef = () => {
        return this.unitInputRef.clientWidth;
    }

    render() {
        const containerClassName = classnames(
            "input-textselect",
            "unit-input",
            this.props.className,
            {
                "form-error": this.props.errorMessage,
            }
        );

        const {
            className: textFieldClassName = "",
            ...textFieldProps
        } = this.props.textFieldProps;

        const {
            className: dropDownClassName = "",
            ...dropDownProps
        } = this.props.dropDownListProps;

        return (
            <div className={containerClassName} style={{ width: this.calculateErrorRef() }}>
                <FormLabel
                    value= {this.props.labelText || this.props.label}
                    data-id={this.props["data-id"]} detached/>
                <div ref={ref => this.unitInputRef = ref} className="unit-input__input-container">
                    <FormTextField
                        {...textFieldProps}
                        className={ classnames(
                            textFieldClassName,
                            "text-field--right-align",
                            {
                                "unit-input__text-field--error": this.props.errorMessage
                            }
                        )}
                    />
                    <FormDropDownList
                        {...dropDownProps}
                        className={ classnames(
                            dropDownClassName,
                            {
                                "unit-input__drop-down-list--error": this.props.errorMessage
                            }
                        )}
                    />
                </div>
                {this.props.errorMessage && (
                    <FormMessage
                        message={this.props.errorMessage}
                    />
                )}
            </div>
        );
    }
};

