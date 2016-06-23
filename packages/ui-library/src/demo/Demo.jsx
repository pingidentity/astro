var React = require("react"),
    thunk = require("redux-thunk"),
    Redux = require("redux"),
    ReactDOM = require("react-dom"),
    ReactRedux = require("react-redux"),
    ReactRouter = require("react-router"),
    ReactRouterRedux = require("react-router-redux"),
    Actions = require("./core/Actions.js"),
    DemoItem = require("./core/DemoItem.jsx"),
    LeftNavBar = require("../components/panels/left-nav"),
    PropsToUrlWatcher = require("../components/offscreen/PropsToUrlWatcher.jsx"),
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

var DemoApp = React.createClass({
    /**
     * @method
     * @name DemoApp#_getDocumentationUrl
     * @param {object} name - The demo descriptor
     * @private
     * @desc Compute the path to the demo item's jsdoc
     * @returns {string} - The jsdoc url
     */
    _getDocumentationUrl: function (name) {
        if (!name) {
            return null;
        }

        return format("build-doc/{packageName}/{packageVersion}/{name}.html", {
            packageName: packageJson.name,
            packageVersion: packageJson.version,
            name: name
        });
    },
    
    /**
     * @method
     * @name DemoApp#_getSourceUrl
     * @param {object} path - The demo descriptor
     * @private
     * @desc Compute the path to the demo item's source code
     * @returns {string} - The source code url
     */
    _getSourceUrl: function (path) {
        if (!path) {
            return null;
        }

        return format("build-doc/{packageName}/{packageVersion}/{path}", {
            packageName: packageJson.name,
            packageVersion: packageJson.version,
            path: path
        });
    },

    /**
    * @method
    * @name DemoApp#_getDocumentationName
    * @private
    * @desc Compute the name of the demo item's jsdoc
    * @returns {string} = the jsdoc name
    */
    _getDocumentationName: function () {
        if (this._demoItem) {
            if (this._demoItem.module) {
                return this._demoItem.pathToDoc && "module-" + this._demoItem.pathToDoc.match(/(\w*)\//)[1] + "_" +
                  this._demoItem.pathToDoc.match(/(\w*).js/)[1];
            } else {
                return this._demoItem.pathToDoc && this._demoItem.pathToDoc.match(/(\w*).jsx/)[1];
            }
        }
    },

    /**
     * @method
     * @name DemoApp#componentWillMount
     * @desc Initialize the app
     */
    componentWillMount: function () {
        //bind action creators
        this.appActions = Redux.bindActionCreators(Actions, this.props.dispatch);
        this.routerActions = Redux.bindActionCreators(ReactRouterRedux.routerActions, this.props.dispatch);
        this.navActions = Redux.bindActionCreators(LeftNavBar.Actions, this.props.dispatch);
        this.headerActions = Redux.bindActionCreators(HeaderBar.Actions, this.props.dispatch);
        this._demoItem = {};

        //set up member variables
        this._demoIndexById = {};
        this._handleKeydown = EventUtils.handleKeydowns({
            38: this.navActions.selectPrevItem,
            40: this.navActions.selectNextItem
        }, true);

        //The demos list doesn't have ids, so this loop will just duplicate the label and use it as an ID.
        //IDs are required by the LeftNavBar.
        //While looping through the demos, register their reducers
        this.navActions.init(require("./core/demos.js").map(function (section) {
            section.id = section.label.replace(/\W/g, "");

            section.children.forEach(function (demo) {
                demo.id = demo.label.replace(/\W/g, "");
                this._demoIndexById[demo.id] = demo;
            }.bind(this));

            if (!section.listOrder) {
                section.children = section.children.sort(function (a, b) {
                    return a.label > b.label ? 1 : -1;
                });
            }

            return section;
        }.bind(this)));

        //Set up the HeaderBar
        this.headerActions.init([
            { id: "help", url: this._getDocumentationUrl("index"), title: "Documentation", label: "JSoc" },
            { id: "cog", children: [{ id: "cog", label: "Cog" }] }
        ]);

        //Watch arrow keys and map them to the corresponding actions
        window.addEventListener("keydown", this._handleKeydown , false);
    },

    /**
     * @method
     * @name DemoApp#componentWillUnmount
     * @desc Remove event listeners, references to DOM nodes and cleanup.
     *
     */
    componentWillUnmount: function () {
        window.removeEventListener("keydown", this._handleKeydown);
    },

    /**
     * @method
     * @name DemoApp#componentDidMount
     * @desc Some initialization cannot take place until the app has mounted and rendered.  That code will be
     * put here.  For instance, loading the query string.
     */
    componentDidMount: function () {
        //load the arguments from the query string
        if (this.props.location.query.openNode) {
            this.navActions.toggleSection(this.props.location.query.openNode);
        }
        if (this.props.location.query.selectedNode) {
            this.navActions.selectItem(this.props.location.query.selectedNode);
        }
    },

    /**
     * @method
     * @name DemoApp#componentWillReceiveProps
     * @param {object} newProps - Next props
     * @desc If the app receives a new selectedNode then fetch the markup for the displayed demo
     */
    componentWillReceiveProps: function (newProps) {
        var id = newProps.nav.selectedNode;

        //Make sure the demo item exists since an invalid component id could be set in the URL when the demoApp loads
        if (newProps.nav.selectedNode !== this.props.nav.selectedNode && this._demoIndexById[id]) {
            this._demoStore = null;
            this._demoItem = this._demoIndexById[id];
            this._demo = this._demoItem.demo;

            //Some demo items may have no pathToDoc (e.g. tutorial items)
            if (this._demoItem.pathToDoc) {
                this.appActions.fetchCode(id, this._demoItem.pathToDoc);
            }

            //If the demo exposes a Reducer, create an isolated store for the demo to use.  This way the demo
            //can act like a standalone application.
            if (this._demo.Reducer) {
                this._demoStore = Redux.applyMiddleware(thunk)(Redux.createStore)(this._demo.Reducer);
            }
        }
    },

    render: function () {
        var id = this.props.nav.selectedNode,
            name = this._getDocumentationName(),
            path = this._demoItem.pathToSource,
            watch = _.pick(this.props.nav, "openNode", "selectedNode");

        return (
            <div className="components-container">
                {
                  /*
                   * Header bar doesnt do anything interesting within this app, but normally the account menu would
                   * be housed here.
                   */
                }
                <HeaderBar {...this.props.header}
                    label="UI Library"
                    onItemClick={this.headerActions.toggleItem} />

                {
                  /*
                   * This is the nav bar containing the demos
                   */
                }
                <LeftNavBar {...this.props.nav}
                    onItemClick={this.navActions.selectItem}
                    onSectionClick={this.navActions.toggleSection} />

                {
                  /*
                   * When an item is selected in the nav bar, the corresponding demo is looked up and rendered
                   * here
                   */
                }
                <div id="content">
                    <div className="components">
                        <DemoItem label={this._demoItem.label}
                            watch={watch}
                            replace={this.routerActions.replace}
                            location={this.props.location}
                            store={this._demoStore}
                            type={this._demo}
                            jsdocUrl={this._getDocumentationUrl(name)}
                            codePathUrl={this._getSourceUrl(path)}
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
            </div>);
    }
});

/** Connect the app to the redux store */
DemoApp = ReactRedux.connect(function (state) {
    return {
        code: state.app.code,
        nav: state.nav,
        header: state.header,
        all: state
    };
})(DemoApp);

/** Setup the router with a single route */
ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <ReactRouter.Router history={history}>
            <ReactRouter.Route path="/" component={DemoApp} />
        </ReactRouter.Router>
    </ReactRedux.Provider>,

    document.getElementById("demo"));
