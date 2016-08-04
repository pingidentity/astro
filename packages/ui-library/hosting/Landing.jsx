var React = require("react"),
    ReactDOM = require("react-dom"),
    fetch = require("isomorphic-fetch"),
    // isomorphic-fetch need a Promise polyfill for older browsers.
    // Promise use inside of fetch, fetch should go with Promise to avoid page crashing in IE.
    Promise = require("es6-promise").Promise, // eslint-disable-line
    HeaderBar = require("../src/components/panels/header-bar/HeaderBar.jsx"),
    LeftNavBar = require("../src/components/panels/left-nav/LeftNavBar.jsx");

// the CSS files will be compiled by a webpack plugin
// and injected into the head section of the HTML page by another plugin
require("../src/css/ui-library.scss"); // UI Library styles
require("../src/demo/css/ui-library-demo.scss"); // UI Library demo styles
require("./assets/css/landing.css");   // Override undesired styles from ui-library.scss and ui-library-demo.scss

var LandingPage = React.createClass({

    _gotoTutorials: function () {
        window.location.href = this.state.version + "/index.html#/?openNode=Tutorials";
    },

    _gotoQuickstartPage: function () {
        window.location.href = this.state.version + "/index.html#/?openNode=Tutorials&selectedNode=UILibrary101";
    },

    _gotoDemoVersion: function (version) {
        window.location.href = version + "/index.html";
    },

    _handleLeftNavBarItemValueChange: function (itemId) {
        if (itemId === "getting-started") {
            this._gotoQuickstartPage();
        } else {
            this._gotoDemoVersion(itemId);
        }
    },

    _handleLeftNavBarSectionValueChange: function (sectionId) {
        this.setState({ leftNavOpenNode: sectionId });
    },

    componentWillMount: function () {
        fetch("versions.json?_=" + new Date().getTime())
            .then(function (resp) {
                if (resp.status >= 400) {
                    throw new Error("Could not get versions from server.");
                }

                return resp.json();
            })
            .then(function (versions) {
                var GETTING_STARTED_NODE = {
                    label: "QuickStart",
                    id: "quickStart",
                    children: [{ label: "Getting Started", id: "getting-started" }]
                };

                if (versions && versions.length > 0) {
                    var latestVersion = versions[versions.length - 1];

                    this.setState({
                        version: latestVersion,
                        headerBarTree: [
                            {
                                id: "help",
                                title: "Documentation",
                                url: latestVersion + "/build-doc/ui-library/" + latestVersion + "/index.html"
                            }
                        ],
                        leftNavBarTree: [
                            GETTING_STARTED_NODE,
                            {
                                label: "Versions",
                                id: "versions",
                                children: versions.map(function (version) {
                                    return { label: version, id: version };
                                })
                            }
                        ]
                    });
                } else {
                    // probably local
                    this.setState({
                        version: "",
                        headerBarTree: [
                            {
                                id: "help",
                                title: "Documentation"
                            }
                        ],
                        leftNavBarTree: [
                            GETTING_STARTED_NODE,
                            {
                                label: "Versions",
                                id: "versions",
                                children: [{ label: "Not found or in development", id: "" }]
                            }
                        ]
                    });
                }
            }.bind(this));
    },

    getInitialState: function () {
        return {
            version: "",
            headerBarTree: [],
            leftNavBarTree: [],
            leftNavOpenNode: "versions"
        };
    },

    render: function () {
        return (
            <div>
                <div className="components-container">
                    <HeaderBar tree={this.state.headerBarTree}
                            label="UI Library" />

                    <LeftNavBar tree={this.state.leftNavBarTree}
                            openNode={this.state.leftNavOpenNode}
                            onItemValueChange={this._handleLeftNavBarItemValueChange}
                            onSectionValueChange={this._handleLeftNavBarSectionValueChange} />


                 <div id="library-content" className="contrast">
                    <div>
                        <div className="section">
                            <div className="documentation">
                                <div className="doc">
                                    <div className="clearfix">
                                        <h1>
                                            Welcome to the UI Library
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <div className="section-content">
                                <div className="clearfix">
                                    <div className="about-section">
                                        <div className="description">
                                            The UI library is intended to solve a number of challenges for
                                            Ping's product development teams:
                                            <ol>
                                                <li><strong>Components:</strong> Ensure that all base-level, reusable
                                                    pieces of UI code developed at Ping can be leveraged by all teams.
                                                </li>
                                                <li><strong>Templates:</strong> Create the most standard layouts
                                                    based on the design standards document produced by UX,
                                                    to provide common markup and styling layouts for teams to use to
                                                    quickly produce pixel-perfect pages.
                                                </li>
                                                <li><strong>Tutorials:</strong> Educate and enable developers
                                                    to use the library components and templates to quickly create
                                                    new applications and features.</li>
                                            </ol>
                                        </div>

                                        <br/><br/>
                                        <div className="description">
                                            Access the current version: <a id="currentVersionLink"
                                                    href={this.state.version + "/index.html"}>
                                                {this.state.version ? this.state.version : "In development"}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="page-section-data-divider"></div>

                                    <div className="content-section">
                                        <div className="content-columns columns-3" data-id="columns-3">
                                            <div className="content-column">
                                                <h2>
                                                    <span data-id="quickstart" className="icon-thumb"></span>
                                                    QuickStart
                                                </h2>

                                                <div className="description">
                                                    Getting up and running with the UI Library is a quick and easy.
                                                    Just follow our 101 quickstart guide and you'll know exactly
                                                    what to do.
                                                </div>

                                                <div className="button-container">
                                                    <button type="button" className="success"
                                                            onClick={this._gotoQuickstartPage}>
                                                        Get Started
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="content-column">
                                                <h2>
                                                    <span data-id="tutorials" className="icon-wand"></span>
                                                    Tutorials
                                                </h2>

                                                <div className="description">
                                                    This <a href="#" onClick={this._gotoTutorials}>tutorial</a> will
                                                    guide you through how to integrate the UI Library project into your
                                                    own project and start using it to create a new application using
                                                    its components and templates. There are a series of tutorials that
                                                    you can refer to with best practices, coding examples, and details
                                                    on how to successfully use the library to increase your team's
                                                    velocity.
                                                </div>
                                            </div>

                                            <div className="content-column">
                                                <h2>
                                                    <span data-id="downloads" className="icon-download"></span>
                                                    Downloads
                                                </h2>
                                                {
                                                    /* eslint-disable max-len */
                                                    <div className="description">
                                                        To download the latest UI Library or a specific version of the
                                                        library you can either download it from artifactory,
                                                        where each version is uploaded with the
                                                        release, or check out the code from Gerrit <a
                                                                href="https://hg-od01.corp.pingidentity.com/r/#/admin/projects/ui-library"
                                                                target="_blanke">
                                                            here
                                                        </a>.
                                                        If you choose to download the source from Gerrit,
                                                        you can access a specific release by branching from a tag.
                                                    </div>
                                                    /* eslint-enable max-len */
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
});

ReactDOM.render(<LandingPage />, document.getElementById("landing"));
