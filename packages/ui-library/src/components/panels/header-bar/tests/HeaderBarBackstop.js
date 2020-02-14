const flows = [
    {
        "sublabel": "market-selector",
        "clickSelector": "div[data-id='first-header-bar'] label[data-id='market-selector']",
    },
    {
        "sublabel": "environment-selector",
        "clickSelector": "div[data-id='first-header-bar'] span[data-id='environment-selector'] a",
    },
    {
        "sublabel": "account-menu",
        "clickSelector": "div[data-id='first-header-bar'] a[data-id='account-trigger']",
    },
    {
        "sublabel": "header-nav",
        "interactions": [
            {
                "type": "click",
                "selector": "div[data-id='first-header-bar'] a[data-id='Connections-label']",
            },
            {
                "type": "hover",
                "selector": "div[data-id='first-header-bar'] a[data-id='Settings-label']",
            },
        ],
    },
];

module.exports = flows.map(flow => ({
    "root": "Components",
    "label": "Header Bar",
    "section": "Navigation",
    "selectors": [
        ".output"
    ],
    ...flow,
}));