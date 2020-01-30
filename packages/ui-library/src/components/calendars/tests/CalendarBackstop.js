const flows = [
    {
        "sublabel": "base",
        "hideSelector": "[data-id='calendar-default-value']",
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "Calendar",
    "section": "ComplexInputs",
    "selectors": [
        "body"
    ],
}));
