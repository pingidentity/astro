var React = require("react"),
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
    deepClone = require("clone"),
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
     * @name _getDocumentationUrl
     * @memberOf DemoApp
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
     * @name componentWillMount
     * @memberOf DemoApp
     * @desc Initialize the app
     */
    componentWillMount: function () {
        //bind action creators
        this.appActions = Redux.bindActionCreators(Actions, this.props.dispatch);
        this.routerActions = Redux.bindActionCreators(ReactRouterRedux.routerActions, this.props.dispatch);
        this.navActions = Redux.bindActionCreators(LeftNavBar.Actions, this.props.dispatch);
        this.headerActions = Redux.bindActionCreators(HeaderBar.Actions, this.props.dispatch);

        //set up member variables
        this._demoIndexById = {};
        this._handleKeydown = EventUtils.handleKeydowns({
            38: this.navActions.selectPrevItem,
            40: this.navActions.selectNextItem
        }, true);

        //The demos list doesn't have ids, so this loop will just duplicate the label and use it as an ID.
        //IDs are required by the LeftNavBar.
        this.navActions.init(deepClone(require("./core/demos.js")).map(function (section) {
            section.id = section.label.replace(/\W/g, "");

            section.children.forEach(function (demo) {
                demo.id = demo.label.replace(/\W/g, "");
                this._demoIndexById[demo.id] = demo;
            }.bind(this));

            section.children = section.children.sort(function (a, b) {
                return a.label > b.label ? 1 : -1;
            });

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
     * @name componentWillUnmount
     * @memberOf DemoApp
     * @desc Remove event listeners, references to DOM nodes and cleanup.
     *
     */
    componentWillUnmount: function () {
        window.removeEventListener("keydown", this._handleKeydown);
    },

    /**
     * @method
     * @name componentDidMount
     * @memberOf DemoApp
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
     * @name componentWillReceiveProps
     * @memberOf DemoApp
     * @param {object} newProps - Next props
     * @desc If the app receives a new selectedNode then fetch the markup for the displayed demo
     */
    componentWillReceiveProps: function (newProps) {
        if (newProps.nav.selectedNode !== this.props.nav.selectedNode) {
            var id = newProps.nav.selectedNode;
            var demoItem = this._demoIndexById[id];

            //fetch the demo jsx
            this.appActions.fetchCode(id, demoItem.pathToCode);
            this._demoActions = null;

            //If the demo exposes Actions/Reducer, tie the Reducer into the application store and bind the Actions
            //so they can be injected into the active demo.
            if (demoItem.demo.Reducer && demoItem.demo.Actions) {
                store.replaceReducer(Redux.combineReducers(
                    _.extend({}, store.baseReducers, _.object([demoItem.id], [demoItem.demo.Reducer]))));

                this._demoActions = Redux.bindActionCreators(demoItem.demo.Actions, this.props.dispatch);
            }
        }
    },

    render: function () {
        var id = this.props.nav.selectedNode;
        var demo = this._demoIndexById[id] || {};
        var name = demo.pathToCode && demo.pathToCode.match(/(\w*).jsx/)[1];

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
                <div id="library-content">
                    <div className="components">
                        <DemoItem label={demo.label}
                            type={demo.demo}
                            jsdocUrl={this._getDocumentationUrl(name)}
                            code={this.props.code[id]}
                            demoActions={this._demoActions}
                            demoProps={this.props.all[id]} />
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
                    watch={this.props.watchedProps} />
            </div>);
    }
});

/** Connect the app to the redux store */
DemoApp = ReactRedux.connect(function (state) {
    return {
        code: state.app.code,
        nav: state.nav,
        header: state.header,
        watchedProps: {
            openNode: state.nav.openNode,
            selectedNode: state.nav.selectedNode
        },
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
