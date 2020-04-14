const flows = [
    {
        "sublabel": "textarea-error-w-undo",
        "keyPressSelector": {
            "selector": "textarea[data-id='error-w-undo-prop-id-textarea']",
            "keyPress": "cool test!"
        }
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "TextArea",
    "section": "BasicInputs",
    "selectors": [
        ".output"
    ],
}));
