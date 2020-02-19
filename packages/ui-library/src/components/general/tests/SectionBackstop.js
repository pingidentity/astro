const flows = [
    {
        "sublabel": "open-section",
        "clickSelector": "div[data-id='section-w-accessories-title']",
        delay: 500,
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "Section",
    "section": "Layout",
    "selectors": [
        ".output"
    ],
}));