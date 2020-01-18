const flows = [
    {
        "sublabel": "open-hover",
        "interactions": [
            {
                "type": "click",
                "selector": "a[data-id='custom-icon-trigger']",
            },
            {
                "type": "hover",
                "selector": "div[data-parent='custom-icon'] a[data-id='option-optionthree']",
            },
        ],
        "postInteractionWait": 5000,
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "Drop Down Button",
    "section": "Actions",
    "selectors": [
        ".output",
        ".popper-container"
    ],
}));