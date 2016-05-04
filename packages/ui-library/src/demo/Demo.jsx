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
        if (newProps.nav.selectedNode !== this.props.nav.selectedNode) {
            var id = newProps.nav.selectedNode;

            //fetch the demo jsx
            this._demoActions = null;
            this._demoItem = this._demoIndexById[id];
            this._demoWatchProps = this._demoItem && this._demoItem.demo.WatchProps;
            this.appActions.fetchCode(id, this._demoItem.pathToCode);

            //If the demo exposes Actions/Reducer, tie the Reducer into the application store and bind the Actions
            //so they can be injected into the active demo.
            if (this._demoItem.demo.Reducer && this._demoItem.demo.Actions) {
                store.replaceReducer(Redux.combineReducers(
                    _.extend({}, store.baseReducers, _.object([this._demoItem.id], [this._demoItem.demo.Reducer]))));

                this._demoActions = Redux.bindActionCreators(this._demoItem.demo.Actions, this.props.dispatch);

                if (!this.props.all[id] && this._demoWatchProps) {
                    this._injectInitialPropsFromUrl(this._demoWatchProps, this._demoActions);
                }
            }
        }
    },

    /**
     * @method
     * @name DemoApp#_injectInitialPropsFromUrl
     * @private
     * @param {object} watchedProps - The watched props for the current DemoItem
     * @param {object} actions - Bound actions for the current DemoItem
     * @desc When the page first loads, it will read the query string from the url and if the current demo item
     * exposes WatchedProps, it will inject these same props if they're in the list of WatchedProps.
     */
    _injectInitialPropsFromUrl: function (watchedProps, actions) {
        for (var key in this.props.location.query) {
            var parts = key.split(".");
            var subkey;

            //The key in the url might be more specific than the watched prop.  For instance, the watched prop might
            //be an object.  This will get written to the url as path.to.prop=val.  We need to reconstruct this when
            //parsing.
            for (var i = 0; i < parts.length; i += 1) {
                subkey = parts.slice(0, i + 1).join(".");

                if (watchedProps.indexOf(subkey)) {
                    var val = this.props.location.query[key];

                    if (!_.isNaN(parseFloat(val))) { val = parseFloat(val); }
                    if (val === "true") { val = true; }

                    actions.set(key, val);

                    break;
                }
            }
        }
    },

    /**
     * @method
     * @name DemoApp#DemoApp#_watchedProps
     * @private
     * @returns {object} Picks the parts of the store that we want the PropsToUrlWatcher to receive
     * @desc To allow DemoItems to demonstrate use of the PropsToUrlWatcher, extract the props specified in the
     * DemoItem and append them to the properties to watch and sync in the hash query string.
     */
    _watchedProps: function () {
        var props = _.pick(this.props.nav, "openNode", "selectedNode");

        if (this.props.nav.selectedNode && this._demoWatchProps) {
            _.extend(props, _.pick(this.props.all[this.props.nav.selectedNode], this._demoWatchProps));
        }

        return props;
    },

    render: function () {
        var id = this.props.nav.selectedNode;
        var name = this._demoItem && this._demoItem.pathToCode && this._demoItem.pathToCode.match(/(\w*).jsx/)[1];

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
                        <DemoItem label={this._demoItem.label}
                            type={this._demoItem && this._demoItem.demo}
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
                    watch={this._watchedProps()} />
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
