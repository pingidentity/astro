const nodes = [
    {
        title: "v3.54.0",
        date: "10/07/19",
        file: require("./release-notes/v3-54-0.md")
    },
    {
        title: "v3.53.0",
        date: "9/22/19",
        file: require("./release-notes/v3-53-0.md")
    },
    {
        title: "v3.52.0",
        date: "9/6/19",
        file: require("./release-notes/v3-52-0.md")
    },
    {
        title: "v3.51.1",
        date: "8/28/19",
        file: require("./release-notes/v3-51-1.md")
    },
    {
        title: "v3.50.0",
        date: "8/9/19",
        file: require("./release-notes/v3-50-0.md")
    },
    {
        title: "v3.49.0",
        date: "7/28/19",
        file: require("./release-notes/v3-49-0.md")
    },
    {
        title: "v3.48.0",
        date: "7/12/19",
        file: require("./release-notes/v3-48-0.md")
    },
    {
        title: "v3.47.0",
        date: "6/28/19",
        file: require("./release-notes/v3-47-0.md")
    },
    {
        title: "v3.46.0",
        date: "6/21/19",
        file: require("./release-notes/v3-46-0.md")
    },
    {
        title: "v3.45.0",
        date: "6/14/19",
        file: require("./release-notes/v3-45-0.md")
    },
    {
        title: "v3.44.0",
        date: "5/31/19",
        file: require("./release-notes/v3-44-0.md")
    },
    {
        title: "v3.43.1",
        date: "5/24/19",
        file: require("./release-notes/v3-43-1.md")
    },
    {
        title: "v3.43.0",
        date: "5/20/19",
        file: require("./release-notes/v3-43-0.md")
    },
    {
        title: "v3.42.0",
        date: "5/18/19",
        file: require("./release-notes/v3-42-0.md")
    },
    {
        title: "v3.41.0",
        date: "5/3/19",
        file: require("./release-notes/v3-41-0.md")
    },
    {
        title: "v3.40.0",
        date: "4/24/19",
        file: require("./release-notes/v3-40-0.md")
    },
    {
        title: "v3.39.0",
        date: "4/19/19",
        file: require("./release-notes/v3-39-0.md")
    },
    {
        title: "v3.38.0",
        date: "4/10/19",
        file: require("./release-notes/v3-38-0.md")
    },
    {
        title: "v3.37.0",
        date: "4/5/19",
        file: require("./release-notes/v3-37-0.md")
    },
    {
        title: "v3.36.0",
        date: "3/22/19",
        file: require("./release-notes/v3-36-0.md")
    },
    {
        title: "v3.35.0",
        date: "3/19/19",
        file: require("./release-notes/v3-35-0.md")
    },
    {
        title: "v3.34.0",
        date: "3/8/19",
        file: require("./release-notes/v3-34-0.md")
    },
    {
        title: "v3.33.0",
        date: "2/22/19",
        file: require("./release-notes/v3-33-0.md")
    },
    {
        title: "v3.32.0",
        date: "2/15/19",
        file: require("./release-notes/v3-32-0.md")
    },
    {
        title: "v3.31.0",
        date: "2/8/19",
        file: require("./release-notes/v3-31-0.md")
    },
    {
        title: "v3.30.0",
        date: "1/25/19",
        file: require("./release-notes/v3-30-0.md")
    },
    {
        title: "v3.29.0",
        date: "1/11/19",
        file: require("./release-notes/v3-29-0.md")
    },
    {
        title: "v3.28.0",
        date: "12/21/18",
        file: require("./release-notes/v3-28-0.md")
    },
    {
        title: "v3.27.0",
        date: "12/7/18",
        file: require("./release-notes/v3-27-0.md")
    },
    {
        title: "v3.26.0",
        date: "11/23/18",
        file: require("./release-notes/v3-26-0.md")
    },
    {
        title: "v3.25.0",
        date: "11/9/18",
        file: require("./release-notes/v3-25-0.md")
    },
    {
        title: "v3.24.0",
        date: "10/31/18",
        file: require("./release-notes/v3-24-0.md")
    },
    {
        title: "v3.23.0",
        date: "10/26/18",
        file: require("./release-notes/v3-23-0.md")
    },
    {
        title: "v3.22.0",
        date: "10/15/18",
        file: require("./release-notes/v3-22-0.md")
    },
    {
        title: "v3.21.0",
        file: require("./release-notes/v3-21-0.md")
    },
    {
        title: "v3.20.0",
        date: "10/12/18",
        file: require("./release-notes/v3-20-0.md")
    },
    {
        title: "v3.19.0",
        file: require("./release-notes/v3-19-0.md")
    },
    {
        title: "v3.18.0",
        date: "9/28/18",
        file: require("./release-notes/v3-18-0.md")
    },
    {
        title: "v3.17.0",
        date: "9/14/18",
        file: require("./release-notes/v3-17-0.md")
    },
    {
        title: "v3.16.0",
        date: "8/31/18",
        file: require("./release-notes/v3-16-0.md")
    },
    {
        title: "v3.15.0",
        date: "8/15/18",
        file: require("./release-notes/v3-15-0.md")
    },
    {
        title: "v3.14.0",
        date: "8/3/18",
        file: require("./release-notes/v3-14-0.md")
    },
    {
        title: "v3.13.0",
        date: "7/23/18",
        file: require("./release-notes/v3-13-0.md")
    },
    {
        title: "v3.12.0",
        date: "7/20/18",
        file: require("./release-notes/v3-12-0.md")
    },
    {
        title: "v3.11.0",
        date: "7/6/18",
        file: require("./release-notes/v3-11-0.md")
    },
    {
        title: "v3.10.0",
        date: "6/22/18",
        file: require("./release-notes/v3-10-0.md")
    },
    {
        title: "v3.9.0",
        date: "6/22/18",
        file: require("./release-notes/v3-9-0.md")
    },
    {
        title: "v3.8.0",
        file: require("./release-notes/v3-8-0.md")
    },
    {
        title: "v3.7.0",
        file: require("./release-notes/v3-7-0.md")
    },
    {
        title: "v3.6.0",
        file: require("./release-notes/v3-6-0.md")
    },
    {
        title: "v3.5.0",
        file: require("./release-notes/v3-5-0.md")
    },
    {
        title: "v3.4.0",
        file: require("./release-notes/v3-4-0.md")
    },
    {
        title: "v3.3.0",
        file: require("./release-notes/v3-3-0.md")
    },
    {
        title: "v3.2.0",
        file: require("./release-notes/v3-2-0.md")
    },
    {
        title: "v3.1.0",
        file: require("./release-notes/v3-1-0.md")
    },
    {
        title: "v3.0.0",
        file: require("./release-notes/v3-0-0.md")
    },
];

module.exports = nodes;
