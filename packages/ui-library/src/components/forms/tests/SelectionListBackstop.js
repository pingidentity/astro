const flows = [
    {},
    {
        "sublabel": "search-value",
        "keyPressSelectors": [
            {
                "selector": "input[data-id='searchBox-input']",
                "keyPress": "test",
            }
        ],
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "Selection List",
    "section": "List Inputs",
    "selectors": [
        "body"
    ],
}));