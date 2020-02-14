const flows = [
    {
        "sublabel": "open-filters",
        "clickSelector": "div[data-id='collapsible-link-2']",
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "Collapsible Link",
    "section": "Layout",
    "selectors": [
        ".output"
    ],
}));