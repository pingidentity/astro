const flows = [
    {},
    {
        "sublabel": "light-mode",
        "clickSelector": "div[data-id='light-mode']",
    },
    {
        "sublabel": "legacy",
        "clickSelector": "div[data-id='legacy']",
        postInteractionWait: 250 // Wait for CSS transition
    },
    {
        "sublabel": "remove-top-content",
        "clickSelector": "div[data-id='remove-top-content']",
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "Left Nav Bar",
    "section": "Navigation",
    "selectors": [
        "body"
    ],
}));