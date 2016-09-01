var React = require("react"),
    Tutorial = require("./Tutorial.jsx"),
    Markup = require("../../core/Markup.jsx");

var BasicApp = React.createClass({

    render: function () {
        return (
            <Tutorial generateTOC={true}>
                <p>
                    This tutorial will guide you through creating a basic application using the UI Library. This basic
                     app is a simple directory of TV shows that supports listing all available shows,
                     adding a new show, and editing an existing show.
                </p>
                <p>
                    The completed app is available for download
                    <a href="examples/basic-app.tar.gz" target="_blank"> here</a>. You can inspect
                     the source code and follow along as the tutorial progresses. You can also run the
                     app using "npm install && npm run start" to see it working.
                </p>
                <p>
                    We also suggest downloading the UI Library source code to follow along with the tutorial as we
                     will be refering to the source code from the UI Library as the tutorial progresses.
                     To download the latest UI Library or a specific version of the library you can either download
                     it from artifactory, where each version is uploaded with the release, or check out the code from
                     Gerrit <a href="https://hg-od01.corp.pingidentity.com/r/#/admin/projects/ui-library"
                        target="_blank">here</a>.
                     If you choose to download the source from Gerrit, you can access a specific release by branching
                     from a tag. You can check which version of the UI Library the basic app is running on by looking
                     in the &quot;basic-app/package.json&quot; file for the &quot;ui-library&quot; dependency.
                </p>
                <p className="attention">
                    For simplicity, the basic app doesn't interact with a server and uses mock data. This tutorial
                     will point out which parts of the code are using mocks as we reach them and the source code will
                     contain comments on these parts as well.
                </p>

                <h2>The Basic App structure</h2>
                <p>
                    Before we begin, let's familiarize ourselves with the key parts of the basic app package.
                     The main files we'll be working in are located under &quot;app&quot;:
                </p>
                <Markup custom={true} language="json"
                        content={
                            [
                            /* eslint-disable */
                                '> src',
                                '   > app',
                                '       > core (root level initialization files)',
                                '           > Actions.js',
                                '           > AppContent.jsx',
                                '           > navItems.js',
                                '           > Reducer.js',
                                '           > store.js',
                                '       > views',
                                '           > shows',
                                '               > index.js',
                                '               > Shows.jsx',
                                '               > ShowsActions.js',
                                '               > ShowsReducer.js',
                                '           > mocks.js (mock data)',
                                '           > Movies.jsx',
                                '           > ShowsAddWizard.jsx',
                                '           > ShowsEdit.jsx',
                                '       > App.jsx (application entry point)',
                                '       > index.ejs',
                                '   > css',
                                '   > fonts',
                                '   > images',
                                '   > ui-lib-assets (folder containing static UI Library assets)',
                                '> clean-ui-lib.js (script for cleaning ui-lib-assets folder)',
                                '> copy-styles.js (script for copying static UI Library assets into the ui-lib-assets folder)',
                                '> package.json',
                                '> README.md',
                                '> webpack.config.js (webpack config for building static assets)',
                                '> webpack.dev.config.js (webpack config for running webpack-dev-server for development)'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    Now that you're familiar with the structure of the basic app, let's begin!
                     We've included a starter file &quot;Movies.jsx&quot; if you would like to follow along and try
                     your hand at implementing the list, expanded, add, and edit views as the tutorial progresses.
                     For data, you can either use the existing data in &quot;mocks.js&quot; or create your own.
                </p>

                <h2>UI Library dependency</h2>
                <p>
                    In order for the basic app to use the UI Library assets, the UI Library must be included as a
                     dependency. Refer to the &quot;UI Library 101&quot; tutorial for a guide on how this can be done.
                </p>

                <h2>Application entry point</h2>
                <p>
                    The basic app's entry point is located in the file &quot;basic-app/src/app/App.jsx&quot;.
                     This is where we initialize the app - creating the root React component, loading styles,
                     setting up routing, and tying in Redux.
                </p>
                <p>
                    Before we add any of the above initialization, &quot;App.jsx&quot; looks just like any
                     React component. In fact, it's going to be our root React component:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                ' ',
                                'var React = require("react"),',
                                '    ReactDOM = require("react-dom");',
                                ' ',
                                'var App = React.createClass({',
                                '   render: function () {',
                                '       return (<div>Root component placeholder</div>);',
                                '   }',
                                '});',
                                ' ',
                                'ReactDOM.render(App, document.getElementById("app"));'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    We will be adding a lot more to this file as the tutorial progresses, but for now just think of it
                     as your standard React component class definition.
                </p>

                <h2>Loading styles</h2>
                <p>
                    We incorporate the UI Library's static assets (CSS, fonts, images) into our project by copying
                     the files over into the &quot;ui-lib-assets&quot; folder using the &quot;clean-ui-lib&quot;
                     and &quot;copy-styles&quot; scripts. The CSS, fonts, and images belonging to the basic app itself
                     are located in the correspondingly named folders under &quot;src&quot;. The root CSS file for
                     the basic app is &quot;app.scss&quot;. This file will &quot;@import&quot; all of the other
                     basic app specific CSS inside it so that requiring this single file will give us all of the
                     styles defined for the basic app.
                </p>
                <p className="attention">
                    There is an additional manual step that we need to do in order to use the UI Library's fonts.
                     To use the UI Library's fonts, we must go into the file
                     &quot;node_modules/ui-library/src/css/globals.scss&quot; and copy over the commented out
                     font section from the top of the file into the &quot;src/css/app.scss&quot; file within the
                     basic app. The paths to the fonts should be edited to point to the location of the UI Library
                     fonts that have been copied over into the &quot;ui-lib-assets&quot; directory of our project.
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                            '/** app.scss */',
                            ' ',
                            '/*',
                            '* IMPORT EXTERNAL FILES',
                            '*/',
                            ' ',
                            '/* So fonts get bundled by webpack */',
                            '@font-face { font-family: \'ProximaNovaRegular\'; font-weight: normal; src: url(\'../ui-lib-assets/fonts/proxima-nova/ProximaNova-Regular.otf\'); }',
                            '@font-face { font-family: \'ProximaNovaBold\'; font-weight: bold; src: url(\'../ui-lib-assets/fonts/proxima-nova/ProximaNova-Bold.otf\'); }',
                            '@font-face { font-family: \'ProximaNovaLight\'; font-weight: normal; src: url(\'../ui-lib-assets/fonts/proxima-nova/ProximaNova-Light.otf\'); }',
                            '@font-face { font-family: \'ProximaNovaSemibold\'; font-weight: normal; src: url(\'../ui-lib-assets/fonts/proxima-nova/ProximaNova-Semibold.otf\'); }',
                            '@font-face { font-family: \'ProximaNovaCondRegular\'; font-weight: normal; src: url(\'../ui-lib-assets/fonts/proxima-nova/ProximaNovaCond-Regular.otf\'); }',
                            ' ',
                            '/*',
                            '* Any css belonging to the basic-app itself should be imported here',
                            '*/',
                            ' ',
                            '@import \'shows\';'
                            /* eslint-enable */
                            ].join("\n")
                        }
                />
                <p>
                    The root CSS files for the UI Library and the basic app should be loaded via &quot;require&quot;
                     statements within &quot;App.jsx&quot;:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                            '/** App.jsx */',
                            ' ',
                            '// the SCSS files will be compiled by a webpack plugin',
                            '// and injected into the head section of the HTML page by another plugin',
                            'require("../ui-lib-assets/css/ui-library.scss");       // UI Library styles',
                            'require("../css/app.scss");    // Basic app specific styles',
                            /* eslint-enable */
                            ].join("\n")
                        } />

                <h2>Routing set up</h2>
                <p>
                    The basic app uses a combination of
                     <a href="https://github.com/reactjs/react-router" target="_blank"> React Router</a>,
                     <a href="https://github.com/reactjs/react-router-redux" target="_blank"> React Router Redux</a>,
                     and the navigation behavior of the UI Library &quot;LeftNavBar&quot; component for routing.
                </p>
                <p>
                    React Router Redux supports React Router in working with Redux (which we'll get to next).
                     We set up a single route by changing how &quot;App.jsx&quot; is rendered like this:
                </p>
                <Markup custom={true} content="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                ' ',
                                '/** Setup the router with a single route */',
                                'ReactDOM.render(',
                                '   <ReactRouter.Router history={history}>',
                                '       <ReactRouter.Route path="/" component={App} />',
                                '   </ReactRouter.Router>,',
                                '   document.getElementById("app"));'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    Don't worry too much where the components and variables are coming from yet. They'll be
                     explained later on when we finalize what this render function looks like.
                </p>

                <h2>What is Redux?</h2>
                <p>
                    <a href="https://github.com/reactjs/redux" target="_blank">Redux </a>
                    is a tool for managing state in JavaScript applications. It stores all your application state in
                     one place, the &quot;store&quot;. Components never directly communicate state changes to each
                     other and also never directly alter the state within the store. To change state, components will
                     need to &quot;dispatch&quot; actions that trigger &quot;reducers&quot; that ultimately update
                     the state inside the store. Components that need to be Redux aware can &quot;subscribe&quot;
                     to the store. Components that are not Redux aware will derive all state and callbacks for
                     dispatching actions via props that are passed down to them.
                </p>
                <p>
                    The store is the single source of truth for all state within a Redux application. This aligns
                     very well with React's unidirectional data flow. Read
                     <a href="http://redux.js.org/docs/basics/UsageWithReact.html" target="_blank"> this </a>
                     tutorial for more information on how Redux works together with React.
                </p>

                <h2>Tying in Redux</h2>
                <p>
                    To enable the basic app to use Redux we need to create a store, actions, and reducer.
                     Then we need to tie the store into our app (which includes wiring in all reducers),
                     create callbacks that can be passed down to non-Redux aware child components to dispatch actions,
                     and pass in any necessary state as props into our root component. We will go over each step below.
                </p>
                <p className="attention">
                    As a best practice, the recommended architecture for working with Redux is to only have ONE
                     root component aware of Redux and subscribed to the state held in the store. That is, only the
                     root component (in our case &quot;App.jsx&quot;) will be connected to the store via the
                     &quot;react-redux&quot; connect function.
                </p>
                <p>
                    We'll create our store in the file &quot;basic-app/src/app/core/store.js&quot; and export it
                     to be used in initialization within &quot;App.jsx&quot;. Before we do that though, let's define
                     some root-level actions and the reducer that will be used in creating our store in
                     &quot;basic-app/src/app/core/Actions.js&quot; and &quot;basic-app/src/app/core/Reducer.js&quot;:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** Actions.js */',
                                ' ',
                                'var keyMirror = require("fbjs/lib/keyMirror");',
                                ' ',
                                'exports.Types = keyMirror({',
                                '    SET: null',
                                '});',
                                ' ',
                                'exports.set = function (path, value) {',
                                '    return {',
                                '        type: exports.Types.SET,',
                                '        path: path,',
                                '        value: value',
                                '    };',
                                '};'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    This actions file is very simple and contains only one action type &quot;SET&quot; and its
                     corresponding action creator &quot;exports.set&quot;. You'll see several actions similar to
                     &quot;SET&quot; as we continue to build the basic app. It's the most basic form of action that
                     just sets the specified &quot;value&quot; at the given &quot;path&quot; within the state.
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** Reducer.js */',
                                ' ',
                                'var Actions = require("./Actions.js"),',
                                '    _ = require("underscore"),',
                                '    setAtPath = require("ui-library/src/util/ReduxUtils.js").setAtPath;',
                                ' ',
                                'var initialState = {};',
                                ' ',
                                'module.exports = function (state, action) {',
                                '    var nextState = _.clone(state);',
                                ' ',
                                '    switch (action.type) {',
                                '        case Actions.Types.SET:',
                                '            setAtPath(nextState, action.path, action.value);',
                                '            break;',
                                '        default:',
                                '            return state || initialState;',
                                '    }',
                                ' ',
                                '    return nextState;',
                                '};'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    This reducer file is also very simple. It specifies an &quot;initialState&quot; for this reducer
                     and handles the state update for the &quot;SET&quot; action.
                </p>
                <p className="attention">
                    Note that we have begun making use of the UI Library's assets! Here, we are using the
                     &quot;setAtPath&quot; function from the UI Library's suite of Redux utilities to simplify the
                     logic in our reducer.
                </p>
                <p>
                    Now that we have some actions and a reducer to register, the store can be created like this:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** store.js */',
                                ' ',
                                'var Redux = require("redux"),',
                                '    ReactRouter = require("react-router"),',
                                '    ReactRouterRedux = require("react-router-redux"),',
                                '    AppReducer = require("./Reducer.js"),',
                                '    thunk = require("redux-thunk");',
                                ' ',
                                'var createStoreWithMiddleware = Redux.applyMiddleware(',
                                '    ReactRouterRedux.routerMiddleware(ReactRouter.hashHistory),',
                                '    thunk',
                                ')(Redux.createStore);',
                                ' ',
                                'var reducers = {',
                                '    routing: ReactRouterRedux.routerReducer,',
                                '    app: AppReducer',
                                '};',
                                ' ',
                                'var store = (function configureStore (initialState) {',
                                '    return createStoreWithMiddleware(',
                                '        Redux.combineReducers(reducers), initialState);',
                                '})();',
                                ' ',
                                'store.reducers = reducers;',
                                ' ',
                                'module.exports = store;'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    This creates our store with the necessary
                    <a href="http://redux.js.org/docs/advanced/Middleware.html" target="_blank"> middleware </a>
                    to support routing and asynchronous actions, and set up the initial state of the store with the
                     initial state returned by each reducer.
                </p>
                <p className="attention">
                    Note that we've used Redux's &quot;combineReducers&quot; function here so that we can define
                     separate reducers that each manage their own piece of the state tree. Then we have them all
                     combined into a single reducer that is passed in to create the store. We only have two distinct
                     reducers right now handling the routing and root app state, but more will be added to this list
                     once we start adding in more components and views to the basic app.
                </p>
                <p>
                    The final step is to make the root component of the basic app Redux aware. To do that we have to
                     connect the app to the Redux store, make the store available to all container components,
                     and create callbacks for for all actions that need to be passed down to non-Redux aware children.
                </p>
                <p>
                    Connecting the app to the Redux store can be done using the &quot;react-redux&quot;
                     connect function:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                ' ',
                                'var React = require("react"),',
                                '    ReactDOM = require("react-dom"),',
                                '    ReactRedux = require("react-redux");',
                                '...',
                                '/** Connect the app to the redux store */',
                                'App = ReactRedux.connect(function (state) {',
                                '    return {',
                                '        all: state',
                                '    };',
                                '})(App);'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    The first argument to &quot;connect&quot; is a function that will map portions of the state to
                     props that will be injected into the component connect is wrapping. In this case, the root
                     component &quot;App&quot; will receive &quot;all&quot; as a prop that contains all state in the
                     store state tree. We'll be adding more specific state to props mappings within this function as
                     our app and state tree grows later on in this tutorial.
                </p>
                <p>
                    There's also a special &quot;Provider&quot; component in &quot;react-redux&quot; that will
                     take care of making the store available to all container components.
                     We just have to alter how the app is rendered again:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                'var React = require("react"),',
                                '    ReactDOM = require("react-dom"),',
                                '    ReactRedux = require("react-redux"),',
                                '    ReactRouter = require("react-router"),',
                                '    ReactRouterRedux = require("react-router-redux"),',
                                '    store = require("./core/store.js"),',
                                '    history = ReactRouterRedux.syncHistoryWithStore(ReactRouter.hashHistory, store);',
                                '...',
                                '/** Setup the router with a single route */',
                                'ReactDOM.render(',
                                '   <ReactRedux.Provider store={store}>',
                                '       <ReactRouter.Router history={history}>',
                                '           <ReactRouter.Route path="/" component={App} />',
                                '       </ReactRouter.Router>,',
                                '   </ReactRedux.Provider>,',
                                '   document.getElementById("app"));'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    Callbacks should be created within &quot;componentWillMount&quot;. We can use the Redux
                     &quot;bindActionCreators&quot; function to easily bind &quot;dispatch&quot; to all action creators.
                     These action creators will be used later on to select and pass down specific action callbacks to
                     child views.
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                ' ',
                                'var React = require("react"),',
                                '    ...',
                                '    ReactRouterRedux = require("react-router-redux"),',
                                '    Actions = require("./core/Actions.js"),',
                                '    ...',
                                '...',
                                'var App = React.creatClass({',
                                '   /*',
                                '   * Initialize the app',
                                '   */',
                                '   componentWillMount: function () {',
                                '       //bind action creators',
                                '        this.appActions = Redux.bindActionCreators(Actions, this.props.dispatch);',
                                '        this.routerActions = Redux.bindActionCreators(ReactRouterRedux.routerActions, this.props.dispatch);',
                                '   }'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    Now that we have everything set up, we can start adding some more components and views!
                </p>

                <h2>Views</h2>
                <p>
                    We will be creating a total of 5 views:
                </p>
                <ul className="ul">
                    <li>Base View</li>
                    <li>Shows - List view</li>
                    <li>Shows - Expanded view</li>
                    <li>Shows - Add view</li>
                    <li>Shows - Edit view</li>
                </ul>
                <p>
                    As we will be using the UI Library's templates in creating our views, the workflow for setting up
                     each view will be something like the following:
                </p>
                <ul className="ul">
                    <li>Register reducers for components and views inside &quot;store.js&quot;</li>
                    <li>Add the state for the newly registered reducers to the state to props mapping inside
                         &quot;App.jsx&quot;</li>
                    <li>Actions for newly registered components and views are bound to the store's dispatch
                        to create callbacks</li>
                    <li>Callbacks are passed down as props to the appropriate views</li>
                    <li>View template markup is updated to use the callbacks and state props passed down to them</li>
                </ul>
                <p>
                    This is standard React/Redux workflow. In order for views to render with information from the app
                     state and to provide behavior that will alter app state, the view markup must use callbacks for
                     actions that are dispatched to reducers and the state props that were defined in the state
                     to props mapping. Callbacks are created by binding action creators to dispatch within Redux
                     aware components, and then passed down to non-redux aware components - in our case this is done
                     in &quot;App.jsx&quot;. And in order for any of the above to alter state reducers that understand
                     the dispatched actions and provide state must have been registered to the store.
                </p>
                <p>
                    Since the UI Library's templates already provide us with actions, reducers and view markup all we
                     have to do is alter them a bit to work with the basic app and link them as explained above.
                </p>
                <p className="attention">
                    The basic app will have partial functionality after the completion of each view,
                     and will be fully functional upon completion of all the views.
                </p>

                <h2>Base view</h2>
                <p>
                    Our base view is going to consist of a header and left navigation bar with a content area
                     that will render a different child view based on the navigation item selected in the
                     navigation menu. Since this is the base view, it can live in the render function of the root
                     component within &quot;App.jsx&quot;.
                </p>
                <p>
                    The UI Library has a HeaderBar and LeftNavBar component we can use. Recall from the
                     &quot;Components In-depth&quot; tutorial that we should be refering to a UI Library component's
                     demo, documentation, and source code to determine whether the components meet our needs and
                     for how to configure the components.
                </p>
                <p>
                    Inspecting the demo, documentation, and source code for these two components reveals to us that
                     they have their own actions and reducers that need to be tied into the basic app's store
                     in order for the components to function correctly.
                </p>
                <p>
                    Their reducers need to be included in the list of reducers we have for creating our store.
                     This is necessary for any state they have to be included in our application store's state tree:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable*/
                                '/** store.js */',
                                ' ',
                                'var Redux = require("redux"),',
                                '    ...',
                                '    NavReducer = require("ui-library/src/components/panels/left-nav").Reducer,',
                                '    HeaderReducer = require("ui-library/src/components/panels/header-bar").Reducer,',
                                '    ...',
                                '...',
                                'var reducers = {',
                                '    routing: ReactRouterRedux.routerReducer,',
                                '    nav: NavReducer, //Add left nav reducer',
                                '    header: HeaderReducer, //Add header reducer',
                                '    app: AppReducer',
                                '};',
                            /* eslint-enable*/
                            ].join("\n")
                        } />
                <p>
                    The header and nav states need to be included in the state to props mapping function inside the
                     &quot;ReactRedux.connect&quot; function as well in order for our components to be able to
                     access their states via props:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                ' ',
                                '/** Connect the app to the redux store */',
                                'App = ReactRedux.connect(function (state) {',
                                '    return {',
                                '         nav: state.nav, //Add nav state to prop mapping',
                                '         header: state.header, //Add header state to prop mapping',
                                '        all: state',
                                '    };',
                                '})(App);'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    Like we did before, we need to create callbacks for all of their actions:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                ' ',
                                'var React = require("react"),',
                                '    ...',
                                '    LeftNavBar = require("ui-library/src/components/panels/left-nav"),',
                                '    HeaderBar = require("ui-library/src/components/panels/header-bar"),',
                                '    ...',
                                '...',
                                'var App = React.creatClass({',
                                '   /*',
                                '   * Initialize the app',
                                '   */',
                                '   componentWillMount: function () {',
                                '       //bind action creators',
                                '       ...',
                                '        this.navActions = Redux.bindActionCreators(LeftNavBar.Actions, this.props.dispatch);',
                                '        this.headerActions = Redux.bindActionCreators(HeaderBar.Actions, this.props.dispatch);',
                                '   }',
                                '...'
                            /* eslint-enable */
                            ].join("\n")
                        } />

                <p>
                    If you recall from the &quot;UI Library 101&quot; tutorial, we can use a component from the
                     UI Library like any React component once it has been required into the file (which we've
                     already done above).
                </p>
                <p>
                    Let's add the HeaderBar to the view first. The documentation specifies that we must initialize
                     the component with a tree for the menus in the header, and from the demo source code we can see
                     an example of how this is done using the &quot;init&quot; header action. So we can initialize
                     the header as follows:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                ' ',
                                'var App = React.creatClass({',
                                '   /*',
                                '   * Initialize the app',
                                '   */',
                                '   componentWillMount: function () {',
                                '       ...',
                                '        //Set up the HeaderBar',
                                '        this.headerActions.init([',
                                '            { id: "help", iconClassName: "icon-help", title: "Help", label: "Help" },',
                                '            { id: "cog", iconClassName: "icon-cog", children: [{ id: "cog", iconClassName: "icon-cog", label: "Cog" }] }',
                                '        ]);',
                                '   }',
                                '...',
                                '   render: function () {',
                                '       return (',
                                '           <div>',
                                '                {',
                                '                  /*',
                                '                   * Header bar doesnt do anything interesting within this app, but normally the account menu would',
                                '                   * be housed here.',
                                '                   */',
                                '                }',
                                '                <HeaderBar {...this.props.header}',
                                '                        label="Basic UI Library App"',
                                '                        onItemValueChange={this.headerActions.toggleItem} />',
                                '           </div>',
                                '       );',
                                '   }',
                                '...'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    We used the bound action creator &quot;this.headerActions&quot; variable that we created in the
                     previous step to dispatch the &quot;init&quot; header action. And we have replaced the placeholder
                     we had inside the render function with the HeaderBar component. Notice how we use the React spread
                     operator to pass in the header's state (that we get from the mapped state to props) into the
                     HeaderBar component, and that we used the bound action creator to pass in the
                     &quot;toggleItem&quot; callback.
                </p>
                <p>
                    Now let's add the LeftNavBar. Again we refer to the demo, documentation, and source code to see
                     what is required to configure the UI Library LeftNavBar component. These resources reveal that,
                     like the HeaderBar, a &quot;tree&quot; attribute is required to initialize the navigation items
                     we want in the nav. Unlike what we did for the header, we are going to pull the tree structure
                     for the nav out into a separate file located at &quot;basic-app/src/app/core/navItems.js&quot;:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** navItems.js */',
                                ' ',
                                'var keyMirror = require("fbjs/lib/keyMirror");',
                                ' ',
                                'module.exports.Types = keyMirror({',
                                '    SHOWS: null,',
                                '    MOVIES: null',
                                '});',
                                ' ',
                                'module.exports.Items = [',
                                '    {',
                                '        label: "Directory",',
                                '        children: [',
                                '            {',
                                '                label: "TV Shows",',
                                '                type: module.exports.Types.SHOWS,',
                                '                content: require("../views/shows")',
                                '            },',
                                '            {',
                                '                label: "Movies",',
                                '                type: module.exports.Types.MOVIES,',
                                '                content: require("../views/movies")',
                                '            }',
                                '        ]',
                                '    },',
                                '];'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    Here we have defined the the tree structure for the LeftNavBar with some additional properties for
                     each child section in order to dynamically render different views within the content area of the
                     base view.
                </p>
                <p>
                    Now that we have the tree, we need to initialize the LeftNavBar using its &quot;init&quot; action.
                     We can also set up some key handling to allow users to traverse the nav bar using the up and down
                     arrow keys:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                ' ',
                                'var App = React.creatClass({',
                                '   /*',
                                '   * Initialize the app',
                                '   */',
                                '   componentWillMount: function () {',
                                '       ...',
                                '        //set up member variables',
                                '        this._navItemsById = {};',
                                '        this._handleKeydown = EventUtils.handleKeydowns({',
                                '            38: this.navActions.selectPrevItem,',
                                '            40: this.navActions.selectNextItem',
                                '        }, true);',
                                ' ',
                                '        //Set up the LeftNavbar',
                                '        //  IDs are required by the LeftNavBar but the navItems list doesn\'t have any,',
                                '        //  so loop through and just duplicate the label and use it as an ID.',
                                '        //  While looping, initialize navItemById.',
                                '        this.navActions.init(NavItems.Items.map(function (section) {',
                                '            section.id = section.label.replace(/\W/g, "");',
                                ' ',
                                '            section.children.forEach(function (child) {',
                                '                child.id = child.label.replace(/\W/g, "");',
                                ' ',
                                '                this._navItemsById[child.id] = child;',
                                '            }.bind(this));',
                                ' ',
                                '            return section;',
                                '        }.bind(this)));',
                                '       ...',
                                '        //Watch arrow keys and map them to the corresponding actions',
                                '        window.addEventListener("keydown", this._handleKeydown, false);',
                                '   }',
                                '    /*',
                                '    * Remove event listeners, references to DOM nodes and cleanup',
                                '    */',
                                '    componentWillUnmount: function () {',
                                '        window.removeEventListener("keydown", this._handleKeydown);',
                                '    },',
                                '...',
                                '   render: function () {',
                                '       return (',
                                '           <div>',
                                '               ...',
                                '                {',
                                '                  /*',
                                '                   * This is the nav bar containing the navigation items',
                                '                   */',
                                '                }',
                                '                <LeftNavBar {...this.props.nav}',
                                '                        onItemValueChange={this.navActions.selectItem}',
                                '                        onSectionValueChange={this.navActions.toggleSection} />',
                                '           </div>',
                                '       );',
                                '   }',
                                '...'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    Again, notice how we are using the bound action creators, in this case &quot;this.navActions&quot;
                     to dispatch the &quot;init&quot; action for the LeftNavBar initialization and to pass down
                     the LeftNavBar's callbacks inside the render function.
                </p>
                <p>
                    Recall that we mentioned earlier in the tutorial that the basic app also uses the LeftNavBar for
                     navigation and routing. The LeftNavBar has the &quot;selectedNode&quot; state property that can
                     be used to indicate which navigation item is currently selected in the menu. By syncing this
                     property to the Url, we can use it to dynamically change which view is rendered within the
                     content area of the screen:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                ' ',
                                'var App = React.creatClass({',
                                ' ',
                                '    /*',
                                '    * Some initialization cannot take place until the app has mounted and rendered.',
                                '    *   That code will be put here. For instance, loading the query string.',
                                '    */',
                                '    componentDidMount: function () {',
                                '        //load the arguments from the query string',
                                '        if (this.props.location.query.openNode) {',
                                '            this.navActions.toggleSection(this.props.location.query.openNode);',
                                '        }',
                                '        if (this.props.location.query.selectedNode) {',
                                '            this.navActions.selectItem(this.props.location.query.selectedNode);',
                                '        }',
                                '    },',
                                '    /*',
                                '    * Get the correct view for the current nav item',
                                '    */',
                                '    _getViewContent: function (id, props) {',
                                '        switch (this._navItemsById[id].type) {',
                                '            case NavItems.Types.SHOWS:',
                                '                return (',
                                '                    <AppContent {...props}',
                                '                            content={this._navItemsById[id].content}',
                                '                            //Shows view specific state & callbacks will be added later on />',
                                '                );',
                                '            default:',
                                '                return (',
                                '                    <AppContent {...props}',
                                '                            content={this._navItemsById[id].content} />',
                                '                );',
                                '        }',
                                '    },',
                                '...',
                                '   render: function () {',
                                '        var id = this.props.nav.selectedNode;',
                                '        var watch = _.pick(this.props.nav, "openNode", "selectedNode");',
                                '       return (',
                                '           <div>',
                                '               ...',
                                '                {',
                                '                    /*',
                                '                    * When an item is selected in the nav bar, the corresponding view is rendered',
                                '                    */',
                                '                    this._navItemsById[id] && this._getViewContent(id, _.extend({}, this.props, { watch: watch }))',
                                '                }',
                                '                {',
                                '                    /*',
                                '                    * This component will watch the provided properties and update the url hash when they change',
                                '                    */',
                                '                }',
                                '                <PropsToUrlWatcher ignoreFalse={true}',
                                '                        location={this.props.location}',
                                '                        onReplaceUrl={this.routerActions.replace}',
                                '                        watch={watch} />',
                                '           </div>',
                                '       );',
                                '   }',
                                '...'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    The &quot;PropsToUrlWatcher&quot; component syncs the properties we specified in the
                     &quot;watch&quot; variable with the Url. Based on the &quot;selectedNode&quot;, the
                     &quot;this._getViewContent&quot; function returns the correct view to render using a switch
                     statement. The switch statement also makes organizing what store state and callbacks to pass down
                     a lot easier by allowing you to separate these attributes per view. The &quot;AppContent&quot;
                     wrapper component uses the &quot;content&quot; property we specified for each child navigation
                     item section within &quot;navItems.js&quot; to render the correct view.
                </p>
                <p>
                    Great! We've completed the base view and so far it should render the following after defining the
                     &quot;basic-app/src/app/views/shows/Shows.jsx&quot; and
                     &quot;basic-app/src/app/views/Movies.jsx&quot; files. We can now change between the TV Shows and
                     Movies views in the left navigation and see a page header.
                </p>
                <img src={require("../../images/basic-app-base-view.png")} />

                <h2>Shows - List view</h2>
                <p>
                    Moving on, we want a view that lists all of our shows as separate rows on the page
                     and supports searching and filtering. Browsing through the UI Library's templates, the
                     &quot;List View - Infinite Scroll&quot; template seems to align best to our needs. Examining the
                     source code for this template confirms that it supports all of our requirements. It also reveals
                     that the template comes with a set of actions and a reducer.
                </p>
                <p>
                    To get started, we can copy the template's view, actions, and reducer code into the basic app
                     and put them under the &quot;shows&quot; folder:
                     &quot;basic-app/src/app/views/shows/Shows.jsx&quot; holds the markup that creates the view,
                     &quot;basic-app/src/app/views/shows/ShowsActions.js&quot; holds all the actions, and
                     &quot;basic-app/src/app/views/shows/ShowsReducer.js&quot; holds the reducer.
                </p>
                <p>
                    Similar to what we did when wiring in the HeaderBar and LeftNavBar actions and reducers, we need
                     to wire in the actions and reducer for the Shows list view:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** store.js */',
                                ' ',
                                'var Redux = require("redux"),',
                                '    ...',
                                '    ShowsReducer = require("../views/shows").Reducer,',
                                '   ...',
                                '...',
                                'var reducers = {',
                                '    routing: ReactRouterRedux.routerReducer,',
                                '    nav: NavReducer,',
                                '    header: HeaderReducer,',
                                '    shows: ShowsReducer, //Add Shows view reducer',
                                '    app: AppReducer',
                                '};'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                ' ',
                                'var React = require("react"),',
                                '    ...',
                                '    ShowsView = require("./views/shows"),',
                                '    ...',
                                '...',
                                'var App = React.creatClass({',
                                '   /*',
                                '   * Initialize the app',
                                '   */',
                                '   componentWillMount: function () {',
                                '       //bind action creators',
                                '       ...',
                                '        this.showsViewActions = Redux.bindActionCreators(ShowsView.Actions, this.props.dispatch); //Bind Shows actions',
                                '   }',
                                '...',
                                '/** Connect the app to the redux store */',
                                'App = ReactRedux.connect(function (state) {',
                                '    return {',
                                '        ...',
                                '        shows: state.shows, //Add shows state to prop mapping',
                                '    };',
                                '})(App);'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    Now that the view's actions and reducer are correctly wired into the app, we can edit the
                     actions, reducer, and view that the template provided into what we want for the basic app.
                </p>
                <p>
                    A lot of what the template actions provided is needed for the Shows list view as well, but we
                     should change the action types to be more representative of the view they correspond to:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** ShowsActions.js */',
                                '...',
                                'exports.Types = keyMirror({',
                                '    SHOWS_SET: null,',
                                '    SHOWS_FILTER: null',
                                '});',
                                ' ',
                                'exports.set = function (path, value) {',
                                '    return {',
                                '        type: exports.Types.SHOWS_SET,',
                                '        path: path,',
                                '        value: value',
                                '    };',
                                '};',
                                ' ',
                                'exports.setFilter = function (name, value) {',
                                '    return {',
                                '        type: exports.Types.SHOWS_FILTER,',
                                '        name: name,',
                                '        value: value',
                                '    };',
                                '};',
                                '...'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    We also need to pass any callbacks the shows list view will need down via props of
                     the &quot;AppContent&quot; wrapper component. Currently, we know that the Shows list view will
                     need the &quot;replace&quot; action passed in as a callback in order to support tabbing within the
                     list view changing the Url. Also, we need to pass all of the actions we just defined
                     in &quot;ShowsActions.js&quot; down to support the list view search, filter,
                     and scrolling behavior:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                ' ',
                                'var App = React.creatClass({',
                                '   ...',
                                '    /*',
                                '    * Get the correct view for the current nav item',
                                '    */',
                                '    _getViewContent: function (id, props) {',
                                '        switch (this._navItemsById[id].type) {',
                                '            case NavItems.Types.SHOWS:',
                                '                return (',
                                '                    <AppContent {...props}',
                                '                            content={this._navItemsById[id].content}',
                                '                            onReplaceUrl={this.routerActions.replace}',
                                '                            onShowsValueChange={this.showsViewActions.set}',
                                '                            onShowsSearchFilterValueChange={this.showsViewActions.setFilter}',
                                '                            onShowsActiveTabValueChange={this.showsViewActions.setActiveTab}',
                                '                            onShowsSearchAdvancedToggle={this.showsViewActions.setExpandedSearch}',
                                '                            onShowsScrollPositionValueChange={this.showsViewActions.setPosition} />',
                                '                );',
                                '            default:',
                                '                return (',
                                '                    <AppContent {...props}',
                                '                            content={this._navItemsById[id].content} />',
                                '                );',
                                '        }',
                                '    },',
                                '...',
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    In the reducer, we need to change the mock data for rows from randomly genereated types the
                     template comes with to use the mock shows row data we have inside &quot;mocks.js&quot;. We also
                     need to update action types to those we defined in &quot;ShowsActions.js&quot; above, and change
                     the &quot;batchSelector&quot; function's filtering logic to perform filtering on the rows using
                     some shows properties instead of just filtering even and odd rows:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** ShowsReducer.js */',
                                ' ',
                                'var Actions = require("./ShowsActions.js"), //Change to use actions we defined above',
                                '    ...',
                                '    setAtPath = require("ui-library/src/util/ReduxUtils.js").setAtPath; //Update path',
                                '...',
                                ' ',
                                '/*',
                                '* We mock the data. Normally this would come from the server.',
                                '*/',
                                'var mockShows = require("../mocks").Shows; //Remove the types variable mock data and use what we defined in mocks.js',
                                'var mockGenres = require("../mocks").Genres;',
                                'var mockStatuses = require("../mocks").StatusEnum;',
                                ' ',
                                '/*',
                                '* Check whether row satisfies all set genre filters',
                                '*/',
                                'function hasGenreFilters (filters, row) {',
                                '    for (var genre in mockGenres) {',
                                '        if (filters[genre] && row.genres.indexOf(mockGenres[genre]) === -1) {',
                                '            return false;',
                                '        }',
                                '    }',
                                '    return true;',
                                '}',
                                ' ',
                                '/*',
                                '* Check whether row satisfies all set status filters',
                                '*/',
                                'function hasStatusFilters (filters, row) {',
                                '    for (var status in mockStatuses) {',
                                '        if (filters[status] && row.status !== mockStatuses[status]) {',
                                '            return false;',
                                '        }',
                                '    }',
                                '    return true;',
                                '}',
                                ' ',
                                '...',
                                ' ',
                                '//Update to use our filtering and batch selection logic',
                                'var batchSelector = createSelector(',
                                '   ...',
                                '   function (filters, rows) {',
                                '       rows = rows.filter(function (row) {',
                                '           return (!filters.text || row.title.toLowerCase().indexOf(filters.text.toLowerCase()) > -1) &&',
                                '               hasGenreFilters(filters, row) &&',
                                '               hasStatusFilters(filters, row);',
                                '       });',
                                ' ',
                                '       //generate a few batches of data so that the InfiniteScroller can be seen in action paging in/out',
                                '       //batches',
                                '       var batches = []',
                                '       for (var i = 0; i < rows.length; i += 50) {',
                                '           batches.push({ id: parseInt(i / 50), data: rows.slice(i, i + 50) });',
                                '       }',
                                ' ',
                                '       return batches',
                                '});',
                                ' ',
                                '/*',
                                '* Since our data is hardcoded, we need to apply the selector once here.  Normally we would apply it when',
                                '* the request returned from the server with the rows.',
                                '*/',
                                'for (var i = 0; i < mockShows.length; i += 1) {',
                                '    initialState.rows.push(mockShows[i]);',
                                '}',
                                ' ',
                                'initialState.batches = batchSelector(initialState);',
                                ' ',
                                'module.exports = function (state, action) {',
                                '   ...',
                                '   switch (action.type) {',
                                '       case Actions.Types.SHOWS_SET: //Update to our action type',
                                '           ...',
                                '       case Actions.Types.SHOWS_FILTER: //Update to our action type',
                                '           ...',
                                '   }',
                                '};'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p className="attention">
                    Be aware of the usage of mock data here. Normally, such data would come from the server but for
                     simplicity the basic app is purely a client-side application and doesn't interact with a server.
                     Hence, we define mock data to use and populate our views.
                </p>
                <p>
                    Now, we need to change the view's template markup to create the layout we want. Keep in mind
                     that the template can be changed however we want in order to make it display and function
                     according to our requirements. But we do need to be careful of altering the tree structure of the
                     markup too much as some styling can be dependent on how components are nested. The changes made to
                     the template are larger here so let's break it off into seperate parts.
                </p>
                <p>
                    First we need to update the require paths to grab the components from the UI Library module, add
                     the &quot;Section&quot;, &quot;DetailsTooltip&quot;, &quot;PropsToUrlWatcher&quot; components to
                     the list, and also import some mock data. Our view won't be needing the &quot;Toggle&quot; and
                     &quot;RowAccessories&quot; components so we can remove those too:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** Shows.jsx */',
                                ' ',
                                'var React = require("re-react"),',
                                '    Genres = require("../mocks").Genres',
                                '    Statuses = require("../mocks").StatusEnum',
                                '    FormTextField = require("ui-library/src/components/forms/form-text-field"),',
                                '    FormCheckbox = require("ui-library/src/components/forms/FormCheckbox.jsx"),',
                                '    InfiniteScroll = require("ui-library/src/components/list/InfiniteScroll.jsx"),',
                                '    TabbedSections = require("ui-library/src/components/general/TabbedSections.jsx"),',
                                '    ExpandableRow = require("ui-library/src/components/rows/expandable-row"),',
                                '    PropsToUrlWatcher = require("ui-library/src/components/offscreen/PropsToUrlWatcher.jsx"),',
                                '    Section = require("ui-library/src/components/general/Section.jsx"),',
                                '    DetailsTooltip = require("ui-library/src/components/tooltips/DetailsTooltip.jsx"),',
                                '   ...'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p className="attention">
                    Note the use of the
                    <a href="https://www.npmjs.com/package/re-react" target="_blank"> re-react </a>
                     library here instead of React's &quot;react&quot; library. With Redux, the simplest state changes
                     could potentially cause the entire app to re-render. To avoid this, Redux suggests implementing
                     the &quot;shouldComponentUpdate&quot; function but that introduces a lot of boilerplate code.
                     To combat this, we use the &quot;re-react&quot; library which wraps react and allows for
                     &quot;propType&quot; decorating to indicate which properties should cause a re-render.
                </p>
                <p>
                    Next let's rename the template view component to &quot;Shows&quot; and add a &quot;ShowsView&quot;
                     component as an abstraction layer to create the Shows view. We can use the &quot;List View&quot;
                     demo's source code as a refernce to do this. The &quot;ShowsView&quot; component
                     is the one exported in this file and renders the &quot;Shows&quot; component. It picks out the
                     pieces of state and callbacks that the shows view needs to know about and passes them down in
                     props. The shows view also needs a &quot;PropsToUrlWatcher&quot; to sync the scrolling position,
                     active tab, active filters, and search state with the Url.
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** Shows.jsx */',
                                ' ',
                                'var Shows = React.createCLass({',
                                '   //We\'ll change the markup here later',
                                '});',
                                '...',
                                '/*',
                                '* This component creates the ShowsView',
                                '*/',
                                'var ShowsView = React.createClass({',
                                '    /*',
                                '    * Handle toggling the advanced search bar',
                                '    */',
                                '    _handleSearchBarToggle: function () {',
                                '        this.props.onShowsSearchAdvancedToggle(!this.props.shows.advancedSearch);',
                                '    },',
                                ' ',
                                '    /*',
                                '    * Handle changing the search filters',
                                '    */',
                                '    _handleSearchFilterValueChange: function (name, value) {',
                                '        this.props.onShowsSearchFilterValueChange(name, value);',
                                '    },',
                                ' ',
                                '    render: function () {',
                                '        var watch = _.pick(this.props.shows, "position", "activeTab", "filters", "advancedSearch");',
                                '        return (',
                                '            <div>',
                                '                <Shows {...this.props.shows}',
                                '                        onSearchToggleAdvanced={this._handleSearchBarToggle}',
                                '                        onSearchFilterValueChange={this._handleSearchFilterValueChange}',
                                '                        onScrollPositionValueChange={this.props.onShowsScrollPositionValueChange}',
                                '                        onActiveTabValueChange={this.props.onShowsActiveTabValueChange} />',
                                '                {',
                                '                    /*',
                                '                    * Because the App also writes the url, the open/selected nodes need to be passed in.',
                                '                    */',
                                '                }',
                                '                <PropsToUrlWatcher ignoreFalse={true}',
                                '                        location={this.props.location}',
                                '                        onReplaceUrl={this.props.onReplaceUrl}',
                                '                        watch={_.defaults(watch, this.props.watch)} />',
                                '            </div>',
                                '        );',
                                '    }',
                                '});',
                                ' ',
                                'module.exports = ShowsView;'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    Now let's change the &quot;Shows&quot; component. A lot of the changes here will be renaming
                     display text from the template to something that makes more sense for our app. In addition, we
                     will need to change the markup to create more appropriate filters and rows.
                </p>
                <p>
                    The template comes with a &quot;Row&quot; component with a large switch statement that renders
                     different types or rows, but we don't need this. All of our rows should render the same with the
                     exact same options. So we can change &quot;Row&quot; to the following:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** Shows.jsx */',
                                ' ',
                                '/*',
                                '* This component just serves as a proxy to choose the type of Show row to return.',
                                '*/',
                                'var ShowRow = React.createClass({',
                                ' ',
                                '    /*',
                                '    * Generate the comma separeated genre list subtitle',
                                '    */',
                                '    _getGenreTitles: function () {',
                                '        return this.props.genres.map(function (genre) {',
                                '            return genre.title;',
                                '        }).join(", ");',
                                '    },',
                                ' ',
                                '    render: function () {',
                                '        return (',
                                '            <ExpandableRow data-id={this.props.id}',
                                '                    title={this.props.title}',
                                '                    subtitle={this._getGenreTitles()}',
                                '                    showDelete={false} />',
                                '        );',
                                '    }',
                                '});'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p className="attention">
                    As a best practice, we should always &quot;bind&quot; our callbacks with default arguments on
                     &quot;componentWillMount&quot; for better performance.
                </p>
                <p>
                    As we defined in the &quot;ShowsReducer&quot;, we want to support filtering by a show's genres and
                     status instead of even and odd rows as the template came with, so we need to change the markup to
                     render our filters and have them linked to the correct portions of state. Also, we should rename
                     the tab headers and remove the third tab because we won't need it:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** Shows.jsx */',
                                ' ',
                                'var Shows = React.createClass({',
                                '   ...',
                                '/*',
                                '* When the component mounts, do a bunch of initialization',
                                '*/',
                                'componentWillMount: function () {',
                                '    //Create an instance of the row type with the right accessory type and to pass in default props',
                                '    this._contentType = <ShowRow id={0} showEdit={true} />;',
                                ' ',
                                '    //Create the partials here for better performance, instead of binding on every render',
                                '    this._handleTextValueChange = this._handleFilter.bind(null, "text");',
                                '    this._handleGenreFilterToggle = {};',
                                ' ',
                                '    this._genreFilters = [];',
                                '    this._selectedGenreFilters = [];',
                                '    for (var genre in Genres) {',
                                '        this._handleGenreFilterToggle[genre] = this._handleFilter.bind(null, genre);',
                                ' ',
                                '        //Initialize items for filter within SelectionList',
                                '        this._genreFilters.push({ id: genre, name: Genres[genre].title });',
                                '    }',
                                ' ',
                                '    for (var status in Statuses) {',
                                '        this._handleGenreFilterToggle[status] = this._handleFilter.bind(null, status);',
                                '    }',
                                '},',
                                ' ',
                                '/*',
                                '* Handle SelectionList genre filter changes.',
                                '*/',
                                '_handleGenreFiltersValueChange: function (selectedGenreFilters) {',
                                '    this._genreFilters.forEach(function (genreFilter) {',
                                '        this._handleGenreFilterToggle[genreFilter.id](selectedGenreFilters.indexOf(genreFilter.id) !== -1);',
                                '    }.bind(this));',
                                ' ',
                                '    this._selectedGenreFilters = selectedGenreFilters;',
                                '},',
                                '...',
                                '/*',
                                '* Generate shows filters.',
                                '*/',
                                '_getShowsFilters: function () {',
                                '    var filters = [];',
                                ' ',
                                '    //Status filters',
                                '    for (var status in Statuses) {',
                                '        filters.push(',
                                '            <FormCheckbox key={status + "-filter"}',
                                '                    data-id={status + "-filter"}',
                                '                    label={Statuses[status]}',
                                '                    onValueChange={this._handleGenreFilterToggle[status]}',
                                '                    checked={this.props.filters[status]} />',
                                '        );',
                                '    }',
                                '    //Genre filters',
                                '    filters.push(',
                                '        <DetailsTooltip key="genre-filters-container"',
                                '                data-id="genre-filters-dialog"',
                                '                className="input-selection-list-tooltip"',
                                '                positionClassName="bottom right"',
                                '                label="Genres"',
                                '                showClose={false}',
                                '                controlled={false} >',
                                '            <SelectionList data-id="genre-filters"',
                                '                    type={SelectionList.ListType.MULTI}',
                                '                    items={this._genreFilters}',
                                '                    selectedItemIds={this._selectedGenreFilters}',
                                '                    showSearchBox={true}',
                                '                    onValueChange={this._handleGenreFiltersValueChange} />',
                                '        </DetailsTooltip>',
                                '    );',
                                '    return filters;',
                                '},',
                                ' ',
                                '/*',
                                '* Generate genre description sections.',
                                '*/',
                                '_getGenreDescriptions: function () {',
                                '    return Object.keys(Genres).map(function (genre) {',
                                '        return (',
                                '            <Section key={genre + "-description"}',
                                '                    data-id={genre + "-description"}',
                                '                    title={Genres[genre].title}',
                                '                    controlled={false} >',
                                '                {Genres[genre].description}',
                                '            </Section>',
                                '        );',
                                '    });',
                                '},',
                                ' ',
                                'render: function () {',
                                '   return (',
                                '       <TabbedSections selectedIndex={this.props.activeTab} onValueChange={this.props.onActiveTabValueChange}>',
                                '           <div title="Shows">',
                                '               ...',
                                '                   <div className="filters">',
                                '                       {this._getShowsFilters()}',
                                '                   </div>',
                                '               ...',
                                '               <div className="result-set" style={{ height: 500 }}>',
                                '                   <InfiniteScroll contentType{this._contentType}',
                                '                       ... >',
                                '                       <div>No shows match the filters</div>',
                                '                   <InfiniteScroll>',
                                '           <div title="Genres">',
                                '               {this._getGenreDescriptions()}',
                                '           </div>',
                                '       </TabbedSections>);',
                                '}',
                                '...'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    Now we've completed the Shows list view and it'll be rendered when we navigate to the
                     &quot;Shows&quot; section in the left nav. Within the list view we can change tabs between the
                     shows list and the genre descriptions, scroll through the list of shows from our mock data,
                     and filter down the shows.
                </p>
                <img src={require("../../images/basic-app-shows-list-view.png")} />

                <h2>Shows - Expanded view</h2>
                <p>
                    Currently, our rows don't show any data when expanded. We can make the expanded row more
                     interesting by using that space to show some more details on a show:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** Shows.jsx */',
                                ' ',
                                'var ShowRow = React.createClass({',
                                '    ...',
                                '    render: function () {',
                                '        return (',
                                '            <ExpandableRow data-id={this.props.id}',
                                '                    title={this.props.title}',
                                '                    subtitle={this._getGenreTitles()}',
                                '                    showDelete={false} >',
                                '                <div className="data">',
                                '                    <div className="data-item">',
                                '                        <label>Status</label>',
                                '                        <span>{this.props.status}</span>',
                                '                    </div>',
                                '                    <div className="data-item">',
                                '                        <label>Summary</label>',
                                '                        <span>{this.props.summary}</span>',
                                '                    </div>',
                                '                </div>',
                                '            </ExpandableRow>',
                                '        );',
                                '    }',
                                '});'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    The expanded row will look something like this now. We can now see the status and summary for a
                     show when expanding its row.
                </p>
                <img src={require("../../images/basic-app-expanded-view.png")} />

                <h2>Shows - Add view</h2>
                <p>
                    The &quot;Add&quot; button in the list view opens up a modal dialog. This is where we want our
                     add view to live and we want it to be a similar to the UI Library's &quot;Wizard View&quot; demo.
                     Similar to what we did with the &quot;List View&quot; template, we can use the
                     &quot;Wizard View&quot; template as a starting point.
                </p>
                <p>
                    The &quot;Wizard View&quot; template comes with a set of actions and a reducer as well. Since
                     we're using this template as a base for the add view, which is essentially a child view of the
                     list view we can just merge the parts of the &quot;Wizard View&quot; actions and reducer we need
                     into our existing &quot;ShowsActions.js&quot; and &quot;ShowsReducer.js&quot; files.
                </p>
                <p>
                    We need to define new actions for adding a show record to the rows and resetting the add wizard
                     input fields and errors state:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** ShowsActions.js */',
                                ' ',
                                'exports.Types = keyMirror({',
                                '   ...',
                                '    SHOWS_ADD: null,',
                                '    SHOWS_ADD_WIZARD_RESET: null,',
                                '});',
                                '...',
                                '/*',
                                '* This is where an API call should be made to the server to add the show.',
                                '* Then a separate action should be dispatched when API call to server is done to update the state.',
                                '* But we don\'t have a server so just dispatch this action to update state with the show.',
                                '*/',
                                'exports.add = function (title, genres, status, summary) {',
                                '    return {',
                                '        type: exports.Types.SHOWS_ADD,',
                                '        title: title,',
                                '        genres: genres,',
                                '        status: status,',
                                '        summary: summary',
                                '    };',
                                '};',
                                ' ',
                                'exports.addReset = function () {',
                                '    return {',
                                '        type: exports.Types.SHOWS_ADD_WIZARD_RESET',
                                '    };',
                                '};',
                                '...'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    The reducer needs to be updated with some add specific state properties, logic to handle the new
                     add actions, and support some error validation:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** ShowsReducer.js */',
                                ' ',
                                'var Actions = require("./ShowsActions.js"),',
                                '    ...',
                                '    pushAtPath = require("ui-library/src/util/ReduxUtils.js").pushAtPath;',
                                ' ',
                                'var initialState = {',
                                '   ...',
                                '    addWizardShowing: false,',
                                '    addWizardErrors: {},',
                                '    addWizardFields: {}',
                                '};',
                                '...',
                                '/*',
                                '* We mock the data so need to manually keep track of lastId.',
                                '*/',
                                'var lastId = 0;',
                                '...',
                                '/*',
                                '* Initialize lastId for showing add',
                                '*/',
                                'lastId = initialState.rows.length;',
                                ' ',
                                'module.exports = function (state, action) {',
                                '   ...',
                                '    case Actions.Types.SET:',
                                '        //Summaries cannot be longer then 250 characters',
                                '        if (action.path[0] === "addWizardFields" && action.path[1] === "summary") {',
                                '            setAtPath(nextState, ["addWizardErrors", "summaryMaxLength"], action.value.length >= 250);',
                                '        }',
                                '        setAtPath(nextState, action.path, action.value);',
                                '        break;',
                                '    case Actions.Types.SHOWS_ADD:',
                                '        lastId += 1;',
                                '        var id = lastId;',
                                '        nextState = pushAtPath(nextState, "rows", {',
                                '            id: id,',
                                '            title: action.title,',
                                '            genres: action.genres,',
                                '            status: action.status,',
                                '            summary: action.summary',
                                '        });',
                                '        nextState.batches = batchSelector(nextState);',
                                '        break;',
                                '    case Actions.Types.SHOWS_ADD_WIZARD_RESET:',
                                '        setAtPath(nextState, "addWizardShowing", initialState.addWizardShowing);',
                                '        setAtPath(nextState, "addWizardErrors", initialState.addWizardErrors);',
                                '        setAtPath(nextState, "addWizardFields", initialState.addWizardFields);',
                                '        break;',
                                '   ...',
                                '};'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    Inspecting the &quot;Wizard View&quot; source code some more reveals that it's using the
                     UI Library &quot;Wizard&quot; component which has its own set of actions and a reducer.
                     In order for the wizard in the in the &quot;Wizard View&quot; template we are going to use to
                     function correctly we need to wire in the &quot;Wizard&quot; component's actions and reducer like
                     we have done for the &quot;HeaderBar&quot;, &quot;LeftNavBar&quot;, and Shows view before:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** store.js */',
                                ' ',
                                'var Redux = require("redux"),',
                                '    ...',
                                '    WizardReducer = require("ui-library/src/components/wizard/WizardReducer"),',
                                '    ...',
                                '...',
                                ' ',
                                'var reducers = {',
                                '   ...',
                                '    wizard: WizardReducer,',
                                '   ...',
                                '};'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    We also have to bind the new &quot;ShowsActions.js&quot; action creators we added above and the
                     &quot;Wizard&quot; component's action creators then pass them down to the shows view as callbacks:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                ' ',
                                'var App = React.createClass({',
                                '    /*',
                                '    * Initialize the app',
                                '    */',
                                '    componentWillMount: function () {',
                                '        //bind action creators',
                                '       ...',
                                '        this.wizardActions = Redux.bindActionCreators(WizardActions, this.props.dispatch);',
                                '        this.showsViewActions = Redux.bindActionCreators(ShowsView.Actions, this.props.dispatch);',
                                '       ...',
                                '    },',
                                '   ...',
                                '    /*',
                                '    * Get the correct view for the current nav item',
                                '    */',
                                '    _getViewContent: function (id, props) {',
                                '        switch (this._navItemsById[id].type) {',
                                '            case NavItems.Types.SHOWS:',
                                '                return (',
                                '                    <AppContent {...props}',
                                '                            ...',
                                '                            onWizardReset={this.wizardActions.reset}',
                                '                            onWizardNext={this.wizardActions.next}',
                                '                            onWizardChoose={this.wizardActions.pick}',
                                '                            onWizardEdit={this.wizardActions.edit}',
                                '                            onShowsAddWizardReset={this.showsViewActions.addReset}',
                                '                            onShowsAdd={this.showsViewActions.add}',
                                '                            ...',
                                '                );',
                                '           ...',
                                '        }',
                                '    },',
                                '});',
                                '...'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    Then we can copy and paste the &quot;Wizard View&quot; template into the basic app at the location
                     &quot;basic-app/src/app/views/ShowsAddWizard.jsx&quot;. We should also create an abstraction
                     layer, &quot;ShowsAddWizardView&quot;, like we did for &quot;Shows.jsx&quot;. The add view will
                     need to be passed down the &quot;shows-add-wizard&quot; &quot;wizard&quot; state, callbacks for
                     dispatching state changes, and all props that the &quot;Wizard&quot; component requires as
                     specified in its documentation:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** ShowsAddWizard.jsx */',
                                ' ',
                                'var ShowsAddWizard = React.createClass({',
                                '   //Copy and pasted from Wizard View template for now',
                                '});',
                                ' ',
                                '...',
                                ' ',
                                '/*',
                                '* This component creates the ShowsAddWizardView',
                                '*/',
                                'var ShowsAddWizardView = React.createClass({',
                                ' ',
                                '    LABELS: {',
                                '        labelNext: "Next",',
                                '        labelDone: "Done",',
                                '        labelCancel: "Cancel",',
                                '        labelEdit: "Edit"',
                                '    },',
                                ' ',
                                '    /*',
                                '     * When the component mounts, do a bunch of initialization',
                                '     */',
                                '    componentWillMount: function () {',
                                '        this._wizardId = "shows-add-wizard";',
                                ' ',
                                '        //Create the partials here for better performance, instead of binding on every render',
                                '        this._handleWizardReset = this.props.onWizardReset.bind(null, this._wizardId);',
                                '        this._handleWizardNext = this.props.onWizardNext.bind(null, this._wizardId);',
                                '        this._handleWizardEdit = this.props.onWizardEdit.bind(null, this._wizardId);',
                                '        this._handleWizardChoose = this.props.onWizardChoose.bind(null, this._wizardId);',
                                '    },',
                                ' ',
                                '    /*',
                                '    * Handle input field changes',
                                '    */',
                                '    _handleFieldValueChange: function (name, value) {',
                                '        this.props.onShowsValueChange(["addWizardFields", name], value);',
                                '    },',
                                ' ',
                                '    /*',
                                '    * Handle resetting the wizard & input fields',
                                '    */',
                                '    _handleReset: function () {',
                                '        this._handleWizardReset();',
                                '        this.props.onShowsAddWizardReset();',
                                '    },',
                                ' ',
                                '    render: function () {',
                                '        return (',
                                '            <ShowsAddWizard {...this.props.wizard[this._wizardId]} {...this.LABELS}',
                                '                    showing={this.props.addWizardShowing}',
                                '                    fields={this.props.addWizardFields}',
                                '                    errors={this.props.addWizardErrors}',
                                '                    genres={this.props.genres}',
                                '                    statuses={this.props.statuses}',
                                '                    onFieldValueChange={this._handleFieldValueChange}',
                                '                    onReset={this._handleReset}',
                                '                    onNext={this._handleWizardNext}',
                                '                    onEdit={this._handleWizardEdit}',
                                '                    onValueChange={this._handleWizardChoose}',
                                '                    onAdd={this.props.onShowsAdd} />',
                                '        );',
                                '    }',
                                '});',
                                ' ',
                                'module.exports = ShowsAddWizardView;'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    The &quot;Wizard View&quot; template comes with markup for supporting the &quot;Messages&quot;
                     component, &quot;Wizard.Choose&quot;, private components for different layouts for
                     a &quot;Wizard.Step&quot; and complex fields. We'll be refering to the markup from the
                     &quot;TwoColumnStep&quot; for layout support in creating our view, but otherwise most of these
                     private helper components will not be of use to us so they can be removed from our file and we
                     are left with the job of changing the rest of the template into the view we want.
                </p>
                <p>
                    We need to add the form errors prop into the list of props that may trigger a re-render, change
                     the &quot;Wizard&quot; content to be a two column layout form with input fields for adding
                     a new show, and ensure each field is wired up with the correct piece of state and callback handler:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** ShowsAddWizard.jsx */',
                                ' ',
                                'var React = require("re-react"),',
                                '    ModalButton = require("ui-library/src/components/general/ModalButton.jsx"),',
                                '    Wizard = require("ui-library/src/components/wizard"),',
                                '    Layout = require("ui-library/src/components/general/ColumnLayout.jsx"),',
                                '    FormLabel = require("ui-library/src/components/forms/FormLabel.jsx"),',
                                '    FormRadioGroup = require("ui-library/src/components/forms/FormRadioGroup.jsx"),',
                                '    FormCheckbox = require("ui-library/src/components/forms/FormCheckbox.jsx"),',
                                '    FormTextField = require("ui-library/src/components/forms/form-text-field"),',
                                '    FormTextArea = require("ui-library/src/components/forms/form-text-area");',
                                ' ',
                                'var ShowsAddWizard = React.createClass({',
                                '    /*',
                                '    * Declare which variables affect rendering.  The shouldComponentUpdate method will be be injected by re-react.',
                                '    */',
                                '    propTypes: {',
                                '       ...',
                                '        errors: React.PropTypes.object.affectsRendering,',
                                '       //messages removed b/c no longer used',
                                '    },',
                                ' ',
                                    '/*',
                                    '* When the component mounts, do a bunch of initialization',
                                    '*/',
                                    'componentWillMount: function () {',
                                    '    //Initialize the wizard',
                                    '    this.props.onReset();',
                                    ' ',
                                    '    //Create the partials here for better performance, instead of binding on every render',
                                    '    this._handleTitleFieldValueChange = this.props.onFieldValueChange.bind(null, "title");',
                                    '    this._handleStatusFieldValueChange = this.props.onFieldValueChange.bind(null, "status");',
                                    '    this._handleSummaryFieldValueChange = this.props.onFieldValueChange.bind(null, "summary");',
                                    ' ',
                                    '    this._handleGenreFieldValueChange = {};',
                                    '    for (var genre in this.props.genres) {',
                                    '        this._handleGenreFieldValueChange[genre] = this.props.onFieldValueChange.bind(null, genre);',
                                    '    }',
                                    ' ',
                                    '    //Initialize the status radio options',
                                    '    this._statusRadioOptions = [];',
                                    '    for (var status in this.props.statuses) {',
                                    '        this._statusRadioOptions.push({ id: status, name: this.props.statuses[status] });',
                                    '    }',
                                    '},',
                                    ' ',
                                    '/*',
                                    '* Add the show & close the modal wizard on done',
                                    '*/',
                                    '_handleDone: function () {',
                                    '    var genres = [];',
                                    '    for (var genre in this.props.genres) {',
                                    '        if (this.props.fields[genre]) {',
                                    '            genres.push(this.props.genres[genre]);',
                                    '        }',
                                    '    }',
                                    ' ',
                                    '    this.props.onAdd(this.props.fields.title, genres, this.props.statuses[this.props.fields.status],',
                                    '        this.props.fields.summary);',
                                    '    this.refs["shows-add-wizard-modal"].close();',
                                    '},',
                                    ' ',
                                    '/*',
                                    '* Generate genre checkbox options',
                                    '*/',
                                    '_getGenreFields: function () {',
                                    '    return Object.keys(this.props.genres).map(function (genre) {',
                                    '        return (',
                                    '            <FormCheckbox key={genre + "-field"}',
                                    '                    data-id={genre + "-field"}',
                                    '                    label={this.props.genres[genre].title}',
                                    '                    onValueChange={this._handleGenreFieldValueChange[genre]}',
                                    '                    checked={this.props.fields[genre]} />',
                                    '        );',
                                    '    }.bind(this));',
                                    '},',
                                    ' ',
                                    'render: function () {',
                                    '    return (',
                                    '        <ModalButton ref="shows-add-wizard-modal"',
                                    '                activatorButtonLabel="+ Add Show"',
                                    '                modalTitle="Show Creation Wizard"',
                                    '                className="add-modal" >',
                                    ' ',
                                    '            <Wizard {...this.props} title="Enter details to add a new show" className="shows-add">',
                                    '                <Wizard.Step title="Set Show Details"',
                                    '                        canProceed={!this.props.errors.summaryMaxLength}',
                                    '                        onCancel={this.props.onReset}',
                                    '                        onDone={this._handleDone}>',
                                    '                    <Layout.Row>',
                                    '                        <Layout.Column>',
                                    '                            <div className="input-row">',
                                    '                                <FormTextField labelText="Title"',
                                    '                                        data-id="title"',
                                    '                                        value={this.props.fields.title}',
                                    '                                        onValueChange={this._handleTitleFieldValueChange} />',
                                    '                            </div>',
                                    '                            <div className="input-row">',
                                    '                                <FormTextArea controlled={true}',
                                    '                                        labelText="Summary"',
                                    '                                        maxLength={250}',
                                    '                                        defaultValue={this.props.fields.summary}',
                                    '                                        onValueChange={this._handleSummaryFieldValueChange}',
                                    '                                        errorMessage={this.props.errors.summaryMaxLength',
                                    '                                            ? "Summary cannot exceed 250 characters." : ""} />',
                                    '                            </div>',
                                    '                            <div className="input-row">',
                                    '                                <FormLabel value="Status" />',
                                    '                                <FormRadioGroup groupName="statusGroup"',
                                    '                                        selected={this.props.fields.status}',
                                    '                                        onValueChange={this._handleStatusFieldValueChange}',
                                    '                                        items={this._statusRadioOptions} />',
                                    '                            </div>',
                                    '                        </Layout.Column>',
                                    ' ',
                                    '                        <Layout.Column>',
                                    '                            <div className="input-row">',
                                    '                                <h4>Genres</h4>',
                                    '                            </div>',
                                    '                            <div>{this._getGenreFields()}</div>',
                                    '                        </Layout.Column>',
                                    '                    </Layout.Row>',
                                    '                </Wizard.Step>',
                                    '            </Wizard>',
                                    '        </ModalButton>',
                                    '    );',
                                    '}',
                                '});'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p className="attention">
                    Note the use of the
                    <a href="https://www.npmjs.com/package/re-react" target="_blank"> re-react </a>
                     library's &quot;affectsRendering&quot; here to indicate that the &quot;error&quot; prop can
                     trigger a re-render. This is how we use the &quot;re-react&quot; library's propType decorating
                     that we introduced earlier.
                </p>
                <p>
                    The &quot;Shows.jsx&quot; file will need to include the &quot;wizard&quot; and
                     &quot;addWizardFields&quot; as props that can trigger a re-render otherwise the UI will not
                     update when one of these props changes. The &quot;ModalButton&quot; component can be
                     replaced with the &quot;ShowsAddWizardView&quot;. State specific to the wizard and any wizard or
                     add show callbacks need to be picked out from the props and passed down to the view:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** Shows.jsx */',
                                ' ',
                                'var React = require("re-react"),',
                                '    ShowsAddWizardView = require("../ShowsAddWizard.jsx"),',
                                '    ...',
                                '...',
                                'var Shows = React.createClass({',
                                '   ...',
                                '    /*',
                                '     * Declare which variables affect rendering.  The shouldComponentUpdate method will be be injected by re-react.',
                                '     */',
                                '    propTypes: {',
                                '       ...',
                                '        wizard: React.PropTypes.object.affectsRendering,',
                                '        addWizardFields: React.PropTypes.object.affectsRendering',
                                '    },',
                                '   ...',
                                '    render: function () {',
                                '        var showsViewProps = _.pick(this.props, "wizard", "onWizardReset", "onWizardNext",',
                                '            "onWizardEdit", "onWizardChoose", "onShowsValueChange", "onShowsAddWizardReset", "onShowsAdd");',
                                ' ',
                                '        return (',
                                '            <TabbedSections selectedIndex={this.props.activeTab} onValueChange={this.props.onActiveTabValueChange}>',
                                '                <div title="Shows">',
                                '                    <div className={classnames("search-bar", { expanded: this.props.advancedSearch })}>',
                                '                        <div>',
                                '                           ...',
                                '                            <ShowsAddWizardView {...this.props} genres={Genres} statuses={Statuses} />',
                                '                        </div>',
                                '                       ...',
                                '...'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    Now the add view should be rendered when the &quot;+ Add Show&quot; button is clicked.
                     Within the add view we can fill in the form and create a show that will be added to the list of
                     shows in the list view.
                </p>
                <img src={require("../../images/basic-app-add-view.png")} />

                <h2>Shows - Edit view</h2>
                <p>
                    The last view we need is editing a show. We want a simple form that will fill the content area
                     and allow users to edit the title, genres, summary, and status of a show. Looking in the
                     UI Library, it seems that the &quot;Edit View - Simple&quot; aligns best to what we want.
                     This template's source code also contains a set of actions and a reducer, but what the template
                     provides doesn't really meet our needs so instead of copying the template's actions and reducer
                     into the basic app we'll add some edit specific actions and reducer cases into the existing
                     &quot;ShowsActions.js&quot; and &quot;ShowsReducer.js&quot; files.
                </p>
                <p>
                    We'll need an action to change some state property that will tell the list view to
                     switch to the edit view for a particular row, one to save the edit form, and one to cancel an edit:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** ShowsActions.js */',
                                ' ',
                                'exports.Types = keyMirror({',
                                '   ...',
                                '    SHOWS_EDIT: null,',
                                '    SHOWS_EDIT_SAVE: null,',
                                '    SHOWS_EDIT_CANCEL: null',
                                '});',
                                '...',
                                'exports.edit = function (id) {',
                                '    return {',
                                '        type: exports.Types.SHOWS_EDIT,',
                                '        id: id',
                                '    };',
                                '};',
                                ' ',
                                '/*',
                                '* This is where an API call should be made to the server to edit the show.',
                                '* Then a separate action should be dispatched when API call to server is done to update the state.',
                                '* But we don\'t have a server so just dispatch this action to update state with the edited show.',
                                '*/',
                                'exports.saveEdit = function (id, title, genres, status, summary) {',
                                '    return {',
                                '        type: exports.Types.SHOWS_EDIT_SAVE,',
                                '        id: id,',
                                '        title: title,',
                                '        genres: genres,',
                                '        status: status,',
                                '        summary: summary',
                                '    };',
                                '};',
                                ' ',
                                'exports.cancelEdit = function () {',
                                '    return {',
                                '        type: exports.Types.SHOWS_EDIT_CANCEL',
                                '    };',
                                '};'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    In our reducer, we'll need to be updated with some edit specific state properties, logic to
                     support the new edit actions, and some error validation:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** ShowsReducer.js */',
                                ' ',
                                'var initialState = {',
                                '    ...',
                                '    editingRowInputs: {},',
                                '    editingRowErrors: {},',
                                '    ...',
                                '};',
                                '...',
                                '/*',
                                '* Get index of object with id within array of items',
                                '*/',
                                'function getIndexOfId (items, id) {',
                                '    for (var i = 0; i < items.length; i += 1) {',
                                '        if (items[i].id.toString() === id.toString()) {',
                                '            return i;',
                                '        }',
                                '    }',
                                '    return -1;',
                                '}',
                                '...',
                                'module.exports = function (state, action) {',
                                '   ...',
                                '    case Actions.Types.SET:',
                                '        ...',
                                '        //Summaries cannot be longer then 250 characters',
                                '        if (action.path[0] === "editingRowInputs" && action.path[1] === "summary") {',
                                '            setAtPath(nextState, ["editingRowErrors", "summaryMaxLength"], action.value.length >= 250);',
                                '        }',
                                '        setAtPath(nextState, action.path, action.value);',
                                '        break;',
                                '    case Actions.Types.SHOWS_EDIT:',
                                '        var row = state.rows[getIndexOfId(state.rows, action.id)];',
                                '        setAtPath(nextState, "editingRowInputs", {',
                                '            id: row.id,',
                                '            title: row.title,',
                                '            summary: row.summary',
                                '        });',
                                '        Object.keys(mockStatuses).forEach(function (status) {',
                                '            if (mockStatuses[status] === row.status) {',
                                '                setAtPath(nextState, ["editingRowInputs", "status"], status);',
                                '            }',
                                '        });',
                                '        row.genres.forEach(function (genre) {',
                                '            setAtPath(nextState, ["editingRowInputs", genre.id], true);',
                                '        });',
                                '        break;',
                                '    case Actions.Types.SHOWS_EDIT_SAVE:',
                                '        setAtPath(nextState, ["rows", getIndexOfId(state.rows, action.id)], {',
                                '            id: action.id,',
                                '            title: action.title,',
                                '            genres: action.genres,',
                                '            status: action.status,',
                                '            summary: action.summary',
                                '        });',
                                '        setAtPath(nextState, "editingRowInputs", initialState.editingRowInputs);',
                                '        nextState.batches = batchSelector(nextState);',
                                '        break;',
                                '    case Actions.Types.SHOWS_EDIT_CANCEL:',
                                '        setAtPath(nextState, "editingRowInputs", initialState.editingRowInputs);',
                                '        setAtPath(nextState, "editingRowErrors", initialState.editingRowErrors);',
                                '        break;',
                                '   ...',
                                '};'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    In order for the edit view to dispatch these actions we have to bind the action creators and pass
                     the callbacks down like we've done for the other views:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** App.jsx */',
                                ' ',
                                'var App = React.createClass({',
                                '   ...',
                                '    /*',
                                '    * Get the correct view for the current nav item',
                                '    */',
                                '    _getViewContent: function (id, props) {',
                                '        switch (this._navItemsById[id].type) {',
                                '            case NavItems.Types.SHOWS:',
                                '                return (',
                                '                    <AppContent {...props}',
                                '                            ...',
                                '                            onShowsEdit={this.showsViewActions.edit}',
                                '                            onShowsEditSave={this.showsViewActions.saveEdit}',
                                '                            onShowsEditCancel={this.showsViewActions.cancelEdit} />',
                                '                );',
                                '           ...',
                                '        }',
                                '    },',
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    We want to remain on the &quot;Shows&quot; navigation tab in the left nav, but also render the
                     edit view to take up the entire content area. To do this, we'll need to dynamically switch
                     whether the list view or the edit view for a particular row is rendered based on some state
                     property:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** Shows.jsx */',
                                ' ',
                                'var React = require("re-react"),',
                                '    ...',
                                '    ShowsEditView = require("../ShowsEdit.jsx"),',
                                '    ...',
                                '...',
                                'var ShowRow = React.createClass({',
                                '    /*',
                                '    * When the component mounts, do a bunch of initialization',
                                '    */',
                                '    componentWillMount: function () {',
                                '        //Create the partials here for better performance, instead of binding on every render',
                                '        this._handleEditButtonClick = this.props.onShowsEdit.bind(null, this.props.id);',
                                '    },',
                                ' ',
                                '    render: function () {',
                                '        return (',
                                '            <ExpandableRow data-id={this.props.id}',
                                '                    title={this.props.title}',
                                '                    subtitle={this._getGenreTitles()}',
                                '                    onEditButtonClick={this._handleEditButtonClick} //Toggles state property signalling edit',
                                '                    showDelete={false} >',
                                '               ...',
                                '            </ExpandableRow>',
                                '        );',
                                '    }',
                                '});',
                                ' ',
                                '/*',
                                '* This component creates the ShowsView',
                                '*/',
                                'var ShowsView = React.createClass({',
                                ' ',
                                '    render: function () {',
                                '        var watch = _.pick(this.props.shows, "position", "activeTab", "filters", "advancedSearch");',
                                '        var showsViewProps = _.pick(this.props, "wizard", "onWizardReset", "onWizardNext",',
                                '            "onWizardEdit", "onWizardChoose", "onShowsValueChange", "onShowsAddWizardReset", "onShowsAdd", "onShowsEdit");',
                                ' ',
                                '        return (',
                                '            <div>',
                                '                {_.isEmpty(this.props.shows.editingRowInputs)',
                                '                    ? <Shows {...this.props.shows} {...showsViewProps}',
                                '                            onSearchToggleAdvanced={this._handleSearchBarToggle}',
                                '                            onSearchFilterValueChange={this._handleSearchFilterValueChange}',
                                '                            onScrollPositionValueChange={this.props.onShowsScrollPositionValueChange}',
                                '                            onActiveTabValueChange={this.props.onShowsActiveTabValueChange} />',
                                '                    : <ShowsEditView',
                                '                            genres={Genres}',
                                '                            statuses={Statuses}',
                                '                            editingRowInputs={this.props.shows.editingRowInputs}',
                                '                            editingRowErrors={this.props.shows.editingRowErrors}',
                                '                            onShowsValueChange={this.props.onShowsValueChange}',
                                '                            onShowsEditCancel={this.props.onShowsEditCancel}',
                                '                            onShowsEditSave={this.props.onShowsEditSave} />',
                                '                }',
                                '               ...',
                                '            </div>',
                                '        );',
                                '    }',
                                '});'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    We've changed &quot;Shows.jsx&quot; to dynamically render the &quot;Shows&quot; or
                     &quot;ShowsEditView&quot; based on whether the state property &quot;editingRowInputs&quot; has
                     been initialized with values. We've also added the &quot;onShowsEdit&quot; callback to the
                     list of props to be passed down to &quot;Shows&quot; in order to attach that callback to the
                     &quot;ExpandableRow&quot; edit button so that when a row's edit button is clicked the state's
                     &quot;editingRowInputs&quot; will be populated with that row's show details and the edit view
                     will be rendered instead of the list view.
                </p>
                <p>
                    Similarly to what was done for the &quot;List View&quot; and &quot;Wizard View&quot; templates,
                     the &quot;Edit View&quot; template is changed into the edit view we want. The template's markup
                     has been altered to render input fields for show details with correct state properties
                     and callbacks wired into each field. Hardcoded text has been changed to text that fits our view,
                     and the props affecting rendering updated. Also, an abstraction layer has been created as we
                     did for the list and add views:
                </p>
                <Markup custom={true} language="js"
                        content={
                            [
                            /* eslint-disable */
                                '/** ShowsEdit.jsx */',
                                ' ',
                                'var React = require("re-react"),',
                                '    FormCheckbox = require("ui-library/src/components/forms/FormCheckbox.jsx"),',
                                '    FormTextField = require("ui-library/src/components/forms//form-text-field").v2,',
                                '    FormRadioGroup = require("ui-library/src/components/forms/FormRadioGroup.jsx"),',
                                '    FormLabel = require("ui-library/src/components/forms/FormLabel.jsx"),',
                                '    FormTextArea = require("ui-library/src/components/forms/form-text-area"),',
                                '    ButtonBar = require("ui-library/src/components/forms/ButtonBar.jsx");',
                                ' ',
                                'var ShowsEdit = React.createClass({',
                                '    /*',
                                '     * Declare which variables affect rendering.  The shouldComponentUpdate method will be be injected by re-react.',
                                '     */',
                                '    propTypes: {',
                                '        inputs: React.PropTypes.object.affectsRendering,',
                                '        errors: React.PropTypes.object.affectsRendering',
                                '    },',
                                ' ',
                                '    /*',
                                '     * When the component mounts, do a bunch of initialization',
                                '     */',
                                '    componentWillMount: function () {',
                                '        //Create the partials here for better performance, instead of binding on every render',
                                '        this._handleTitleInputValueChange = this.props.onInputValueChange.bind(null, ["editingRowInputs", "title"]);',
                                '        this._handleStatusInputValueChange = this.props.onInputValueChange.bind(null, ["editingRowInputs", "status"]);',
                                '        this._handleSummaryInputValueChange = this.props.onInputValueChange.bind(null, ["editingRowInputs", "summary"]);',
                                ' ',
                                '        this._handleGenreInputValueChange = {};',
                                '        for (var genre in this.props.genres) {',
                                '            this._handleGenreInputValueChange[genre] = this.props.onInputValueChange.bind(null, ["editingRowInputs", genre]);',
                                '        }',
                                ' ',
                                '        //Initialize the status radio options',
                                '        this._statusRadioOptions = [];',
                                '        for (var status in this.props.statuses) {',
                                '            this._statusRadioOptions.push({ id: status, name: this.props.statuses[status] });',
                                '        }',
                                ' ',
                                '        //Set the page title to the existing input title',
                                '        this._pageTitle = this.props.inputs.title;',
                                '    },',
                                ' ',
                                '    /*',
                                '    * Handle edit cancel',
                                '    */',
                                '    _handleCancel: function () {',
                                '        this.props.onCancel();',
                                '    },',
                                ' ',
                                '    /*',
                                '    * Handle edit save',
                                '    */',
                                '    _handleSave: function () {',
                                '        var genres = [];',
                                '        for (var genre in this.props.genres) {',
                                '            if (this.props.inputs[genre]) {',
                                '                genres.push(this.props.genres[genre]);',
                                '            }',
                                '        }',
                                ' ',
                                '        this.props.onSave(this.props.inputs.id, this.props.inputs.title, genres,',
                                '            this.props.statuses[this.props.inputs.status], this.props.inputs.summary);',
                                '    },',
                                ' ',
                                '    /*',
                                '    * Generate genre checkbox options',
                                '    */',
                                '    _getGenreInputs: function () {',
                                '        return Object.keys(this.props.genres).map(function (genre) {',
                                '            return (',
                                '                <FormCheckbox key={genre + "-input"}',
                                '                        data-id={genre + "-input"}',
                                '                        label={this.props.genres[genre].title}',
                                '                        onValueChange={this._handleGenreInputValueChange[genre]}',
                                '                        checked={this.props.inputs[genre]} />',
                                '            );',
                                '        }.bind(this));',
                                '    },',
                                ' ',
                                '    render: function () {',
                                '        return (',
                                '            <div className="shows-edit">',
                                '                <a className="page-return-link" onClick={this._handleCancel}>To shows list</a>',
                                ' ',
                                '                <h1 className="page-title">{this._pageTitle}</h1>',
                                ' ',
                                '                <div className="page-section">',
                                '                    <div className="input-row">',
                                '                        <FormTextField labelText="Title"',
                                '                                className="input-width-medium"',
                                '                                data-id="title"',
                                '                                value={this.props.inputs.title}',
                                '                                onValueChange={this._handleTitleInputValueChange} />',
                                '                    </div>',
                                '                    <div className="input-row">',
                                '                        <FormTextArea controlled={true}',
                                '                                labelText="Summary"',
                                '                                className="input-width-full"',
                                '                                maxLength={250}',
                                '                                defaultValue={this.props.inputs.summary}',
                                '                                onValueChange={this._handleSummaryInputValueChange}',
                                '                                errorMessage={this.props.errors.summaryMaxLength',
                                '                                    ? "Summary cannot exceed 250 characters." : ""} />',
                                '                    </div>',
                                '                    <div className="input-row">',
                                '                        <h3>Genres</h3>',
                                '                    </div>',
                                '                    <div>{this._getGenreInputs()}</div>',
                                '                    <div className="input-row">',
                                '                        <FormLabel value="Status" />',
                                '                        <FormRadioGroup groupName="statusGroup"',
                                '                                selected={this.props.inputs.status}',
                                '                                onValueChange={this._handleStatusInputValueChange}',
                                '                                items={this._statusRadioOptions} />',
                                '                    </div>',
                                '                </div>',
                                ' ',
                                '                <ButtonBar',
                                '                        onCancel={this._handleCancel}',
                                '                        onSave={this._handleSave}',
                                '                        cancelText="Cancel"',
                                '                        saveText="Save"',
                                '                        saveDisabled={this.props.errors.summaryMaxLength} />',
                                '        );',
                                '    }',
                                '});',
                                ' ',
                                '/*',
                                '* This component creates the ShowsEditView',
                                '*/',
                                'var ShowsEditView = React.createClass({',
                                ' ',
                                '    render: function () {',
                                '        return (',
                                '            <ShowsEdit',
                                '                    genres={this.props.genres}',
                                '                    statuses={this.props.statuses}',
                                '                    inputs={this.props.editingRowInputs}',
                                '                    onInputValueChange={this.props.onShowsValueChange}',
                                '                    errors={this.props.editingRowErrors}',
                                '                    onCancel={this.props.onShowsEditCancel}',
                                '                    onSave={this.props.onShowsEditSave} />',
                                '        );',
                                '    }',
                                '});',
                                ' ',
                                'module.exports = ShowsEditView;'
                            /* eslint-enable */
                            ].join("\n")
                        } />
                <p>
                    With that, our final view is done and will be rendered when a row's edit button is clicked.
                    Here, we can use the form to change and update the information associated with a show.
                </p>
                <img src={require("../../images/basic-app-edit-view.png")} />

                <h2>Completed application</h2>
                <p>
                    The basic app is now complete! We used the UI Library's components, templates, styles, and
                     utils to build a simple Redux application.
                </p>

                <h3>Congratulations! You've successfully built a working application using the UI Library.</h3>
            </Tutorial>
        );
    }
});

module.exports = BasicApp;
