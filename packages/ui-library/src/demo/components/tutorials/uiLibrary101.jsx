var React = require("react"),
    Redux = require("redux"),
    Tutorial = require("./Tutorial.jsx"),
    Markup = require("../../core/Markup.jsx"),
    ColorPicker = require("../../../components/general/ColorPicker.jsx"),
    ListView = require("../../../templates/list-view"),
    FormSelectField = require("../../../components/forms/form-select-field"),
    Translator = require("../../../util/i18n/Translator.js");

var LANGUAGES = [
    {
        label: "English",
        value: "en_us"
    },
    {
        label: "Chinese (Traditional)",
        value: "zh_cn"
    }
];

class UILibrary101 extends React.Component {
    constructor(props) {
        super(props);
        this._handleLanguageChange1 = this._handleLanguageChange.bind(null, 1);

        this.state = {
            pickerColor: "#fff",
            currentLanguage: Translator.currentLanguage
        };
    }

    _handleChange = (color) => {
        this.setState({ pickerColor: color });
    };

    _handleLanguageChange = (index, event) => {
        Translator.setLanguage(event.target.value);
        this.setState({
            currentLanguage: event.target.value
        });
    };

    _handleToggleSearchBar = () => {
        this.actions.setExpandedSearch(!this.props.advancedSearch);
    };

    _handleSearchFilterChange = (name, value) => {
        this.actions.setFilter(name, value);
    };

    componentWillMount() {
        this.actions = Redux.bindActionCreators(ListView.Actions, this.props.store.dispatch);
    }

    render() {
        return (
            <Tutorial generateTOC={true}>
                <p>
                    Welcome to the UI Library - a library made of reusable React components,
                     util functions and static assets.
                </p>
                <p>
                    This tutorial will guide you through how to integrate the UI Library project into your own project
                     and start using it to create a new application using its application template.
                </p>

                <h2 className="integrate-anchor">How to integrate the UI Library into an existing project</h2>
                <p>
                    The UI Library can be integrated as an npm module into an existing project by adding it as a
                     dependency in your project's package.json file.
                </p>
                <p>Below is an example of how it is integrated into a project called 'foobar':</p>
                <Markup custom={true} language="json"
                    content={
                        [
                        /* eslint-disable */
                            '{',
                            '   "name": "foobar"',
                            '   ...',
                            '   "dependencies": {',
                            '       ...',
                            '       "ui-library": "http://art01.corp.pingidentity.com:8080/artifactory/simple/inhouse/com/pingone/ui-library/ui-library/<VERSION>/ui-library-<VERSION>.tar.gz"',
                            '       ...',
                            '   }',
                            '   ...',
                            '}'
                        /* eslint-enable */
                        ].join("\n")
                    }
                />
                <p>Replace &lt;VERSION&gt; in the link above with a version of the library (e.g. 1.0.0).</p>
                <p className="attention">
                    A SNAPSHOT version of the UI Library can be used in development by appending &quot;-SNAPSHOT&quot;
                     to the &lt;VERSION&gt;. But you should never release a project with a dependency on a SNAPSHOT
                     version of the UI Library. Doing so can result in unexpected behaviour. It is recommended to
                     perform a check during the release build of your project that the UI Library dependency is not on a
                     SNAPSHOT and block the package release if the UI Library dependency is a SNAPSHOT.
                </p>
                <p>
                    Upon being added as one of your project's dependencies, npm will download the UI Library package
                     and extract its contents under the 'node_modules/ui-library' directory. Now you can start using the
                     library's assets in your project.
                </p>

                <h2>The UI Library structure</h2>
                <p>
                    Before we get to how to incorporate the library's assets into your project, let's take a look at
                     how the UI Library package is structured:
                </p>
                <Markup custom={true}
                    content={
                        [
                        /* eslint-disable */
                            '> src',
                            '   > components (ReactJS components, grouped by functionality)',
                            '       > calendars',
                            '       > example (an example ReactJS component, to be used as a template for new reusable components)',
                            '       > forms',
                            '       > general',
                            '       > help',
                            '       > list',
                            '       > offscreen',
                            '       > panels',
                            '       > rows',
                            '       > tooltips',
                            '       > wizard',
                            '   > constants (constants used in various modules / classes)',
                            '   > css (the source CSS to give the components a common look and feel)',
                            '   > demo (demo files; the structure inside is a mirror of the src directory structure',
                            '       > components',
                            '           > calendars',
                            '           > forms',
                            '           ...',
                            '       > core (for demo internal use only - this is the app you\'re looking at right now!)',
                            '       > css',
                            '       > fonts',
                            '       > images',
                            '       > net',
                            '       > Demo.jsx',
                            '       > index.html',
                            '   > fonts (fonts to support the common L&F)',
                            '   > images (images to support the common L&F)',
                            '   > net (support for the API layer (HTTP client, Cache, etc)',
                            '   > templates (examples of how the UI Library components can be wired together to give you a specific view / layout)',
                            '   > testutil (utils to make the testing of ReactJS components easier - build on top of the ReactTestUtils)',
                            '   > util (various utils, mainly for string formatting and validation)'
                        /* eslint-enable */
                        ].join("\n")
                    }
                />

            <h2>Importing and using components from the UI Library module</h2>
                <p>
                    Great, now you know how to successfully add the UI Library as a project dependency and are familiar
                     with how it is structured. Using a component from the library is just a matter of providing the
                     correct path to the require statement.
                </p>
                <p>
                    Let's continue with our example. Say a request has been made for a color picker but there isn't an
                     existing color picker component in the 'foobar' project. Luckily, we have set-up the UI Library as
                     one of our project dependencies and the UI Library has a color picker component we can use!
                </p>
                <p>
                    To make use of the UI Library's color picker component, we need to put the following at the top of
                     the file where we want to use it:
                </p>
                <Markup custom={true} language="js"
                    content={'var ColorPicker = require("ui-library/src/components/general/ColorPicker.jsx")'} //eslint-disable-line
                />
                <p className="attention">
                    Do not use the relative path to the components to import (e.g. '../../node_modules/ui-library/src
                    /components/general/ColorPicker.jsx'). Instead, use the path from the library's root directory as
                     shown above.
                </p>
                <p>
                    With that in place, we can use the UI Library ColorPicker component like any other React component.
                </p>
                <p>
                    The UI Library demo app also provides examples for every component available within the UI Library.
                     In navigation bar to the left there are several sections that group the UI Library components by
                     functionality. A component's demo page will contain a working example, sample code that produces
                     the example, and documentation for that component. In addition to those examples, you may also
                     choose to take a look at the UI Library package's source code to see how we use the components to
                     build an application.
                </p>
                <p>Here is an example of the ColorPicker in use and the result of what it will give you:</p>
                <Markup custom={true}
                    content={
                        [
                        /* eslint-disable */
                            'render: function () {',
                            '    return (',
                            '       <ColorPicker',
                            '           data-id="color-picker"',
                            '           color={this.state.pickerColor}',
                            '           onValueChange={this._handleChange}',
                            '           labelText="ColorPicker"',
                            '           hintText="Pick a color or type in the hex code"',
                            '    );',
                            '}'
                        /* eslint-enable */
                        ].join("\n")
                    }
                />
                <div className="output">
                    <ColorPicker
                        data-id="color-picker"
                        color={this.state.pickerColor}
                        onValueChange={this._handleChange}
                        labelText="ColorPicker"
                        hintText="Pick a color or type in the hex code"
                    />
                </div>

                <h2>Using templates from the UI Library module</h2>
                <p>
                    In addition to ready-to-use components like the ColorPicker, the UI Library also comes with several
                     useful templates. Under the 'ui-library/src/templates' folder there are examples showing how the
                     UI Library components can be wired together to create common views and layouts. These templates can
                     be a good starting point for creating your own views and layouts.
                </p>
                <p>
                    Each template is stored in its own folder (e.g. 'ui-library/src/templates/list-view') and has a
                     '.jsx' file which contains the ReactJS markup that creates the template, an 'Action.js' and
                     'Reducer.js' file for use with the Redux store, and an 'index.js' file demonstrating how everything
                     in the folder can be neatly exported.
                </p>
                <p>
                    You can use a template for simple layout support, like figuring out which CSS classes and markup to
                     use to create the view you want, by copying the markup from the template into your project.
                     This will give you a good base to build your own custom view or layout. Examples of each template
                     are available in the UI Library demo app under the "Templates" section of the navigation bar.
                     There, you can see a preview of what each template's base markup will render, sample code on how
                     the template is used, and documentation for the template.
                </p>
                <p className="attention">
                    The tree structure is very important to ensuring a view or layout renders as exepcted. When using
                     the UI Library templates for layout support you must ensure any markup you add preserves the
                     template's tree structure. Otherwise, if your parent structure is different the layout may not
                     display as expected.
                </p>
                <p>
                    Alternatively, you can use the entire template's markup, actions, and reducer bundle by copying the
                     folder and all of its contents into your project and tweaking it to your own needs.
                </p>
                <p>
                    For example, we can copy the contents of the 'list-view' template into our 'foobar' project.
                     Let's store it in the folder 'foobar/src/layouts/list-view' then require it to use as a base for
                     creating a simple list located at 'foobar/src/forms/simple-list.jsx' like so:
                </p>
                <Markup custom={true} language="js"
                    content={'var ListView = require("../layouts/list-view");'}
                />
                <p className="attention">
                    Note the use of the relative path here, as opposed to the path used to import components above,
                     since we have copied the template files into the 'foobar' project.
                </p>
                <p>
                    Without changing anything in the template, the following will give us the default template view and
                     layout as shown:
                </p>
                <Markup custom={true}
                    content={
                        [
                        /* eslint-disable */
                            'render: function () {',
                            '   return (<ListView {...this.props.demoProps}',
                            '       onSearchToggleAdvanced={this._handleToggleSearchBar}',
                            '       onSearchFilterChange={this._handleSearchFilterChange}',
                            '       onScrollPositionChange={this.props.demoActions.setPosition}',
                            '       onActiveTabChange={this.props.demoActions.setActiveTab}',
                            '   />);',
                            '}'
                        /* eslint-enable */
                        ].join("\n")
                    }
                />
                <div className="output">
                    <ListView {...this.props}
                        onSearchToggleAdvanced={this._handleToggleSearchBar}
                        onSearchFilterChange={this._handleSearchFilterChange}
                        onScrollPositionChange={this.actions.setPosition}
                        onActiveTabChange={this.actions.setActiveTab}
                    />
                </div>
                <p className="attention">
                    As the templates contain reducers and actions, these will need to be exposed to the app so that the
                     reducers can be registered with the Redux store and the actions bound so that they can be injected
                     into the app for use. Here, we have taken care of this behind the scenes within the
                     'ui-library/src/demo/Demo.jsx' file and store the things within 'demoProps' and 'demoActions'.
                     You may choose to look at that as an example and follow what is done there or do so differently
                     - whichever works best with your project.
                </p>
                <p>
                    As mentioned earlier, this example uses the template as is without changing anything. When used in
                     your project, you should edit the template to your own needs. For example, you may wish to include
                     some more substantial content for the &quot;Second Page&quot; and &quot;Third Page&quot; tabs here
                     or maybe even remove them altogether.
                </p>

                <h2>Using the other assets from the UI Library module</h2>
                <p>The remaining assets from the UI Library can be incorporated into your project as follows:</p>
                <p>
                    The source CSS files in the library should be imported into the source CSS files in your project.
                     For example:
                </p>
                <Markup custom={true} language="js"
                    content={'@import "../../../../scripts/react/node_modules/ui-library/src/css/reset";'} //eslint-disable-line
                />
                <p className="attention">
                    Note the use of the relative path here, as opposed to the path used to import components above,
                     since these are not JS assets.
                </p>
                <p>
                    The rest of the assets (fonts, images, etc) in the library should be copied as is into the assets
                     directory of your project.
                </p>
                <p className="attention">
                    To use the UI Library's fonts, you must go into the file &quot;src/css/globals.scss&quot; and copy
                     over the commented out font section from the top of the file into a public styles folder within
                     your own app. The paths to the fonts should be edited to point to the location of the UI Library
                     fonts that have been copied over into the assets directory of your project.
                </p>
                <h2>Change UI-Library Language</h2>
                <p>
                    The UI Library supports i18n for common strings via the translator. The default language is English.
                    You can change the language of the UI-Library as shown in the following example.
                </p>
                <Markup custom={true}
                    content={
                        [
                        /* eslint-disable */
                            '// The translator is a global module. You just set the current language once and it is used everywhere.',
                            'var translator = require("/src/util/i18n/translator.jsx");',
                            'translator.setLanguage("vi_vn");'
                        /* eslint-enable */
                        ].join("\n")
                    }
                />
                <p>
                    If you change to an unsupported language or your text isn't translated,
                    the language will be set to the default (English).
                </p>
                <div className= "input-row">
                    <FormSelectField controlled={true}
                        label="Language"
                        options={LANGUAGES}
                        onChange={this._handleLanguageChange1}
                        value={this.state.currentLanguage}
                    />
                </div>
                <p>
                    You can see the text below is changed when you change the language.
                </p>
                <p className="attention">
                    Welcome to UI Library, your current language code is {Translator.currentLanguage}
                </p>
                <h3>
                    Congratulations! You now know everything you need to start using the UI Library in your projects.
                </h3>
            </Tutorial>
        );
    }
}

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
UILibrary101.Reducer = ListView.Reducer;

module.exports = UILibrary101;
