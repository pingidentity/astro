const flows = [
    {},
    {
        "sublabel": "expand",
        "clickSelector": "div[data-id='first']",
    },
    {
        "sublabel": "expand-show-some",
        "clickSelector": "div[data-id='show-some']",
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "Show More",
    "section": "Layout",
    "selectors": [
        ".output"
    ],
}));