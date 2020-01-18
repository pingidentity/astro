import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { contains } from "underscore";
import { chartingColors } from "../../../constants/DashboardConstants";
import ChipPanel from "./ChipPanel";
import FilterSelector from "../../filters/FilterSelector";
import { ListType } from "../../forms/selection-list";
import { valueProp, translateItemsToOptions } from "../../../util/PropUtils";

/**
* @class DropDownSelector
* @desc A dropdown for charting that also shows chips for selected items.
*
* @param {string} [data-id="dropdown-selector"]
*     The data-id assigned to the top-most container of the component.
* @param {string} [className]
*     A url to an image to display in the background of the component.
* @param {string} [label]
*     The label of the dropdown.
* @param {bool} [open]
*     Whether or not the selector is open.
* @param {DropDownSelector~onDeselectOption} [onDeselectOption]
*     Fires when an option is deselected; sends back the ID of the option and the event.
* @param {DropDownSelector~onSelectOption} [onSelectOption]
*     Fires when an option is selected; sends back the ID of the option and the event.
* @param {DropDownSelector~onToggle} [onToggle]
*     Fires when selector opens or closes.
* @param {array} [options=[]]
*     The options for the dropdown selector. Takes an array of objects, each with an id and a name.
* @param {string} [optionsNote]
*     A note that displays just below the search box.
* @param {string} [requiredText]
*     Text that will show as required when the selector is opened.
* @param {array} [selectedOptionIds=[]]
*     An array of strings or numbers that match with the options parameter to show which are selected.
*/
export default class DropDownSelector extends Component {

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        label: PropTypes.string,
        open: PropTypes.bool,
        onDeselectOption: PropTypes.func,
        onSelectOption: PropTypes.func,
        onToggle: PropTypes.func,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                color: PropTypes.string,
                id: valueProp, // alias for value
                name: PropTypes.string, // alias for name
                value: valueProp,
                label: PropTypes.string,
            })
        ),
        optionsNote: PropTypes.node,
        requiredText: PropTypes.string,
        selectedOptionIds: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        ),
    }

    static defaultProps = {
        "data-id": "dropdown-selector",
        options: [],
        selectedOptionIds: []
    }

    constructor(props) {
        super(props);
        const { open = false } = props;
        this.state = { open };
    }

    // Have to use underscore's contains here because version of node in Jenkins
    // doesn't support array.includes
    _getChips = (selected, options) =>
        translateItemsToOptions(options)
            .filter(({ value }) => contains(selected, value))
            .map((opt, index) => ({ color: chartingColors[index], ...opt }));

    _filterOptions = () => translateItemsToOptions(this.props.options).filter(({ value }) =>
        !contains(this.props.selectedOptionIds, value)
    );

    _toggle = val => {
        if (this.props.open === undefined) {
            this.setState(({ open }) => ({ open: !open }));
        }

        // The else case is being handled in tests but coverage isn't catching it
        /* istanbul ignore next*/
        if (this.props.onToggle) {
            this.props.onToggle(val);
        }
    }

    render() {
        return (
            <div className={classnames(this.props.className, "dropdown-selector")}>
                <FilterSelector
                    data-id={this.props["data-id"]}
                    label={this.props.label}
                    bottomPanel={
                        <ChipPanel
                            chips={this._getChips(this.props.selectedOptionIds, this.props.options)}
                            className="dropdown-selector__list__panel"
                            onClick={this.props.onDeselectOption}
                        />
                    }
                    onToggle={this._toggle}
                    onValueChange={this.props.onSelectOption}
                    open={this.state.open}
                    options={this._filterOptions()}
                    optionsNote={this.props.optionsNote}
                    requiredText={this.props.requiredText}
                    selected={this.props.selectedOptionIds}
                    type={ListType.ADD}
                />
                <ChipPanel
                    className="dropdown-selector__bottom-panel"
                    chips={this._getChips(this.props.selectedOptionIds, this.props.options)}
                    onClick={this.props.onDeselectOption}
                />
            </div>
        );
    }
}
