var keyMirror = require("fbjs/lib/keyMirror");

module.exports.Types = keyMirror({
    SHOWS: null,
    MOVIES: null
});

module.exports.Items = [
    {
        label: "Directory",
        children: [
            {
                label: "TV Shows",
                type: module.exports.Types.SHOWS,
                content: require("../views/shows")
            },
            {
                label: "Movies",
                type: module.exports.Types.MOVIES,
                content: require("../views/movies")
            }
        ]
    }
];