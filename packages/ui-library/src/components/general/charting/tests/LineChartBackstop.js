const flows = [
    {
        "sublabel": "base",
        delay: 500,
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "LineChart",
    "section": "CoDevelopment",
    "selectors": [
        ".output"
    ],
}));