import React, { useState } from "react";
import FilterSelector, * as FilterSelectorComponents from "ui-library/lib/components/filters/FilterSelector";
import FlexRow, { justifyOptions } from "ui-library/lib/components/layout/FlexRow";
import HR from "ui-library/lib/components/general/HR";
import Text, { overflowTypes, textTypes } from "ui-library/lib/components/general/Text";


/**
* @name FilterSelectorDemo
* @memberof FilterSelector
* @desc A demo for FilterSelector
*/

const nestedOptions = [
    {
        label: "Fruits",
        value: "Fruits",
        children: [
            { label: "Apple", value: "Apple" },
            { label: "Orange", value: "Orange" },
            { label: "Banana", value: "Banana" },
        ],
    },
    {
        label: "Vegetables",
        value: "Vegetables",
        children: [
            { label: "Carrot", value: "Carrot" },
            { label: "Lettuce", value: "Lettuce" },
            { label: "Pepper", value: "Pepper" },
            { label: "Cucumber", value: "Cucumber" },
        ],
    },
    {
        label: "Bread",
        value: "Bread",
        children: [
            { label: "White Bread", value: "White Bread", disabled: true },
            { label: "Whole Wheat", value: "Whole Wheat" },
            { label: "Sourdough", value: "Sourdough" },
        ],
    },
];

export default function FilterSelectorDemo() {
    const [values, setValues] = useState([
        "8675309"
    ]);
    const [nestedValues, setNestedValues] = useState([]);

    const composedOptions = [
        {
            value: "US Employees",
            label: (
                <div style={{ width: "300px" }}>
                    <FlexRow justify={justifyOptions.SPACEBETWEEN}>
                        <Text
                            disabled
                            inline
                            type={textTypes.VALUE}
                            overflow={overflowTypes.ELLIPSIS}
                        >US Employees</Text>
                        <Text inline type={textTypes.NOVALUE} overflow={overflowTypes.NOWRAP}>Disabled</Text>
                    </FlexRow>
                </div>
            ),
            disabled: true
        },
        {
            value: "UK Employees",
            label: "UK Employees",
        },
        {
            value: "Canada Employees",
            label: "Canada Employees",
        },
        {
            value: "Germany Employees",
            label: "Germany Employees",
        },
        {
            value: "India Employees",
            label: "India Employees",
        },
        {
            value: "Israel Employees",
            label: "Israel Employees",
        },
        {
            value: "Japan Employees",
            label: "Japan Employees"
        },
    ];
    const [composedOpen, setComposedOpen] = useState(false);
    const [composedSearch, setComposedSearch] = useState("");
    const [showOnlySelected, setShowOnlySelected] = useState(false);
    const {
        count,
        options: optionsToShow,
        selected: composedSelected,
        setSelected: setComposedSelected
    } = FilterSelectorComponents.useFilterSelector(
        {
            initialSelected: [],
            options: composedOptions,
            search: composedSearch,
            showOnlySelected: showOnlySelected
        }
    );

    return (
        <div>
            <FilterSelector
                labelText="A Filter"
                description="Sample Description"
                options={[
                    {
                        id: "43434",
                        name: "US Employees",
                    },
                    {
                        id: "8675309",
                        name: "UK Employees",
                    },
                    {
                        id: "35346534",
                        name: "Canada Employees",
                    },
                    {
                        id: "6898900",
                        name: "Germany Employees",
                    },
                    {
                        id: "864564",
                        name: "India Employees",
                    },
                    {
                        id: "21210",
                        name: "Israel Employees",
                    },
                    {
                        id: "907545",
                        name: "Japan Employees"
                    },
                ]}
                selected={values}
                onValueChange={ids => setValues(ids)}
            />
            <HR />
            <FilterSelector
                labelText="A Filter of Food"
                options={nestedOptions}
                selected={nestedValues}
                onValueChange={selected => setNestedValues(selected)}
                hideSelectionOptions={true}
            />
            <HR />
            <FilterSelectorComponents.Container
                data-id="composed-selector"
                label={
                    <FilterSelectorComponents.Label
                        open={composedOpen}
                        filterLabel={composedSelected.join(", ")}
                        label="A Filter of Food"
                        description="A description"
                        placeholder="A placeholder"
                        required={false}
                    />
                }
                open={composedOpen}
                onToggle={() => setComposedOpen(!composedOpen)}
                count={count}
            >
                <FilterSelectorComponents.Content
                    type={FilterSelectorComponents.Content.types.MULTI}
                    bottomPanel={
                        <FilterSelectorComponents.SelectionOptions
                            clearLabel="Clear"
                            onClear={() => setComposedSelected([])}
                            onShowClick={() => setShowOnlySelected(!showOnlySelected)}
                            showLabel={showOnlySelected ? "Show All" : "Show Only Selected"}
                        />
                    }
                    options={optionsToShow}
                    showSearchBox
                    searchPlaceholder="Search..."
                    onSearch={val => setComposedSearch(val)}
                    onValueChange={selected => setComposedSelected(selected)}
                    queryString={composedSearch}
                    selectedItemIds={composedSelected}
                    width={FilterSelectorComponents.Content.widths.MD}
                />
            </FilterSelectorComponents.Container>
        </div>
    );
}
