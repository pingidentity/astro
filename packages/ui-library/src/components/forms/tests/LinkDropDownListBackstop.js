const flows = [
    {
        "sublabel": "open-list",
        "clickSelector": "span[data-id='stateful-dropdown'] a[data-id='action-btn']",
    },
    {
        "sublabel": "error",
        "interactions": [
            {
                "type": "click",
                "selector": "span[data-id='right-aligned'] a[data-id='action-btn']",
            },
            {
                "type": "hover",
                "selector": "li[data-id='list-option-4']",
            },
        ],
        "selectors": [
            ".output",
            ".popper-container",
        ]
    },
];

module.exports = flows.map(flow => ({
    "root": "Components",
    "label": "Link Drop Down List",
    "section": "List Inputs",
    "selectors": [
        ".output"
    ],
    ...flow,
}));