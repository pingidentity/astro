const flows = [
    {
        "sublabel": "checked",
        clickSelectors: new Array(10).fill(null).map(
            (val, index) => `[data-id=\"input-row\"]:nth-of-type(${index + 1}) [data-id=\"form-checkbox\"]`
        ),
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Templates",
    "section": "Property Specific",
    "label": "Password Policy",
    "selectors": [
        ".output"
    ],
}));