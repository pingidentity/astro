var React = require("react"),
    Tutorial = require("./Tutorial.jsx"),
    Markup = require("../../core/Markup.jsx");

var templatesInDepth = React.createClass({

    render: function () {
        return (
            <Tutorial generateTOC={true}>
                <p>
                    This tutorial will lead you through getting a more in-depth understanding of UI Library templates,
                     focusing on where and how to find the information you need to use the markup from a template to
                     create an expected layout in your own application. We suggest that you read through the
                     &quot;UI Library 101&quot; tutorial first for an introduction to the UI Library before continuing.
                </p>

                <h3>Where to find templates?</h3>
                <p>
                    The UI Library's demo app contains a demo page for all the template layouts in the library, so it's
                     a good place to start when looking for a template you can use. Since you are reading this page,
                     you most likely have the demo app running. If not, you can get the demo app running by navigating
                     to the UI Library node_modules package and follow the instructions in the README to get the app
                     running locally.
                </p>
                <p>
                    All of the UI Library templates are located under the &quot;TEMPLATES&quot; section of the left
                     navigation panel in the demo app. Each sub-section contains a demo for an available template
                     (e.g. &quot;Edit View - Collapsible&quot;). Each demo renders the layout for its template onto the
                     screen so you can see exactly what the markup for the template will give you.
                     If you have some common layout you wish to implement, this is the place to turn to when searching
                     for a base template you can build your layout on top of.
                </p>
                <p>
                    The JS documentation should also be referred to when searching for templates as it contains a more
                     detailed description of each template's configuration. The documentation gives you a better
                     understanding of how each template works and will help you in deciding whether a particular
                     template meets your needs. Each template has a link to its JS documentation page on its demo page.
                     Look for the &quot;+ expand documentation&quot; link in the top right corner of the demo.
                     There is also a link to the JS documentation home page in the top right hand corner of the
                     demo app. Look for the help icon:
                     <span className="icon-help" />
                </p>
                <p>
                    Refering to the UI Library package's source code directly will reveal all the implementation
                     details for a template. Each template's source code is accessible through a link on its
                     documentation page or you can navigate to it within the UI Library's node_modules package.
                     You may find the section on the UI Library structure in the &quot;UI Library 101&quot;
                     tutorial helpful to refer to when navigating through the UI Library package.
                </p>

                <h3>Using a template</h3>
                <p>
                    Now that you know where to find templates and information on each template the remainder of this
                     tutorial will detail how to use the demo app, JS documentation, and source code to gain all the
                     information you need to know about a template in order to start using it.
                </p>
                <p>
                    The demo app will have a demo page dedicated to the template you are interested in using. On that
                     page will be a rendering of the layout that particular template produces. Examining the rendered
                     layout on that page is a good place to start in figuring out what changes you should
                     make to the template after copying it into your project in order to get the layout you want.
                </p>
                <p>
                    Let us look at a very simple example. We are interested in using the &quot;Edit View - Simple&quot;
                     template to create an editable form layout asking for user information. The demo page for this
                     template should show you something like this:
                </p>
                <img src={require("../../images/edit-view-simple.png")} />
                <p>
                    In order to start using this template's markup as a base for the layout you want, you need to copy
                     the template's markup over into your project. The source code for the template is easily accessible
                     through the link labeled &quot;Source&quot; in its JS documentation, or you can find it within the
                     &quot;templates&quot; sub-folder inside the UI Library node_modules package.
                     Once copied over, you can make any changes to the template you want.
                </p>
                <p>
                    From the example above we can infer that the given template has the fields shown
                     and has been set up to provide support for input changes and saving the form. We can verify this
                     by inspecting the source code for this demo and the template's source code. If you wanted another
                     input field in the layout or if you want to add another callback to handle some other behavior,
                     you can go into the file you copied over and change the markup to include those options.
                </p>
                <p>
                    Often times, there are additional configuration options that are not shown in the demo of a
                     template. For more detailed information on how a particular template should be configured we
                     should refer to its JS documentation. Each template's documentation can be easily accessed from
                     its demo page by clicking on the &quot;+ expand documentation&quot; link in the top right corner.
                </p>
                <p>
                    The documentation will contain detailed descriptions on what sort of layout a template can be
                     used as a base for and all of the attributes it takes in. The type of any attribute, any default
                     it is set to, and whether or not it is a required attribute will be outlined as well.
                     For example, the documentation for the &quot;Edit View - Simple&quot; template is as follows:
                </p>
                <img src={require("../../images/edit-view-simple-docs.png")} />
                <p>
                    Each template will have a JS documentation page similar to the example above. The documentation is
                     where you should go to see a clearer definition of what a particular template produces and what
                     attributes it takes in.
                </p>
                <p>
                    Examining and understanding the source code for a template is a necessity in order to alter it into
                     producing the layout you want. The source code will reveal exactly how each attribute passed into
                     the template is used, whether the template uses Reducers and Actions, and all the CSS classes
                     used in styling the template. Changes you make to the template to get your expected layout will
                     have to take these existing behaviors into account.
                </p>
                <p>
                    Templates also have various comments within their source code to notify you of areas that have no
                     default behavior set and what expected logic should be implemented:
                </p>
                <Markup custom={true} language="js"
                    content={
                        [
                            /* eslint-disable */
                            '//Reducer.js for "Edit View - Simple" template',
                            ' ',
                            'case Actions.Types.EDIT_VIEW_SAVE:',
                            '    // make API call(s) to save data stored in the app state',
                            '    break;',
                            /* eslint-enable */
                        ].join("\n")
                    }
                />
                <p>
                    Templates are made to be adapted and changed by you as a developer into whatever you need it to be.
                     Using the demo app, JS documentation, and source code to better understand the details behind a
                     template will help you acquire all the information necessary to use templates effectively to
                     achieve the layout you want in your application.
                </p>

                <h4>
                    Congratulations! You should now have all the tools you need to start using UI Library templates.
                </h4>
            </Tutorial>
        );
    }
});

module.exports = templatesInDepth;