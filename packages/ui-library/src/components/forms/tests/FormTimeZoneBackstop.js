const flows = [
    {
        "sublabel": "hover-link",
        "interactions": [
            {
                "type": "click",
                "selector": "div[data-id='timezone-stateful-initial-open-collapsible-link']",
            },
            {
                "type": "hover",
                "selector": "div[data-id='timezone-stateless-w-clear-collapsible-link']",
            },
        ]
    },
    {
        "sublabel": "error",
        "interactions": [
            {
                "type": "click",
                "selector": "div[data-id='timezone-stateful-initial-open-collapsible-link']",
            },
            {
                "type": "hover",
                "selector": "div[data-id='undefined-error-message-icon']",
            },
        ]
    },
    {
        "sublabel": "hover-country",
        "interactions": [
            {
                "type": "click",
                "selector": "div[data-id='timezone-stateless-w-clear-collapsible-link']",
            },
            {
                "type": "hover",
                "selector": "button[data-id='country-option_AD']",
            },
        ]
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "Time Zone",
    "section": "Complex Inputs",
    "selectors": [
        ".output"
    ],
}));