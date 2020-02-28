const flows = [
    {
        "sublabel": "dropdown-in-modal",
        "interactions": [
            {
                "type": "click",
                "selector": "a[data-id='first-trigger']",
            },
            {
                "type": "click",
                "selector": "label[data-id='test-dropdown'] div[data-id='selected-option']",
            },
        ],
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "Modal",
    "section": "Modal & Tooltip",
    "selectors": [
        ".output"
    ],
}));