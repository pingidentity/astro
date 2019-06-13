import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import "../util/polyfills.js";

const React = require("react"),
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
        const {
            _demoItem: {
                module,
                pathToDoc,
                docName,
            }
        } = this;

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

        this._demoIndexById = {
            [id]: item,
            ...this._demoIndexById
        };

        return item;
    };

    /**
     * @method
     * @name DemoApp#constructor
     * @desc Initialize and rendering the app
     */
    constructor(props) {
        super(props);
        // bind action creators
        this.appActions = Redux.bindActionCreators(Actions, props.dispatch);
        this.routerActions = Redux.bindActionCreators(ReactRouterRedux.routerActions, props.dispatch);
        this.navActions = Redux.bindActionCreators(LeftNavBar.Actions, props.dispatch);
        this.headerActions = Redux.bindActionCreators(HeaderBar.Actions, props.dispatch);
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

        this.navActions.init(require("./core/demos.js").map(this._processItems));
        this.navActions.setRoot("Documentation");
    }

    /**
     * @method
     * @name DemoApp#componentDidMount
     * @desc Some initialization cannot take place until the app has mounted and rendered.  That code will be
     * put here.  For instance, loading the query string.
     */
    componentDidMount() {
        const {
            query: {
                root,
                selectedNode,
                selectedSection
            }
        } = this.props.location;
        // load the arguments from the query string
        if (selectedNode) {
            if (selectedSection) {
                this.navActions.toggleSection(selectedSection);
            }
            if (root) {
                this.navActions.setRoot(root);
            }
            this.navActions.selectItem(
                selectedNode,
                selectedSection);
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
    componentWillReceiveProps({ nav: { selectedNode: id } }) {
        const { [id]: demoItem } = this._demoIndexById;
        // Make sure the demo item exists since an invalid component id could be set in the URL when the demoApp loads
        if (id !== this.props.nav.selectedNode && demoItem) {
            this._demoStore = null;
            this._demoItem = demoItem;
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
        const id = this.props.nav.selectedNode,
            name = this._getDocumentationName(),
            path = this._demoItem.pathToSource,
            demoPath = this._demoItem.pathToDemoSource,
            watch = _.pick(this.props.nav, "selectedSection", "selectedNode", "root");

        return (
            <AppFrame
                autoSelectItemFromRoot={true}
                autoSelectSectionFromItem={false}
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
                searchable={true}
                navTree={this.props.nav.tree}
                root={this.props.nav.root}
                onRootChange={this.navActions.setRoot}
                onItemChange={this.navActions.selectItem}
                onSectionChange={this.navActions.toggleSection}
                flags={[ "use-portal" ]}
            >
                <div id="content" data-id="components">
                    <DemoItem label={this._demoItem.label}
                        watch={watch}
                        replace={this.routerActions.replace}
                        location={this.props.location}
                        store={this._demoStore}
                        type={this._demo}
                        jsdocUrl={this._getDocumentationUrl(name)}
                        codePathUrl={this._getSourceUrl(path)}
                        demoCodePathUrl={this._getSourceUrl(demoPath)}
                        importPath={this._getImportPath(this._demoItem.pathToSource)}
                        code={this.props.code[id]}
                        status={this._demoItem.status}
                        fullscreen={this._demoItem.fullscreen}
                        contentPage={this._demoItem.contentPage}
                        flags={this._demo && this._demo.flags}
                    />
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
DemoApp = ReactRedux.connect((state) => {
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
