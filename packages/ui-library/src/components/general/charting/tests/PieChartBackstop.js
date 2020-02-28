const flows = [
    {
        "sublabel": "longTitle",
        delay: 500,
        textReplaceSelector: {
            selector: ".dashboard-card__title",
            replacement: "ThisreplacementtextisliterallyaslongasafuneraldoomsongandthosearereallyreallyreallyreallyreallylongThisreplacementtextisliterallyaslongasafuneraldoomsongandthosearereallyreallyreallyreallyreallylongThisreplacementtextisliterallyaslongasafuneraldoomsongandthosearereallyreallyreallyreallyreallylong" // eslint-disable-line max-len
        }
    },
];

module.exports = flows.map(flow => ({
    ...flow,
    "root": "Components",
    "label": "PieChart",
    "section": "CoDevelopment",
    "selectors": [
        ".output"
    ],
}));