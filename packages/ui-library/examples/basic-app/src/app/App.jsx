var React = require("react"),
    Redux = require("redux"),
    ReactDOM = require("react-dom"),
    ReactRedux = require("react-redux"),
    ReactRouter = require("react-router"),
    ReactRouterRedux = require("react-router-redux"),
    _ = require("underscore"),
    NavItems = require("./core/navItems"),
    AppContent = require("./core/AppContent.jsx"),
    Actions = require("./core/Actions.js"),
    WizardActions = require("ui-library/src/components/wizard/WizardActions"),
    LeftNavBar = require("ui-library/src/components/panels/left-nav"),
    HeaderBar = require("ui-library/src/components/panels/header-bar"),
    PropsToUrlWatcher = require("ui-library/src/components/offscreen/PropsToUrlWatcher.jsx"),
    ShowsView = require("./views/shows"),
    store = require("./core/store.js"),
    history = ReactRouterRedux.syncHistoryWithStore(ReactRouter.hashHistory, store),
    EventUtils = require("ui-library/src/util/EventUtils.js");

// the SCSS files will be compiled by a webpack plugin
// and injected into the head section of the HTML page by another plugin
require("../ui-lib-assets/css/ui-library.scss");    // UI Library styles
require("../css/app.scss");     // Basic app specific styles

var App = React.createClass({

    /*
    * Initialize the app
    */
    componentWillMount: function () {

        //bind action creators
        this.appActions = Redux.bindActionCreators(Actions, this.props.dispatch);
        this.routerActions = Redux.bindActionCreators(ReactRouterRedux.routerActions, this.props.dispatch);
        this.navActions = Redux.bindActionCreators(LeftNavBar.Actions, this.props.dispatch);
        this.headerActions = Redux.bindActionCreators(HeaderBar.Actions, this.props.dispatch);
        this.wizardActions = Redux.bindActionCreators(WizardActions, this.props.dispatch);
        this.showsViewActions = Redux.bindActionCreators(ShowsView.Actions, this.props.dispatch);

        //set up member variables
        this._navItemsById = {};
        this._handleKeydown = EventUtils.handleKeydowns({
            38: this.navActions.selectPrevItem,
            40: this.navActions.selectNextItem
        }, true);

        //Set up the LeftNavbar
        //  IDs are required by the LeftNavBar but the navItems list doesn't hav any,
        //  so loop through and just duplicate the label and use it as an ID.
        //  While looping, initialize navItemById.
        this.navActions.init(NavItems.Items.map(function (section) {
            section.id = section.label.replace(/\W/g, "");

            section.children.forEach(function (child) {
                child.id = child.label.replace(/\W/g, "");

                this._navItemsById[child.id] = child;
            }.bind(this));

            return section;
        }.bind(this)));

        //Set up the HeaderBar
        this.headerActions.init([
            { id: "help", title: "Help", label: "Help" },
            { id: "cog", children: [{ id: "cog", label: "Cog" }] }
        ]);

        //Watch arrow keys and map them to the corresponding actions
        window.addEventListener("keydown", this._handleKeydown, false);
    },

    /*
    * Remove event listeners, references to DOM nodes and cleanup
    */
    componentWillUnmount: function () {
        window.removeEventListener("keydown", this._handleKeydown);
    },

    /*
    * Some initialization cannot take place until the app has mounted and rendered.
    *   That code will be put here. For instance, loading the query string.
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

    /*
    * Get the correct view for the current nav item
    */
    _getViewContent: function (id, props) {
        switch (this._navItemsById[id].type) {
            case NavItems.Types.SHOWS:
                return (
                    <AppContent {...props}
                            content={this._navItemsById[id].content}
                            onReplaceUrl={this.routerActions.replace}
                            onWizardReset={this.wizardActions.reset}
                            onWizardNext={this.wizardActions.next}
                            onWizardChoose={this.wizardActions.pick}
                            onWizardEdit={this.wizardActions.edit}
                            onShowsAddWizardReset={this.showsViewActions.addReset}
                            onShowsSearchFilterValueChange={this.showsViewActions.setFilter}
                            onShowsActiveTabValueChange={this.showsViewActions.setActiveTab}
                            onShowsSearchAdvancedToggle={this.showsViewActions.setExpandedSearch}
                            onShowsScrollPositionValueChange={this.showsViewActions.setPosition}
                            onShowsAdd={this.showsViewActions.add}
                            onShowsValueChange={this.showsViewActions.set}
                            onShowsEdit={this.showsViewActions.edit}
                            onShowsEditSave={this.showsViewActions.saveEdit}
                            onShowsEditCancel={this.showsViewActions.cancelEdit} />
                );
            default:
                return (
                    <AppContent {...props}
                            content={this._navItemsById[id].content} />
                );
        }
    },

    render: function () {
        var id = this.props.nav.selectedNode;
        var watch = _.pick(this.props.nav, "openNode", "selectedNode");

        return (
            <div>
                {
                  /*
                   * Header bar doesnt do anything interesting within this app, but normally the account menu would
                   * be housed here.
                   */
                }
                <HeaderBar {...this.props.header}
                        label="Basic UI Library App"
                        onItemValueChange={this.headerActions.toggleItem} />

                {
                  /*
                   * This is the nav bar containing the navigation items
                   */
                }
                <LeftNavBar {...this.props.nav}
                        onItemValueChange={this.navActions.selectItem}
                        onSectionValueChange={this.navActions.toggleSection} />
                {
                    /*
                    * When an item is selected in the nav bar, the corresponding view is rendered
                    */
                    this._navItemsById[id] && this._getViewContent(id, _.extend({}, this.props, { watch: watch }))
                }
                {
                    /*
                    * This component will watch the provided properties and update the url hash when they change
                    */
                }
                <PropsToUrlWatcher ignoreFalse={true}
                        location={this.props.location}
                        onReplaceUrl={this.routerActions.replace}
                        watch={watch} />
            </div>
        );
    }
});

/** Connect the app to the redux store */
App = ReactRedux.connect(function (state) {
    return {
        nav: state.nav,
        header: state.header,
        wizard: state.wizard,
        shows: state.shows,
        all: state
    };
})(App);

/** Setup the router with a single route */
ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <ReactRouter.Router history={history}>
            <ReactRouter.Route path="/" component={App} />
        </ReactRouter.Router>
    </ReactRedux.Provider>,

    document.getElementById("app"));
