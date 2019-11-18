const flows = [
    {},
    {
        "sublabel": "light-mode",
        "clickSelector": "div[data-id='light-mode']",
    },
    {
        "sublabel": "legacy",
        "clickSelector": "div[data-id='legacy']",
    },
    {
        "sublabel": "remove-top-content",
        "clickSelector": "div[data-id='remove-top-content']",
    },
]

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "Left Nav Bar",
    "section": "Navigation",
    "selectors": [
        "body"
    ],
}));