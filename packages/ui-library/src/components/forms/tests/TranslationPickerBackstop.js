const flows = [
    {
        "sublabel": "open-list",
        "clickSelector": "span[data-id='translation-picker'] a[data-id='action-btn']",
        "selectors": [
            ".output",
            ".popper-container",
        ]
    },
];

module.exports = flows.map(flow => ({
    "root": "Components",
    "label": "Translation Picker",
    "section": "List Inputs",
    "selectors": [
        ".output"
    ],
    ...flow,
}));