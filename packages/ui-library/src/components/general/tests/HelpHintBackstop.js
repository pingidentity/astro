const flows = [
    {
        "sublabel": "helphint-top-placement",
        "hoverSelector": "div[data-id='helphint-topplacement']",
        "postInteractionWait": 300,
    },
    {
        "sublabel": "helphint-bottom-placement",
        "hoverSelector": "div[data-id='helphint-bottomplacement']",
        "postInteractionWait": 300,
    },
    {
        "sublabel": "helphint-left-placement",
        "hoverSelector": "div[data-id='helphint-leftplacement']",
        "postInteractionWait": 300,
    },
    {
        "sublabel": "helphint-right-placement",
        "hoverSelector": "div[data-id='helphint-rightplacement']",
        "postInteractionWait": 300,
    },
    {
        "sublabel": "helphint-error-type",
        "hoverSelector": "div[data-id='helphint-error']",
        "postInteractionWait": 300,
    },
    {
        "sublabel": "helphint-success-type",
        "hoverSelector": "div[data-id='helphint-success']",
        "postInteractionWait": 300,
    },
    {
        "sublabel": "helphint-warning-type",
        "hoverSelector": "div[data-id='helphint-warning']",
        "postInteractionWait": 300,
    },
    {
        "sublabel": "helphint-light-type",
        "hoverSelector": "div[data-id='helphint-light']",
        "postInteractionWait": 300,
    },
    {
        "sublabel": "helphint-more-link",
        "hoverSelector": "div[data-id='helphint-more']",
        "postInteractionWait": 300,
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "HelpHint",
    "section": "Modals Tooltips",
    "selectors": [
        ".output"
    ],
}));