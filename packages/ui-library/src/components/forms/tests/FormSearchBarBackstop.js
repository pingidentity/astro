const flows = [
    {
        "sublabel": "open-filters",
        "clickSelector": "div[data-id='first-filter-link']",
    },
    {
        "sublabel": "enter-value",
        "keyPressSelectors": [
            {
                "selector": "div[data-id='second'] input[data-id='searchBox-input']",
                "keyPress": "some text for you"
            },
        ]
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "Search Bar",
    "section": "Search & Filter",
    "selectors": [
        ".output"
    ],
}));