import React from "react";
import PropTypes from "prop-types";
import Button from "../../components/buttons/Button";


/**
 * @class Reporting Filters
 * @desc A component for the reporting filter.
 *
 * @param {string} [data-id="reporting-filter"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [buttonLabel]
 *    Html name of the button.
 * @param {array} [filters]
 *    An array that lets you pass in multiple jsx elements.
 *
 * @example
 * <ReportFilters
 *       buttonLabel="Run"
 *       filters={[
 *           [
 *               <FormDropDownList
 *                   label="Report Type"
 *                   selectedOption={reportType[0]}
 *                   options={reportType}
 *               />
 *           ],
 *           [
 *               <FormDropDownList
 *                   label="Time Range"
 *                   selectedOption={mockTimeRange[0]}
 *                   options={mockTimeRange}
 *                   width={InputWidths.SM}
 *               />,
 *               <UnitInput
 *                   labelText="Unit Input Text"
 *                   textFieldProps={{
 *                       value: 1,
 *                       width: InputWidths.XS,
 *                       name: "text-field"
 *                   }}
 *                   dropDownListProps={{
 *                       options: mockTime,
 *                       selectedOption: mockTime[3],
 *                       width: InputWidths.XS,
 *                       name: "dropdown"
 *                   }}
 *               />
 *           ],
 *           [
 *               <FormTextField label="Filter" width={InputWidths.SM}/>,
 *           ],
 *       ]}
 *   />
 *
 */

const _renderInput = hasDivider => (input, index, array) => {
    const divider = index === array.length - 1 && hasDivider
        ? <div key="divider-key" className="reporting-filters--divider" /> : null;
    return (
        [
            <div key="inputs-key" className="reporting-filters--inputs">
                {input}
            </div>,
            divider
        ]
    );
};

const _renderInputs = (data) => {
    return data.flatMap(( array, index ) => {
        const isNotLast = index !== data.length - 1;
        return (
            array.map(_renderInput(isNotLast))
        );
    });
};


const ReportFilters = ({
    "data-id": dataId,
    filters,
    buttonLabel
}) => {
    return (
        <div data-id={dataId} className="reporting-filters">
            <div className="reporting-filters__container modifier_light-inputs">
                {_renderInputs(filters)}
                <Button className="reporting-filters--button-margin" label={buttonLabel} type="primary"/>
            </div>
        </div>
    );
};


ReportFilters.propTypes = {
    dataId: PropTypes.string,
    buttonLabel: PropTypes.string,
    filters: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.node
        )
    )
};

ReportFilters.defaultProps = {
    "data-id": "reporting-filters",
    filters: []
};

module.exports = ReportFilters;

