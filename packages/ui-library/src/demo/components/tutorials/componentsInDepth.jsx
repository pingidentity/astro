var React = require("react"),
    Tutorial = require("./Tutorial.jsx"),
    Markup = require("../../core/Markup.jsx");

var componentsInDepth = React.createClass({

    render: function () {
        return (
            <Tutorial generateTOC={true}>
                <p>
                    This tutorial will lead you through getting a more in-depth understanding of UI Library components,
                     focusing on where and how to find information about a component in order to use it. We suggest that
                     you read through the &quot;UI Library 101&quot; tutorial first for an introduction to the
                     UI Library before continuing.
                </p>

                <h2>Where to find components?</h2>
                <p>
                    A good place to start when looking for an inventory of the UI Library's components is to fire-up the
                     UI Library's demo app and scan through the demos. Since you are reading this page, you most likely
                     have the demo app running. If not, you can get the demo app running by navigating to the UI Library
                     node_modules package and follow the instructions in the README to get the app running locally.
                </p>
                <p>
                    The demo app has a left navigation panel to provide quick access to the demo pages for different
                     categories of components. The section labeled &quot;COMPONENTS&quot; is where you can find all the
                     generic components. If you're not sure what you need this can be a good place to start looking.
                     The &quot;TEMPLATES&quot; section does not contain demos for single components, but instead
                     examples of how various components can be linked together to create a certain view or layout.
                     For more information, head over to the &quot;Templates In-depth&quot; tutorial.
                </p>
                <p>
                    The JS documentation should also be referred to when searching for components as it contains
                     a more detailed description of each component's configuration options and usage. The documentation
                     gives you a better understanding of how each component works and will help you in deciding whether
                     a particular component meets your needs. Each component has a link to its JS documentation page on
                     its demo page. Look for the &quot;+ expand documentation&quot; link in the top right corner of the
                     demo. There is also a link to the JS documentation home page in the top right hand corner of the
                     demo app. Look for the help icon:
                     <span className="icon-help" />
                </p>
                <p>
                    Referring to the UI Library package's source code directly will reveal all the implementation
                     details for a component. Each component's source code is accessible through a
                     link on its documentation page or you can navigate to it within the UI Library's
                     node_modules package. You may find the section on the UI Library project structure in the
                     "UI Library 101" tutorial helpful to refer to when navigating through the UI Library package.
                </p>

                <h2>Using a component</h2>
                <p>
                    Now that you know where to find components and information on each component the remainder of this
                     tutorial will detail how to use the demo app, JS documentation, and source code to gain all
                     the information you need to know about a component in order to start using it.
                </p>
                <p>
                    The demo app will have a demo page dedicated to the component you are interested in using. On that
                     page will be a sample working implementation of the component and the corresponding markup that
                     produced it. Examining the markup on that page is a good place to start in figuring out what the
                     component requires to function as the demo's markup will have all the necessary props and callbacks
                     for the component set.
                </p>
                <p>
                    Let us look at a very simple example. We are interested in using the &quot;Color Picker&quot;
                     component and have imported it into a file, but are not sure how to configure it so we refer to
                     the Color Picker's demo page. The page should show you something like this:
                </p>
                <img src={require("../../images/color-picker-demo.png")} />
                <p>
                    From the example markup here we can infer that in order to get the Color Picker component to
                     display and function as shown then we should set the same props and callbacks.
                </p>
                <p>
                    Often times though, there are additional configuration options that are not shown in the demo of a
                     component. For more detailed information on how a particular component should be configured we
                     should refer to its JS documentation. Each component's documentation can be easily accessed from
                     its demo page by clicking on the &quot;+ expand documentation&quot; link in the top right corner.
                </p>
                <p>
                    The documentation will contain detailed descriptions on what the component does and all of the
                     attributes it takes in. The type of an attribute, any default it is set to, and whether or not it
                     is a required attribute will be outlined as well. For example, the documentation for the Color
                     Picker component looks something like this:
                </p>
                <img src={require("../../images/color-picker-docs.png")} />
                <p>
                    Each component will have a JS documentation page similar to the Color Picker example's page shown
                     above. The documentation is where you should go to see a clearer definition
                     of what a particular component does and any attributes it takes in.
                </p>
                <p>
                    The source code for a component or its demo is the final stop for information if both the demo
                     and JS documentation for a component seems lacking. The source code will reveal exactly how each
                     attribute passed into a component is used and whether the component uses Reducers and Actions.
                     You can access a component's source easily by opening up its documentation and clicking on the
                     link labeled &quot;Source&quot;, or you can find it within the UI Library node_modules package.
                     The souce for a component's demo can be found within the &quot;demo&quot; sub-folder inside
                     the UI Library node_modules package.
                </p>
                <p>
                    Let's dive into an example where you may have to inspect the source code to get a better
                     understanding of how the component should be used.
                </p>
                <p>
                    Take a look at the demo page for the &quot;Header Bar&quot; component. It should be located under
                     the &quot;PANELS&quot; section of the left navigation bar. What you will find is that there is no
                     demo available and that there is very little markup to examine. Trying to use the Header Bar in
                     your application based off of the markup available on the demo page will not yield much results.
                </p>
                <p>
                    So, let us turn to the documentation and see if we can find some more information on how to use
                     this component there. Looking at the Header Bar component's documentation reveals to us that it
                     takes in several different attributes, with &quot;tree&quot; being one of them that is required.
                     The description of the tree parameter does not really help: &quot;The data structure of
                     the menus of the headerbar&quot;. What does that mean? How is said data structure supposed to
                     look? Both the demo page and the documentation do not really help us in this instance so this may
                     be a good time to take a look at the source code.
                </p>
                <p>
                    If we inspect the source code for the demo of the Header Bar located at
                     &quot;ui-library/src/demo/components/panels/HeaderBarDemo.jsx&quot; we will find the following
                     implementation details that were not shown on the demo page markup:
                </p>
                <Markup custom={true} language="js"
                    content={
                        [
                            /* eslint-disable */
                            'var HeaderBarDemo = React.createClass({',
                            '    getInitialState: function () {',
                            '        var initState = HeaderBar.Reducer(null, {});',
                            ' ',
                            '        return HeaderBar.Reducer(initState, HeaderBar.Actions.init([',
                            '            { id: "help", title: "Documentation" },',
                            '            { id: "cog", children: [{ id: "cog", label: "Cog" }] },',
                            '            { id: "account", children: [{ id: "globe", label: "Globe" }] }',
                            '        ]));',
                            '    },',
                            ' ',
                            '    _handleItemClick: function (id) {',
                            '        this.setState(HeaderBar.Reducer(this.state, HeaderBar.Actions.selectItemUnselectOthers(id)));',
                            '    },'
                            /* eslint-enable */
                        ].join("\n")
                    }
                />
                <p>
                    What this reveals is that the Header Bar is actually a component that uses Actions and Reducers
                     and hence requires being hooked up to the Redux Store.
                </p>
                <p className="attention">
                    An example of how Actions and Reducers can be hooked up to the Redux store nicely is available
                     within the demo app source code. Specifically, it is located within
                     &quot;ui-library/src/demo/Demo.jsx&quot;.
                </p>
                <p>
                    Further inspecting the Header Bar Reducer and Actions source code reveals a bit more about the
                     tree attribute within each file:
                </p>
                <Markup custom={true} language="js"
                    content={
                        [
                            /* eslint-disable */
                            '//Reducer.js',
                            ' ',
                            'var initialState = {',
                            '    tree: []',
                            '};',
                            ' ',
                            '//Actions.js',
                            ' ',
                            'exports.init = function (tree) {',
                            '    return {',
                            '        type: exports.Types.HEADER_INIT,',
                            '        tree: tree',
                            '    };',
                            '};'
                            /* eslint-enable */
                        ].join("\n")
                    }
                />
                <p>
                    The Header Bar source code combined with its demo source code tells us that the tree attribute is
                     required for configuration of the Header Bar component and that it should be passed in via the
                     &quot;HEADER_INIT&quot; action. The Header Bar demo file shows us exactly how to configure the
                     component using its Reducer and Actions. From there we can see an example of what the data
                     structure of the tree parameter that is passed into init looks like. It is an array of objects
                     mirroring the tree structure of the DOM elements we wish to have rendered within the Header Bar.
                </p>
                <p>
                    Using the demo app, JS documentation, component and demo source code we were able to acquire all
                     the information necessary to use the Header Bar component.
                </p>

                <h3>
                    Congratulations! You should now have all the tools you need to start using UI Library components.
                </h3>
            </Tutorial>
        );
    }
});

module.exports = componentsInDepth;
