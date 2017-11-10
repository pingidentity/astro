var React = require("react"),
    Tutorial = require("./Tutorial.jsx"),
    Markup = require("../../core/Markup.jsx");

class Prototyping extends React.Component {
    render() {
        return (
            <Tutorial generateTOC={true}>
                <p>
                    The basic app can also be used as a starting point for creating prototypes using the
                     UI Library's assets. This tutorial will guide you through using the basic app to create prototypes.
                     We suggest that you read through the &quot;Basic App&quot; tutorial first for a better
                     understanding of the basic app before continuing.
                </p>
                <p>
                    To begin, download the completed basic app <a href="examples/basic-app.tar.gz"
                        target="_blank">here</a>. You can run the app using "npm install && npm run start".
                </p>
                <p>
                    We also suggest downloading the UI Library source code to follow along with the tutorial as we
                     will be referring to the source code from the UI Library as the tutorial progresses.
                     To download the latest UI Library or a specific version of the library, you can either download
                     it from artifactory, where each version is uploaded with the release, or check out the code from
                     Gerrit <a href="https://hg-od01.corp.pingidentity.com/r/#/admin/projects/ui-library"
                        target="_blank">here</a>.
                     If you choose to download the source from Gerrit, you can access a specific release by branching
                     from a tag. You can check which version of the UI Library the basic app is running on by looking
                     in the &quot;basic-app/package.json&quot; file for the &quot;ui-library&quot; dependency.
                </p>
                <p className="attention">
                    The basic app is enabled with hot reloading so changes you make in developing your prototype
                     will be immediately available and rendered without a page refresh.
                </p>

                <h2>Set up a new prototyping view</h2>
                <p>
                    Once you run the basic app, you will notice that it already has the header and left navigation
                     implemented along with two views in the left navigation. To create a new prototype, start by
                     setting up a new view in the left navigation. Depending on your prototyping needs, you may choose
                     to set up a new blank view or to use a template view from the UI Library's templates.
                </p>
                <p className="attention">
                    If your prototype involves a header or left navigation, you can change these two components
                     from inside the &quot;App.jsx&quot; file.
                </p>
                <p>
                    Navigate to the &quot;basic-app/src/app/views&quot; folder and create a new view file
                     (e.g. Prototype_0.jsx) or folder if you are using a UI Library view template.
                     This view will be the React class in which you will create your prototype.
                     You will also have to add the new view to the &quot;basic-app/src/app/core/navItems.js&quot; file.
                </p>
                <p>
                    Our prototype view is very simple for now, and simply renders a placeholder.
                </p>
                <Markup custom={true} language="js"
                    content={
                        [
                        /* eslint-disable */
                            '/** Prototype_0.jsx */',
                            ' ',
                            'var React = require("react");',
                            ' ',
                            'var Prototype_0 = React.createClass({',
                            '    render: function () {',
                            '        return <div>prototype_0</div>;',
                            '    }',
                            '});',
                            ' ',
                            'module.exports = Prototype_0;'
                        /* eslint-enable */
                        ].join("\n")} />
                <p>
                    We are going to create a new section for our prototypes inside &quot;navItems.js&quot;,
                     but you can also just add them as children of the &quot;Directory&quot; section.
                </p>
                <Markup custom={true} language="js"
                    content={
                        [
                        /* eslint-disable */
                            '/** navItems.js.jsx */',
                            ' ',
                            'var keyMirror = require("fbjs/lib/keyMirror");',
                            ' ',
                            'module.exports.Types = keyMirror({',
                            '    ...',
                            '    PROTOTYPE_0: null',
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
                            '            ...',
                            '        ]',
                            '    },',
                            '    {',
                            '        label: "Prototypes",',
                            '        children: [',
                            '            {',
                            '                label: "Prototype_0',
                            '                type: module.exports.Types.PROTOTYPE_0',
                            '                content: require("../views/Prototype_0")',
                            '            }',
                            '        ]',
                            '    }',
                            '];'
                        /* eslint-enable */
                        ].join("\n")
                    } />
                <p>
                    Once you have the prototype view set up you should see something like the following in the
                     basic app.
                </p>
                <img src={require("../../images/prototyping-view.png")} />

                <h2>Prototyping with components</h2>
                <p>
                    Now that we have a prototyping view set up we can begin creating our prototype. You can add any
                     markup you want to the prototype view to get the output you want, but for our first prototype we
                     are going to demonstrate how to incorporate UI Library components into your prototypes.
                </p>
                <p className="attention">
                    Refer to the &quot;UI Library 101&quot; and &quot;Components In-depth&quot; tutorials for a
                     refresher on how to incorporate UI Library components into a project.
                </p>
                <p>
                    Say we want to prototype some drag-and-drop enabled expandable rows, so we will require the
                     &quot;DragDropRow&quot; and &quot;ExpandableRow&quot; components from the UI Library into our
                     Prototype_0 view and write the implementation:
                </p>
                <Markup custom={true} language="js"
                    content={
                        [
                        /* eslint-disable */
                            '/** Prototype_0.jsx */',
                            ' ',
                            'var React = require("react"),',
                            '    _ = require("underscore"),',
                            '    DragDropContext = require("react-dnd").DragDropContext,',
                            '    HTML5Backend = require("react-dnd/modules/backends/HTML5"),',
                            '    DragDropRow = require("ui-library/src/components/rows/DragDropRow.jsx"),',
                            '    ExpandableRow = require("ui-library/src/components/rows/expandable-row");',
                            ' ',
                            'var Prototype_0 = React.createClass({',
                            ' ',
                            '    _handleCancel: function () {',
                            '        this.setState({ dropTarget: -1 });',
                            '    },',
                            ' ',
                            '    _handleDrag: function (targetId, beingDraggedId) {',
                            '        this.setState({ dropTarget: targetId === beingDraggedId ? -1 : targetId });',
                            '    },',
                            ' ',
                            '    _handleDrop: function (targetId, beingDraggedId) {',
                            '        if (targetId === beingDraggedId) {',
                            '            return;',
                            '        }',
                            ' ',
                            '        var nextRows = _.clone(this.state.rows);',
                            '        var insertAt = targetId < beingDraggedId ? targetId : targetId - 1;',
                            '        var beingDraggedObj = this.state.rows[beingDraggedId];',
                            '        nextRows.splice(beingDraggedId, 1);',
                            ' ',
                            '        if (targetId === this.state.rows.length) {',
                            '            nextRows.push(beingDraggedObj);',
                            '        } else {',
                            '            nextRows.splice(insertAt, 0, beingDraggedObj);',
                            '        }',
                            ' ',
                            '        this.setState({ rows: nextRows, dropTarget: -1 });',
                            '    },',
                            ' ',
                            '    getInitialState: function () {',
                            '        return {',
                            '            rows: [',
                            '               { id: "1", title: "January", subtitle: "Q1" },',
                            '               { id: "2", title: "February", subtitle: "Q1" },',
                            '               { id: "3", title: "March", subtitle: "Q1" },',
                            '               { id: "4", title: "April", subtitle: "Q2" },',
                            '               { id: "5", title: "May", subtitle: "Q2" },',
                            '               { id: "6", title: "June", subtitle: "Q2" },',
                            '               { id: "7", title: "July", subtitle: "Q3" },',
                            '               { id: "8", title: "August", subtitle: "Q3" },',
                            '               { id: "9", title: "September", subtitle: "Q3" },',
                            '               { id: "10", title: "October", subtitle: "Q4" },',
                            '               { id: "11", title: "November", subtitle: "Q4" },',
                            '               { id: "12", title: "December", subtitle: "Q4" }',
                            '        ],',
                            '            dropTarget: -1',
                            '        };',
                            '    },',
                            ' ',
                            '    render: function () {',
                            '        return (',
                            '            <div className="result-set">',
                            '                {',
                            '                    this.state.rows.map(function (row, index) {',
                            '                        return (',
                            '                            <DragDropRow key={row.id}',
                            '                                    id={row.id}',
                            '                                    index={index}',
                            '                                    onDrag={this._handleDrag}',
                            '                                    onDrop={this._handleDrop}',
                            '                                    onCancel={this._handleCancel} >',
                            '                                <ExpandableRow',
                            '                                        title={row.title}',
                            '                                        subtitle={row.subtitle} />',
                            '                            </DragDropRow>',
                            '                        );',
                            '                    }.bind(this))',
                            '                }',
                            '            </div>',
                            '        );;',
                            '    }',
                            '});',
                            ' ',
                            'module.exports = DragDropContext(HTML5Backend)(Prototype_0);'
                        /* eslint-enable */
                        ].join("\n")
                    } />
                <p>
                    And with that implementation we get our prototype of drag-enabled expandable rows:
                </p>
                <img src={require("../../images/prototype_0.png")} />

                <h2>Prototyping with templates</h2>
                <p>
                    As mentioned earlier, depending on your needs you may choose to use a UI Library template as the
                     base for your new prototyping view. If so, you will need to follow the steps described in the
                     &quot;Set up a new prototyping view&quot; section above to set up a new view, but instead of
                     creating a blank view you should create a view folder and copy over the UI Library's template
                     source material. Also, you will need modify the &quot;_getViewContent&quot; function inside
                     &quot;App.jsx&quot; to pass down linked callbacks for the template's actions and reducer.
                     Let's run through an example using the &quot;Edit View - Collapsible&quot; template.
                </p>
                <p className="attention">
                    Refer to the &quot;UI Library 101&quot; and &quot;Templates In-depth&quot; tutorials for a
                     refresher on how to work with UI Library templates.
                </p>
                <p>
                    Following the steps from the &quot;Set up a new prototyping view&quot; section above we'll create
                     a new prototyping view and add it to the &quot;navItems.js&quot; file of the basic app.
                     Since we want to use a UI Library template, we will create a new subfolder
                     &quot;basic-app/src/app/views/prototype_1&quot; to hold our view instead
                     of simply creating a blank view. The template assets we copy over from the UI Library
                     should be placed in this new folder. So for the &quot;Edit View - Collapsible&quot; template we
                     will copy over the &quot;Actions.js&quot;, &quot;Reducer.js&quot;,
                     &quot;EditViewCollapsible.jsx&quot;, and &quot;index.js&quot; files.
                     To keep our naming consistent, we will also rename the &quot;EditViewCollapsible.jsx&quot; file
                     to &quot;Prototype_1.jsx&quot;.
                </p>
                <Markup custom={true} language="js"
                    content={
                        [
                        /* eslint-disable */
                            '/** Actions.js */',
                            ' ',
                            '//Same content as copied over from UI Library'
                        /* eslint-enable */
                        ].join("\n")
                    } />
                <Markup custom={true} language="js"
                    content={
                        [
                        /* eslint-disable */
                            '/** Reducer.js */',
                            ' ',
                            '//Same content as copied over from UI Library'
                        /* eslint-enable */
                        ].join("\n")
                    } />
                <Markup custom={true} language="js"
                    content={
                        [
                        /* eslint-disable */
                            '/** Prototype_1.jsx */',
                            ' ',
                            '//Same content as copied over from UI Library'
                        /* eslint-enable */
                        ].join("\n")
                    } />
                <p>
                    And we add the new view to the &quot;navItems.js&quot; file as follows.
                </p>
                <Markup custom={true} language="js"
                    content={
                        [
                        /* eslint-disable */
                            '/** navItems.js.jsx */',
                            ' ',
                            'var keyMirror = require("fbjs/lib/keyMirror");',
                            ' ',
                            'module.exports.Types = keyMirror({',
                            '    ...',
                            '    PROTOTYPE_0: null',
                            '    PROTOTYPE_1: null',
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
                            '            ...',
                            '        ]',
                            '    },',
                            '    {',
                            '        label: "Prototypes",',
                            '        children: [',
                            '            {',
                            '                label: "Prototype_0',
                            '                type: module.exports.Types.PROTOTYPE_0',
                            '                content: require("../views/Prototype_0")',
                            '            }',
                            '            {',
                            '                label: "Prototype_1',
                            '                type: module.exports.Types.PROTOTYPE_1',
                            '                content: require("../views/prototype_1/Prototype_1")',
                            '            }',
                            '        ]',
                            '    }',
                            '];'
                        /* eslint-enable */
                        ].join("\n")
                    } />
                <p>
                    At this step, if you have the basic app running, you may notice that it has logged a bunch of
                     console errors and is rendering a blank screen. This is because we have to edit some of
                     the paths in the template source files we copied over from the UI Library to point to the correct
                     resources from its new location.
                </p>
                <Markup custom={true} language="js"
                    content={
                        [
                        /* eslint-disable */
                            '/** Prototype_1.jsx */',
                            ' ',
                            'var React = require("react"),',
                            '    FormCheckbox = require("ui-library/src/components/forms/FormCheckbox.jsx"),',
                            '    FormTextField = require("ui-library/src/components/forms/form-text-field"),',
                            '    FormRadioGroup = require("ui-library/src/components/forms/FormRadioGroup.jsx"),',
                            '    FormDropDownList = require("ui-library/src/components/forms/FormDropDownList.jsx"),',
                            '    Layout = require("ui-library/src/components/general/ColumnLayout.jsx"),',
                            '    Section = require("ui-library/src/components/general/Section.jsx"),',
                            '    Toggle = require("ui-library/src/components/forms/form-toggle"),',
                            '    ButtonBar = require("ui-library/src/components/forms/ButtonBar.jsx");',
                            ' ',
                            '//Same content as copied over from UI Library'
                        /* eslint-enable */
                        ].join("\n")
                    } />
                <Markup custom={true} language="js"
                    content={
                        [
                        /* eslint-disable */
                            '/** index.js */',
                            ' ',
                            'var Prototype_1 = require("./Prototype_1.jsx");',
                            ' ',
                            'Prototype_1.Reducer = require("./Reducer");',
                            'Prototype_1.Actions = require("./Actions");',
                            ' ',
                            'module.exports = Prototype_1;'
                        /* eslint-enable */
                        ].join("\n")
                    } />
                <p>
                    You should now see the basic app rendering again after fixing the above paths, and there should
                     be a &quot;Prototype_1&quot; view in the left navigation underneath &quot;Prototype_0&quot;.
                     The &quot;Prototype_1&quot; view will not render yet when you click it because we still have to
                     register and link the view's actions and reducers to Redux. Recall how we registered reducers
                     and actions for new views from the &quot;Basic App&quot; tutorial.
                     We will get our &quot;Prototype_1&quot; view wired into Redux as follows:
                </p>
                <p>
                    Register the view's reducer to the basic app's Redux store located at
                     &quot;basic-app/src/app/core/store.js&quot;.
                </p>
                <Markup custom={true} langauage="js"
                    content={
                        [
                        /* eslint-disable */
                            '/** store.js */',
                            ' ',
                            'var Redux = require("redux"),',
                            '    ...',
                            '    Prototype_1Reducer = require("../views/prototype_1").Reducer,',
                            '    ...',
                            ' ',
                            '...',
                            ' ',
                            'var reducers = {',
                            '    ...',
                            '    Prototype_1: Prototype_1Reducer,',
                            '    ...',
                            '};',
                            ' ',
                            '...'
                        /* eslint-enable */
                        ].join("\n")
                    } />
                <p>
                    Link the view's actions to the basic app by binding its action creators and passing down callbacks
                     to the view in &quot;App.jsx&quot;. We also need to add a switch case to the
                     &quot;_getViewContent&quot; function to pass down callbacks specific to the Prototype_1 view
                     in the &quot;AppContent&quot; component. &quot;Prototype_0&quot; did not have any actions
                     or reducers requiring linked callbacks to be passed down, but &quot;Prototype_1&quot; does which
                     is why this extra step is required. Lastly, we add the state for the Prototype_1 view into
                     the state to props mapping so that the state for Prototype_1 trickles down from the store into
                     the view.
                </p>
                <Markup custom={true} langauage="js"
                    content={
                        [
                        /* eslint-disable */
                            '/** App.jsx */',
                            ' ',
                            'var React = require("react"),',
                            '    ...',
                            '    Prototype_1View = require("./views/prototype_1"),',
                            ' ',
                            '...',
                            ' ',
                            'componentWillMount: function () {',
                            '    //bind action creators',
                            '    ...',
                            '    this.Prototype_1Actions = Redux.bindActionCreators(Prototype_1View.Actions, this.props.dispatch);',
                            '    ...',
                            '},',
                            ' ',
                            '...',
                            ' ',
                            '_getViewContent: function (id, props) {',
                            '    switch (this._navItemsById[id].type) {',
                            '        case NavItems.Types.SHOWS:',
                            '            return (',
                            '                <AppContent {...props}',
                            '                        ...',
                            '            );',
                            '        case NavItems.Types.PROTOTYPE_1:',
                            '            return (',
                            '                <AppContent {...props}',
                            '                        content={this._navItemsById[id].content}',
                            '                       //Callbacks specific to the PROTOTYPE_1 view',
                            '                        onSave={this.Prototype_1Actions.saveForm}',
                            '                        onInputChange={this.Prototype_1Actions.setInput}',
                            '                        onSectionToggle={this.Prototype_1Actions.toggleSection} />',
                            '            );',
                            '        default:',
                            '            return (',
                            '                <AppContent {...props}',
                            '                        content={this._navItemsById[id].content} />',
                            '            );',
                            '    }',
                            '},',
                            ' ',
                            '...',
                            ' ',
                            'App = ReactRedux.connect(function (state) {',
                            '    return {',
                            '        ...',
                            '        prototype_1: state.prototype_1,',
                            '        ...',
                            '    };',
                            '})(App);'
                        /* eslint-enable */
                        ].join("\n")
                    } />
                <p>
                    Finally, we need to edit the Prototype_1 view so it knows to get state from the
                     &quot;prototype_1&quot; prop we added in the state to props mapping above. Change the file to
                     export a different React class which selects props to pass down to the view as follows.
                </p>
                <Markup custom={true} language="js"
                    content={
                        [
                        /* eslint-disable */
                            '/** Prototype_1.jsx */',
                            ' ',
                            'var Prototype_1 = React.createClass({ // Replace module.exports here with a var',
                            '    // Same as before',
                            '});',
                            ' ',
                            '// This class activates the Prototype_1 view',
                            'module.exports = React.createClass({',
                            '    render: function () {',
                            '        // Select specific state to pass down',
                            '        return (',
                            '            <Prototype_1 {...this.props["prototype_1"]}',
                            '                    onInputChange={this.props.onInputChange}',
                            '                    onSectionToggle={this.props.onSectionToggle}',
                            '                    onSave={this.props.onSave}',
                            '                    saving={this.props["prototype_1"].inputs.saving}',
                            '                    showButtonBar={this.props["prototype_1"].inputs.dirty}/>',
                            '        );',
                            '    }',
                            '});'
                        /* eslint-enable */
                        ].join("\n")
                    } />
                <p>
                    Now we have a completed Prototype_1 view that is using the UI Library's template. You should see
                     something like the following when navigating to the view now. From this point on, you can make
                     any other changes to refine the prototype's template to meet your needs.
                </p>
                <img src={require("../../images/prototype_1.png")} />

                <h2>Adding new styles</h2>
                <p>
                    Sometimes you may want to play with the styling when creating prototypes. To do this you will want
                     to add new CSS styles to the basic app. Ceate a new file for your styles under
                     &quot;basic-app/src/app/css&quot; and add your styles here.
                     Then, add this file to the list of imports in &quot;basic-app/src/app/app.scss&quot;.
                </p>
                <Markup custom={true} langauage="js"
                    content={
                        [
                        /* eslint-disable */
                            '/** app.scss */',
                            ' ',
                            '...',
                            ' ',
                            '/*',
                            '* Any css belonging to the basic-app itself should be imported here',
                            '*/',
                            '@import \'shows\';',
                            '/* Add imports for any prototype specific style files */',
                            '...'
                        /* esling-enable */
                        ].join("\n")
                    } />
                <p className="attention">
                    It's very important to remember to add any new styling files to the list of imports inside
                     &quot;app.scss&quot;. This is the only styling file that is required from within
                     &quot;App.jsx&quot; that is parsed by webpack when creating static assets. So any style file that
                     isn't added to the import list inside &quot;app.scss&quot; won't be included by webpack when
                     it creates the static assets.
                </p>
                <p>
                    When making styling changes, remember to keep your styles separate from any default provided
                     styling. Create new files to override default styles to reduce confusion between what is a
                     default and what is new. This makes it a lot easier to pull out any new prototype styles to pass
                     onto a front-end developer to implement.
                </p>

                <h2>Static assets and hosting</h2>
                <p>
                    Once you're satisfied with your prototype and would like to see it hosted from a server,
                     you can generate static assets for your prototypes and upload them to a hosting server from the
                     basic app. Navigate to the root &quot;basic-app&quot; folder and execute the makefile recipe
                     to pack and upload the basic app to a hosting server as follows.
                </p>
                <Markup custom={true} language="js"
                    content={
                        [
                        /* eslint-disable */
                            'make package-and-upload-for-hosting'
                        /* eslint-enable */
                        ].join("\n")
                    } />
                <p>
                    When the recipe is finished, navigate to //TBD and see your prototype in action.
                </p>

                <h2>Tips & Tricks</h2>
                <p>
                    Here are some useful tips and tricks for creating new prototypes.
                </p>

                <h3>Mock state</h3>
                <p>
                    Since these are prototypes, their state can be mocked and set within each prototype's view using
                     &quot;getInitialState&quot; from React instead of setting up and wiring in actions, reducers,
                     and callbacks for managing state in Redux. See &quot;Prototype_0&quot; above for an example.
                     The basic app is Redux-enabled though, so using it to create Redux enabled prototypes is just
                     a matter of wiring in your prototype view's actions, reducers, and callbacks.
                </p>

                <h3>Don't modify UI Library components</h3>
                <p>
                    To avoid confusion between what's provided functionality from the UI Library's components and
                     what's new functionality added by your prototype, don't modify UI Library components when
                     creating your prototypes.
                </p>

                <h3>Get the default template working first</h3>
                <p>
                    Sometimes, it may help to get the default behavior and functionality from the UI Library's
                     templates working before moving on to changing them and adding in any of your own prototype view's
                     specific functionality.
                </p>

                <h3>Ask for more functionality!</h3>
                <p>
                    If in the process of creating a prototype you find that you require more functionality from a
                     UI Library component, or perhaps you need an entirely new component or template, don't hesitate
                     to reach out to the UI Library team. We're here to help. Please refer to the
                     pages <a href="https://confluence.pingidentity.com/display/ID/UI+Platform" target="_blank">
                     here</a> for how to submit requests.
                </p>

                <h3>Congratulations! You now know how to create prototypes using the UI Library.</h3>
            </Tutorial>
        );
    }
}

module.exports = Prototyping;
