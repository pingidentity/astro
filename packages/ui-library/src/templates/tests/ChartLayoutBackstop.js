const flows = [
    {
        "sublabel": "base",
        delay: 1000,
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Templates",
    "section": "Property Specific",
    "label": "Chart Layout",
    "selectors": [
        ".output"
    ],
}));