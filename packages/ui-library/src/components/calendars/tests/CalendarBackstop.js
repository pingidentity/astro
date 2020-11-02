const flows = [
    {
        "sublabel": "base",
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "Calendar",
    "section": "ComplexInputs",
    "selectors": [
        ".output"
    ],
}));
