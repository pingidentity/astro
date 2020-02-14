const flows = [
    {
        "hoverSelector": "a[data-id='BasicInputs-label']",
        postInteractionWait: 250 // Wait for CSS transition
    },
    {
        "sublabel": "light-mode",
        "clickSelector": "div[data-id='light-mode']",
        "postInteractionWait": 500,
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