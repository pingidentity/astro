import React from "react";
import PropTypes from "prop-types";
import InputRow, { InputRowAccessories, rowAlignments } from "../layout/InputRow";
import Link from "../general/Link";
import Multivalues from "../forms/Multivalues";
import FlexRow, { spacingOptions } from "../layout/FlexRow";
import Text from "../general/Text";

/**
* @class DynamicFilter
* @desc Complex control that lets you choose several filters for several categories
*
* @param {string} [data-id=dynamic-filter]
*     The data-id of the component
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
* @param {DynamicFilter~Categories} [categories]
*     Data about the categories that can be added as filters
* @param {object} [value]
*     Object with keys for category values that store arrays of selected option values
* @param {function} [onValueChange]
*     Callback that provides the new value prop whenever the filters are changed
* @param {string} [addFilterLabel="Add Filter"]
*     Label for links that add categories as filters
**/

/** @typedef DynamicFilter~Categories
 * @prop {string} [value]
 *      Value to identify category
 * @prop {string} [label]
 *      Name displayed for category
 * @prop {array} [options]
 *      Options list (value, label) that will be provided for the category
 */

class DynamicFilter extends React.Component {
    static propTypes = {
        classNames: PropTypes.string,
        "data-id": PropTypes.string,
        categories: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string,
            options: PropTypes.arrayOf(PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                label: PropTypes.string,
            }))
        })),
        value: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
        onValueChange: PropTypes.func,
        addFilterLabel: PropTypes.string,
    };

    static defaultProps = {
        "data-id": "dynamic-filter",
        categories: [],
        value: [],
        addFilterLabel: "Add Filter",
    };

    state = {
        focused: null,
    };

    _optionName = option => option.label === undefined ? option.value : option.label;

    _isCategoryActive = categoryName => {
        if (this.state.focused === categoryName) {
            return true;
        }

        const values = this.props.value[categoryName];
        return values && values.length > 0;
    }

    _handleChange = categoryName => (value, e) => this.props.onValueChange({
        ...this.props.value,
        [categoryName]: value
    }, e);

    _handleBlur = () => !this._holdingBlur && this.setState({ focused: null });

    _holdBlur = () => this._holdingBlur = true;
    _releaseBlur = () => this._holdingBlur = false;

    _focusCategory = categoryName => () => this.setState({ focused: categoryName });

    render() {
        const {
            classNames,
            "data-id": dataId,
            categories,
            value,
            addFilterLabel,
        } = this.props;

        const fields = categories.map(({ value: categoryName, name = categoryName, options }) => (
            this._isCategoryActive(categoryName)
                ? (
                    <Multivalues
                        data-id={`filter-${categoryName}`}
                        key={categoryName}
                        labelText={name}
                        options={options}
                        entries={value[categoryName] || []}
                        autoHeight
                        autoWidth
                        onValueChange={this._handleChange(categoryName)}
                        onBlur={this._handleBlur}
                        autoFocus={this.state.focused === categoryName}
                    />
                ) : null
        ));

        const links = categories.filter(category => (!this._isCategoryActive(category.value))).map(category => (
            <Link
                key={category.value}
                onClick={this._focusCategory(category.value)}
                data-id={`link-${category.value}`}
                onMouseDown={this._holdBlur}
                onMouseOut={this._releaseBlur}
                onMouseUp={this._releaseBlur}
            >
                + {this._optionName(category)}
            </Link>
        ));

        return (
            <InputRow className={classNames} data-id={dataId} alignment={rowAlignments.TOP}>
                {fields}
                <InputRowAccessories>
                    {links.length > 0 &&
                        <FlexRow spacing={spacingOptions.SM}>
                            <Text inline type="label">{addFilterLabel}:</Text>
                            {links}
                        </FlexRow>
                    }
                </InputRowAccessories>
            </InputRow>
        );
    }
}

export default DynamicFilter;
