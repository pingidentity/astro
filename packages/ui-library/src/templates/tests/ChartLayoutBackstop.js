const flows = [
    {
        "sublabel": "base",
        delay: 4500,
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