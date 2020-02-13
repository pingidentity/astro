const flows = [
    {
        "sublabel": "popover",
        "clickSelector": "button[data-id='add-user-button']",
    },
    {
        "sublabel": "remove",
        "clickSelector": "button[data-id='remove-0']",
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Templates",
    "section": "Property Specific",
    "label": "Sandbox Whitelist",
    "selectors": [
        ".output"
    ],
}));