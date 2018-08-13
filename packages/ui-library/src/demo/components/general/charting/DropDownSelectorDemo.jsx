import React, { Component } from "react";
import DropDownSelector, { filterItems } from "../../../../components/general/charting/DropDownSelector";

/**
* @name DropDownSelectorDemo
* @memberof DropDownSelector
* @desc A demo for Drop Down Selector component
*/
export default class DropDownSelectorDemo extends Component {
    initialOptions = [
        {
            id: "Confluence",
            name: "Confluence"
        },
        {
            id: "DataDog",
            name: "DataDog"
        },
        {
            id: "DocuSign",
            name: "DocuSign"
        },
        {
            id: "Google Calendar",
            name: "Google Calendar"
        },
        {
            id: "Google Drive",
            name: "Google Drive"
        },
    ]

    state = {
        options: this.initialOptions,
        selectedOptionIds: []
    }

    _renderOptions = options => options.map((opt) => {
        const { length: selectedCount } = this.state.selectedOptionIds;
        const selectedIndex = this.state.selectedOptionIds.indexOf(opt.id);
        if (selectedIndex < 0) {
            return opt;
        } else if (selectedIndex === 0) {
            return {
                ...opt,
                className: "chip-panel__chip--first",
            };
        } else if ((selectedIndex === 1 && selectedCount === 1) || selectedIndex === 2) {
            return {
                ...opt,
                className: "chip-panel__chip--third"
            };
        } else {
            return {
                ...opt,
                className: "chip-panel__chip--second"
            };
        }
    })
    _search = (searchTerm, items) => {
        this.setState(() => ({
            options: searchTerm === "" ? this.initialOptions : filterItems(items, searchTerm)
        }));
    }

    _deselectOption = id => this.setState(({ options, selectedOptionIds }) => {
        const selected = selectedOptionIds.filter(selId => selId !== id);
        return {
            options: options.filter(({ optId }) => !selected.includes(optId)),
            selectedOptionIds: selected
        };
    })

    _selectOption = ({ id }) => this.setState(({ selectedOptionIds }) => ({
        selectedOptionIds: selectedOptionIds.length < 3 ? [...selectedOptionIds, id] : selectedOptionIds
    }));

    render() {
        return (
            <DropDownSelector
                label="Applications"
                onDeselectOption={this._deselectOption}
                onSearch={this._search}
                onSelectOption={this._selectOption}
                options={this._renderOptions(this.state.options)}
                optionsNote={<p>Limit of 3 applications.</p>}
                requiredText={
                    this.state.selectedOptionIds.length === 0 ? "Minimum of 1 application required." : null
                }
                selectedOptionIds={this.state.selectedOptionIds}
            />
        );
    }
}
