const flows = [
    {
        "sublabel": "unitinput-error",
        "hoverSelector": "div[class='input-textselect unit-input form-error']",
        "postInteractionWait": 5000,
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "UnitInput",
    "section": "Complex Inputs",
    "selectors": [
        ".output"
    ],
}));
