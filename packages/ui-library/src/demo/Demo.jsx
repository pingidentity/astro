import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import "../util/polyfills.js";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { bindActionCreators, applyMiddleware, createStore } from "redux";
import { Provider, connect } from "react-redux";
import { HashRouter as Router, Route, withRouter, Switch } from "react-router-dom";

// import DemoItem from "./core/DemoItem";
import AppFrame from "../components/panels/AppFrame";
import LeftNavBar from "../components/panels/left-nav";
import HeaderBar from "../components/panels/header-bar";
import store from "./core/store";

import DemoItemsList from "./core/demos.js";

import packageJson from "../../package.json";
import format from "../util/format.js";
import _ from "underscore";

import DemoItem from "./core/DemoItem";

/**
 * The SCSS files will be compiled by a webpack plugin
 * and injected into the head section of the HTML page by another plugin
 */
require("../css/ui-library.scss");
require("./css/ui-library-demo.scss");

class DemoWrapper extends Component {
    parseDemoFile = (ptd) => {
        var path = ptd.replace(/(\.jsx|\.js|\/v2.jsx)/, "Demo.jsx").split("/");
        return path
            .map(function (dir, i) {
                // preps example 3 (v2 file in sub directory with dashes)
                if ((dir.indexOf("-") > -1) && (i === path.length - 1)) {
                    return dir.split("-").map(function (dirPart) {
                        return dirPart.charAt(0).toUpperCase() + dirPart.slice(1);
                    }).join("");

                    // preps example 2 (v2 file in sub directory without dashes)
                } else if (path.length - 1 === i) {
                    return dir.charAt(0).toUpperCase() + dir.slice(1);

                    // example 1 (all others)
                } else {
                    return dir;
                }
            })
            .join("/");
    }

    _demoStore = {};

    state = {
        demoCode: ""
    }

    /**
     * @method
     * @name DemoApp#_getDocumentationUrl
     * @param {object} name - The demo descriptor
     * @private
     * @desc Compute the path to the demo item's jsdoc
     * @returns {string} - The jsdoc url
     */

    _getDocumentationUrl = (name) => {
        if (!name) {
            return null;
        }

        return format("build-doc/{packageName}/{packageVersion}/{name}.html", {
            packageName: packageJson.name,
            packageVersion: packageJson.version,
            name: name
        });
    };

    _buildSourceUrl = (path) => {
        return format("build-doc/{packageName}/{packageVersion}/{path}", {
            packageName: packageJson.name,
            packageVersion: packageJson.version,
            path: path
        });
    };

    /**
     * @method
     * @name DemoApp#_getSourceUrl
     * @param {string|array<string>} path - The demo source code path or an array or source code paths
     * @private
     * @desc Compute the path to the demo item's source code
     * @returns {string|array<string>} - The source code url or an array or source code url if more that one sourc file
     */
    _getSourceUrl = (path) => {
        if (!path) {
            return null;
        }

        if (Array.isArray(path)) {
            return path.map(function (_path) {
                return this._buildSourceUrl(_path);
            }.bind(this));
        } else {
            return this._buildSourceUrl(path);
        }
    };

    /**
    * @method
    * @name DemoApp#_getDocumentationName
    * @private
    * @desc Compute the name of the demo item's jsdoc
    * @returns {string} = the jsdoc name
    */
    _getDocumentationName = (demoItem) => {
        const {
            module,
            pathToDoc,
            docName,
        } = demoItem;

        if (docName) {
            return docName;
        } else if (module && pathToDoc) {
            return "module-" + pathToDoc.match(/(\w*)\//)[1] + "_" +
                pathToDoc.match(/(\w*).js/)[1];
        } else if (pathToDoc) {
            return pathToDoc.match(/(\w*).jsx/)[1];
        }
    };

    /**
    * @method
    * @name DemoApp#_getImportPath
    * @private
    * @desc Compute the path the user will need to import this component in their appActions
    * @returns {string} = The path to the component in the lib folder
    */
    _getImportPath = path => {
        if (path) {
            const pathString = (typeof path === "string") ? path : path[0];
            if (pathString && pathString.replace) {
                return `ui-library/lib/${pathString
                    .replace(/_/g, "/")
                    .replace(/\.jsx\.html$/, "")
                    .replace(/\/v2$/, "")}`;
            }
        }
        return null;
    }

    constructor(props) {
        super(props);

        if (this.props.demoItem.hasOwnProperty("demo")) {
            if (props.demoItem.demo.Reducer) {
                this._demoStore = applyMiddleware(thunk)(createStore)(props.demoItem.demo.Reducer);
            }

            if (props.demoItem.pathToDoc) {
                fetch("src/demo/" + this.parseDemoFile(props.demoItem.pathToDoc))
                    .then((resp) => {
                        resp.text().then((text) => {
                            this.setState({
                                demoCode: text
                            });
                        });
                    });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.demoItem === this.props.demoItem) {
            return;
        }

        if (nextProps.demoItem.hasOwnProperty("demo")) {
            if (nextProps.demoItem.demo.Reducer) {
                this._demoStore = applyMiddleware(thunk)(createStore)(nextProps.demoItem.demo.Reducer);
            }

            if (nextProps.demoItem.pathToDoc) {
                fetch("src/demo/" + this.parseDemoFile(nextProps.demoItem.pathToDoc))
                    .then((resp) => {
                        resp.text().then((text) => {
                            this.setState({
                                demoCode: text
                            });
                        });
                    });
            }
        }
    }

    render() {
        return (
            <div>
                {typeof this.props.demoItem.demo !== "undefined" ? (
                    <DemoItem
                        label={this.props.demoItem.label}
                        store={this._demoStore}
                        type={this.props.demoItem.demo}
                        jsdocUrl={this._getDocumentationUrl(this._getDocumentationName(this.props.demoItem))}
                        codePathUrl={this._getSourceUrl(this.props.demoItem.pathToSource)}
                        demoCodePathUrl={this._getSourceUrl(this.props.demoItem.pathToDemoSource)}
                        importPath={this._getImportPath(this.props.demoItem.pathToSource)}
                        code={this.state.demoCode}
                        status={this.props.demoItem.status}
                        fullscreen={this.props.demoItem.fullscreen}
                        contentPage={this.props.demoItem.contentPage}
                        flags={this.props.demoItem.demo && this.props.demoItem.demo.flags}
                    />
                ) : null }
            </div>
        );
    }

    static defaultProps = {
        demoItem: {}
    }
}

class DemoApp extends Component {

    // Init state
    state = {
        selectedRoot: "Documentation",
        demoItem: {}
    }

    /**
     * @method
     * @name DemoApp#_sortChildren
     * @private
     * @desc Sort the child items of a demo item unless an order is specified by parent
     * @returns {array} = sorted array of demo item children
     */
    _sortChildren = ({ listOrder, ...props }, children = []) => {
        return children.length > 0
            ? {
                children: listOrder
                    ? children
                    : children.sort(({ label: a }, { label: b }) => a > b ? 1 : -1),
                ...props
            }
            : { ...props };
    };

    /**
    * @method
    * @name DemoApp#_processDemoItems
    * @private
    * @desc Recursively processes demo items; adds id for LeftNavBaralong with category and root for search
    * @returns {string} = the jsdoc name
    */
    _processItems = ({ children = [], label, ...props }) => {
        const id = label.replace(/\W/g, "");

        const modifiedChildren = children.map(child => this._processItems(child));

        const item = this._sortChildren({
            id,
            label,
            ...props
        }, modifiedChildren);

        return item;
    };


    // Process demos.js
    DemoItems = DemoItemsList.map(this._processItems);

    /**
    * @method
    * @name DemoApp#_findRoot
    * @private
    * @desc Find a root object based on the root's label
    * @returns {object} = root object
    */
    _findRoot = (label) => {
        return this.DemoItems.find(obj => obj.label === label);
    }

    /**
    * @method
    * @name DemoApp#_selectRoot
    * @private
    * @desc Select a new node when the root is modified
    */
    _selectRoot = (newRoot) => {
        this.setState({
            selectedRoot: newRoot
        });

        this.navActions.setRoot(newRoot);

        // Get the root object
        const selectRoot = this._findRoot(newRoot);

        // Select first root child (section or node)
        let demoItem = selectRoot.children[0];

        this.navActions.toggleSection(this.props.match.params.selectedNode);

        // Check if has sections
        if (demoItem.hasOwnProperty("children")) {

            // Select first node of section
            this.navActions.selectItem(
                demoItem.children[0].id,
                demoItem.id);

            this._selectItem(demoItem.children[0].id, demoItem.id, newRoot);

            demoItem = demoItem.children[0];
        } else {

            // Select top-level node
            this.navActions.selectItem(
                demoItem.id,
                demoItem.id);

            this._selectItem(demoItem.id, demoItem.id, newRoot);
        }

        // Update demo in the state
        this.setState({
            demoItem
        });
    }

    componentWillReceiveProps(nextProps) {

        // If new page
        if (nextProps.location !== this.props.location || !this.state.demoItem) {

            /**
            * Don't execute if called in conjuction with a onRootUpdate to prevent excessive renders
            */
            if (this.props.nav.root !== nextProps.nav.root &&
                this.props.nav.selectedNode === nextProps.nav.selectedNode) {
                return;
            }

            // Get the root object
            let selectedRoot = this.DemoItems.find(obj => obj.label === nextProps.match.params.selectedRoot);

            if (!selectedRoot) {
                return this._defaultPage();
            }

            if (nextProps.match.params.selectedSection !== nextProps.nav.selectedSection) {
                this.navActions.toggleSection(nextProps.match.params.selectedNode);
            }

            // Select node specified in URL
            this.navActions.selectItem(
                nextProps.match.params.selectedNode,
                nextProps.match.params.selectedSection);

            this.navActions.setRoot(nextProps.match.params.selectedRoot);

            // Update demo in the state
            let demoItem = selectedRoot.children
                .find(o => o.id === nextProps.match.params.selectedSection);

            // Section not found -- redirect to home page
            if (typeof demoItem === "undefined") {
                return this._defaultPage();
            }

            if (typeof demoItem.children !== "undefined") {
                demoItem = demoItem.children
                    .find(o => o.id === nextProps.match.params.selectedNode);

                // Node not found -- redirect to home page
                if (typeof demoItem === "undefined") {
                    return this._defaultPage();
                }
            }

            this.setState({
                demoItem
            });
        }
    }

    _selectItem = (selectedNode, selectedSection, root = this.props.nav.root) => {

        // Setting the URL will trigger the selection fxn to run
        this.props.history.push(`/${root}/${selectedSection}/${selectedNode}`);
    }

    _defaultPage = () => {
        this.props.history.replace(
            `/${this.DemoItems[0].label}/${this.DemoItems[0].children[0].id}/${this.DemoItems[0].children[0].id}`
        );
    }

    _getDocumentationUrl = (name) => {
        if (!name) {
            return null;
        }

        return format("build-doc/{packageName}/{packageVersion}/{name}.html", {
            packageName: packageJson.name,
            packageVersion: packageJson.version,
            name: name
        });
    };

    constructor(props) {

        // Init Redux actions
        super(props);

        this.navActions = bindActionCreators(LeftNavBar.Actions, props.dispatch);
        this.headerActions = bindActionCreators(HeaderBar.Actions, props.dispatch);

        // Enable collapsible, updated for LeftNav
        this.navActions.setCollapsible(true);
        this.navActions.setUpdated(true);
        this.navActions.init(require("./core/demos.js").map(this._processItems));

        let selectedRoot = this.DemoItems.find(obj => obj.label === this.props.match.params.selectedRoot);

        if (!selectedRoot) {
            return this._defaultPage();
        }

        this.navActions.setRoot(selectedRoot.label);
        this.navActions.toggleSection(this.props.match.params.selectedSection);
        this.navActions.selectItem(
            this.props.match.params.selectedNode,
            this.props.match.params.selectedSection
        );

        if (!this.props.match.params.selectedRoot ||
            !this.props.match.params.selectedSection ||
            !this.props.match.params.selectedNode) {
            return this._defaultPage();
        }

        let demoItem = selectedRoot.children
            .find(o => o.id === this.props.match.params.selectedSection);

        // Section not found -- redirect to home page
        if (typeof demoItem === "undefined") {
            return this._defaultPage();
        }

        if (typeof demoItem.children !== "undefined") {
            demoItem = demoItem.children
                .find(o => o.id === this.props.match.params.selectedNode);

            // Node not found -- redirect to home page
            if (typeof demoItem === "undefined") {
                return this._defaultPage();
            }
        }

        this.state = {
            demoItem: demoItem ? demoItem : {},
            selectedRoot: this.props.nav.root.label
        };
    }

    render() {
        return (
            <AppFrame
                autoSelectItemFromRoot={false}
                autoSelectSectionFromItem={true}
                autoSelectItemFromSection={true}
                className="components-container"
                oneSectionOnly={true}
                headerBarProps={_.extend(this.props.header, {
                    siteLogo: "uilib",
                    updated: true,
                    tree: [
                        {
                            id: "help",
                            iconClassName: "icon-help",
                            url: this._getDocumentationUrl("index"),
                            title: "Documentation",
                            label: "JSoc"
                        },
                        {
                            id: "user",
                            iconClassName: "icon-account",
                            children: [{ id: "cog", label: "Cog" }]
                        }
                    ]
                })}
                leftNavBarProps={this.props.nav}
                root={this.props.nav.root}
                searchable={true}
                navTree={this.props.nav.tree}
                onRootChange={this._selectRoot}
                onItemChange={this._selectItem}
                onSectionChange={this.navActions.toggleSection}
                flags={["use-portal"]}
            >
                <div id="content" data-id="components">
                    <DemoWrapper
                        demoItem={this.state.demoItem}
                    />
                </div>
            </AppFrame>
        );
    }
}

const ConnectedDemoApp = withRouter(connect((state) => {
    return {
        nav: state.nav,
        header: state.header,
        all: state
    };
})(DragDropContext(HTML5Backend)(DemoApp)));

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <Switch>
                <Route
                    exact
                    path="/"
                    component={ConnectedDemoApp} />
                <Route
                    exact
                    path="/:selectedRoot"
                    component={ConnectedDemoApp} />
                <Route
                    exact
                    path="/:selectedRoot/:selectedSection"
                    component={ConnectedDemoApp} />
                <Route
                    exact
                    path="/:selectedRoot/:selectedSection/:selectedNode"
                    component={ConnectedDemoApp} />
            </Switch>
        </Provider>
    </Router>,
    document.getElementById("demo")
);