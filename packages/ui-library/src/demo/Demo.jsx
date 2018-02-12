import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import "../util/polyfills.js";

var React = require("react"),
    thunk = require("redux-thunk"),
    Redux = require("redux"),
    ReactDOM = require("react-dom"),
    ReactRedux = require("react-redux"),
    ReactRouter = require("react-router"),
    ReactRouterRedux = require("react-router-redux"),
    Actions = require("./core/Actions.js"),
    DemoItem = require("./core/DemoItem"),
    AppFrame = require("../components/panels/AppFrame"),
    LeftNavBar = require("../components/panels/left-nav"),
    PropsToUrlWatcher = require("../components/offscreen/PropsToUrlWatcher"),
    HeaderBar = require("../components/panels/header-bar"),
    store = require("./core/store.js"),
    history = ReactRouterRedux.syncHistoryWithStore(ReactRouter.hashHistory, store),
    packageJson = require("../../package.json"),
    EventUtils = require("../util/EventUtils.js"),
    format = require("../util/format.js"),
    _ = require("underscore");

// the SCSS files will be compiled by a webpack plugin
// and injected into the head section of the HTML page by another plugin
require("../css/ui-library.scss");
require("./css/ui-library-demo.scss");

class DemoApp extends React.Component {
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
    _getDocumentationName = () => {
        if (this._demoItem) {
            if (this._demoItem.module) {
                return this._demoItem.pathToDoc && "module-" + this._demoItem.pathToDoc.match(/(\w*)\//)[1] + "_" +
                  this._demoItem.pathToDoc.match(/(\w*).js/)[1];
            } else {
                return this._demoItem.pathToDoc && this._demoItem.pathToDoc.match(/(\w*).jsx/)[1];
            }
        }
    };

    /**
    * @method
    * @name DemoApp#_getImportPath
    * @private
    * @desc Compute the path the user will need to import this component in their appActions
    * @returns {string} = The path to the component in the lib folder
    */
    _getImportPath = (path) => {
        if (!path) {
            return null;
        }

        return `lib/${path.replace(/\.jsx$/, ".js")}`;
    };

    /**
     * @method
     * @name DemoApp#componentWillMount
     * @desc Initialize the app
     */
    componentWillMount() {
        // bind action creators
        this.appActions = Redux.bindActionCreators(Actions, this.props.dispatch);
        this.routerActions = Redux.bindActionCreators(ReactRouterRedux.routerActions, this.props.dispatch);
        this.navActions = Redux.bindActionCreators(LeftNavBar.Actions, this.props.dispatch);
        this.headerActions = Redux.bindActionCreators(HeaderBar.Actions, this.props.dispatch);
        this._demoItem = {};

        // set up member variables
        this._demoIndexById = {};
        this._handleKeydown = EventUtils.handleKeydowns({
            38: this.navActions.selectPrevItem,
            40: this.navActions.selectNextItem
        }, true);

        // Enable collapsible, updated for LeftNav
        this.navActions.setCollapsible(true);
        this.navActions.setUpdated(true);

        // The demos list doesn't have ids, so this loop will just duplicate the label and use it as an ID.
        // IDs are required by the LeftNavBar.
        // While looping through the demos, register their reducers
        const processItems = item => {
            item.id = item.label.replace(/\W/g, "");
            this._demoIndexById[item.id] = item;

            if (item.children) {
                if (!item.listOrder) {
                    item.children = item.children.sort(function (a, b) {
                        return a.label > b.label ? 1 : -1;
                    });
                }

                item.children.forEach(processItems);
            }

            return item;
        };
        this.navActions.init(require("./core/demos.js").map(processItems));
        this.navActions.setRoot("Documentation");

        // Watch arrow keys and map them to the corresponding actions
        window.addEventListener("keydown", this._handleKeydown, false);
    }

    /**
     * @method
     * @name DemoApp#componentWillUnmount
     * @desc Remove event listeners, references to DOM nodes and cleanup.
     *
     */
    componentWillUnmount() {
        window.removeEventListener("keydown", this._handleKeydown);
    }

    /**
     * @method
     * @name DemoApp#componentDidMount
     * @desc Some initialization cannot take place until the app has mounted and rendered.  That code will be
     * put here.  For instance, loading the query string.
     */
    componentDidMount() {
        // load the arguments from the query string
        if (this.props.location.query.selectedNode) {
            if (this.props.location.query.selectedSection) {
                this.navActions.toggleSection(this.props.location.query.selectedSection);
            }
            if (this.props.location.query.root) {
                this.navActions.setRoot(this.props.location.query.root);
            }
            this.navActions.selectItem(
                this.props.location.query.selectedNode,
                this.props.location.query.selectedSection);
        } else {
            // set initial page to docs if none selected
            this.navActions.toggleSection("Docs");
            this.navActions.selectItem("ReleaseNotes", "Docs");
        }
    }

    /**
     * @method
     * @name DemoApp#componentWillReceiveProps
     * @param {object} newProps - Next props
     * @desc If the app receives a new selectedNode then fetch the markup for the displayed demo
     */
    componentWillReceiveProps(newProps) {
        var id = newProps.nav.selectedNode;

        // Make sure the demo item exists since an invalid component id could be set in the URL when the demoApp loads
        if (newProps.nav.selectedNode !== this.props.nav.selectedNode && this._demoIndexById[id]) {
            this._demoStore = null;
            this._demoItem = this._demoIndexById[id];
            this._demo = this._demoItem.demo;

            // Some demo items may have no pathToDoc (e.g. tutorial items)
            if (this._demoItem.pathToDoc) {
                this.appActions.fetchCode(id, this._demoItem.pathToDoc);
            }

            // If the demo exposes a Reducer, create an isolated store for the demo to use.  This way the demo
            // can act like a standalone application.
            if (this._demo.Reducer) {
                this._demoStore = Redux.applyMiddleware(thunk)(Redux.createStore)(this._demo.Reducer);
            }
        }
    }

    render() {
        var id = this.props.nav.selectedNode,
            name = this._getDocumentationName(),
            path = this._demoItem.pathToSource,
            demoPath = this._demoItem.pathToDemoSource,
            watch = _.pick(this.props.nav, "selectedSection", "selectedNode", "root");

        return (
            <AppFrame
                autoSelectItemFromRoot={true}
                autoSelectSectionFromItem={false}
                autoSelectItemfromSection={true}
                className="components-container"
                oneSectionOnly={true}
                headerBarProps={_.extend(this.props.header, {
                    siteLogo: "uilib",
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
                navTree={this.props.nav.tree}
                root={this.props.nav.root}
                onRootChange={this.navActions.setRoot}
                onItemChange={this.navActions.selectItem}
                onSectionChange={this.navActions.toggleSection}
            >
                <div id="content">
                    <div className="components" data-id="components">
                        <DemoItem label={this._demoItem.label}
                            watch={watch}
                            replace={this.routerActions.replace}
                            location={this.props.location}
                            store={this._demoStore}
                            type={this._demo}
                            jsdocUrl={this._getDocumentationUrl(name)}
                            codePathUrl={this._getSourceUrl(path)}
                            demoCodePathUrl={this._getSourceUrl(demoPath)}
                            importPath={this._getImportPath(this._demoItem.pathToDoc)}
                            code={this.props.code[id]}
                            fullscreen={this._demoItem.fullscreen} />
                    </div>
                </div>

                {
                  /*
                   * This component will watch the provided properties and update the url hash when they change
                   */
                }
                <PropsToUrlWatcher ignoreFalse={true}
                    location={this.props.location}
                    onReplaceUrl={this.routerActions.replace}
                    watch={watch} />
            </AppFrame>);
    }
}

/** Connect the app to the redux store */
DemoApp = ReactRedux.connect(function (state) {
    return {
        code: state.app.code,
        nav: state.nav,
        header: state.header,
        all: state
    };
})(DragDropContext(HTML5Backend)(DemoApp));

/** Setup the router with a single route */
ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <ReactRouter.Router history={history}>
            <ReactRouter.Route path="/" component={DemoApp} />
        </ReactRouter.Router>
    </ReactRedux.Provider>,

    document.getElementById("demo"));
