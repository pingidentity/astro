var React = require("react"),
    Tutorial = require("./Tutorial.jsx"),
    Markup = require("../../core/Markup.jsx"),
    classnames = require("classnames"),
    FormTextField = require("./../../../components/forms/form-text-field").v2,
    Layout = require("../../../components/general/ColumnLayout.jsx"),
    Toggle = require("../../../components/forms/Toggle.jsx");

var cssTips = React.createClass({

    _toggleFieldset: function () {
        this.setState ({
            showFieldset: !this.state.showFieldset
        });
    },

    getInitialState: function () {
        return {
            showFieldset: false
        };
    },

    render: function () {
        var fieldsetCss = {
            focused: this.state.showFieldset,
            unfocused: !this.state.showFieldset
        };

        return (
            <Tutorial generateTOC={true}>

                <p>
                    This tutorial outlines some general CSS tips and tricks not covered in the components
                    or templates.
                </p>

                <br />
                <h2>Buttons</h2>

                <h3>Declaration</h3>
                <p>
                    Buttons can be declared by using a css class or by simply using the button markup.  See
                    below. All three buttons look identical, but the first two don't require a class. The last
                    (the anchor) appears as a button because of the added "button" class.
                </p>
                <p>
                    <input type="button" value="button" />
                    <button>button</button>
                    <a className="button">button</a>
                </p>
                <Markup custom={true} language="html"
                    content={
                        [
                            /* eslint-disable */
                            '<input type="button" value="button" />',
                            '<button>button</button>',
                            '<a className="button">button</a>'
                            /* eslint-enable */
                        ].join("\n")
                    }
                />
                <p>
                    The "input" or "button" markup is preferable.  The class name is provided for when a button
                    is not ideal. For example, an "input" or "button" tag can trigger a submit action if
                    contained within a form. Using an "a"/anchor-tag will prevent this without requiring
                    JavaScript to prevent the event.
                </p>

                <br />
                <h3>Basic Types</h3>
                <p>
                    There are four main types of buttons: Primary, Secondary, Success, and inline.
                </p>
                <p>
                    <input type="button" value="Primary" className="primary" />
                    <input type="button" value="Secondary" />
                    <input type="button" value="Success" className="success" />
                    <input type="button" value="Inline" className="inline" />
                </p>
                <Markup custom={true} language="html"
                    content={
                        [
                            /* eslint-disable */
                            '<input type="button" value="Primary" className="primary" />',
                            '<input type="button" value="Secondary" />',
                            '<input type="button" value="Success" className="success" />',
                            '<input type="button" value="Inline" className="inline" />'
                            /* eslint-enable */
                        ].join("\n")
                    }
                />
                <p>
                    Notice that the "Secondary" button is the default button state. It does not require a class
                    if the input (type=button) or button tags are used.
                </p>

                <br />
                <h3>Special Types</h3>
                <p>
                    You may come across other types of buttons that don't fit the styles illustrated above.
                    Below are the most likely variations that you are likely to encounter.
                </p>
                <p>
                    <button className="add">Add</button> &nbsp;
                    <button className="download">Download</button>
                    <br /><br />
                    <button className="inline edit"></button>
                    <button className="inline plus"></button>
                    <button className="inline delete"></button>
                    <button className="inline remove"></button>
                    <button className="inline prev"></button>
                    <button className="inline next"></button>
                </p>
                <Markup custom={true} language="html"
                    content={
                        [
                            /* eslint-disable */
                            '<button className="add">Add</button>',
                            '<button className="download">Download</button>',
                            '<button className="inline edit"></button>',
                            '<button className="inline plus"></button>',
                            '<button className="inline delete"></button>',
                            '<button className="inline remove"></button>',
                            '<button className="inline prev"></button>',
                            '<button className="inline next"></button>'
                            /* eslint-enable */
                        ].join("\n")
                    }
                />
                <p className="attention">
                     Keep in mind that any time a button has an icon, you *must* use the "button" or anchor tag
                     ("a"). Never use an input tag as it doesn't support the CSS required to render the icon.
                </p>

                <br />
                <h2>Icons</h2>
                <p>
                    There are a variety of icons already in the library which may be used. They're contained in
                    an "icon font". This means that they are vector-based and may be resized and styled using
                    the same CSS rules as text.
                </p>
                <Layout.Row id="columns-5" className="icons">
                    <Layout.Column>
                        <span className="inline-icon icon-account"></span> icon-account
                        <br /><span className="inline-icon icon-admin-account"></span> icon-admin-account
                        <br /><span className="inline-icon icon-alert"></span> icon-alert
                        <br /><span className="inline-icon icon-approve"></span> icon-approve
                        <br /><span className="inline-icon icon-apps"></span> icon-apps
                        <br /><span className="inline-icon icon-badge"></span> icon-badge
                        <br /><span className="inline-icon icon-cabinet"></span> icon-cabinet
                        <br /><span className="inline-icon icon-calendar"></span> icon-calendar
                        <br /><span className="inline-icon icon-check"></span> icon-check
                        <br /><span className="inline-icon icon-circle-o"></span> icon-circle-o
                        <br /><span className="inline-icon icon-circle"></span> icon-circle
                        <br /><span className="inline-icon icon-clear"></span> icon-clear
                        <br /><span className="inline-icon icon-close"></span> icon-close
                        <br /><span className="inline-icon icon-cog"></span> icon-cog
                    </Layout.Column>
                    <Layout.Column>
                        <span className="inline-icon icon-collapse"></span> icon-collapse
                        <br /><span className="inline-icon icon-delete"></span> icon-delete
                        <br /><span className="inline-icon icon-directory"></span> icon-directory
                        <br /><span className="inline-icon icon-directory-hollow"></span> icon-directory-hollow
                        <br /><span className="inline-icon icon-download"></span> icon-download
                        <br /><span className="inline-icon icon-dropdown-arrow"></span> icon-dropdown-arrow
                        <br /><span className="inline-icon icon-edit"></span> icon-edit
                        <br /><span className="inline-icon icon-expand"></span> icon-expand
                        <br /><span className="inline-icon icon-expand-arrow"></span> icon-expand-arrow
                        <br /><span className="inline-icon icon-file"></span> icon-file
                        <br /><span className="inline-icon icon-filter"></span> icon-filter
                        <br /><span className="inline-icon icon-globe"></span> icon-globe
                        <br /><span className="inline-icon icon-grip"></span> icon-grip
                        <br /><span className="inline-icon icon-help"></span> icon-help
                    </Layout.Column>
                    <Layout.Column>
                        <span className="inline-icon icon-help-rounded"></span> icon-help
                        <br /><span className="inline-icon icon-image"></span> icon-image
                        <br /><span className="inline-icon icon-info"></span> icon-info
                        <br /><span className="inline-icon icon-key"></span> icon-key
                        <br /><span className="inline-icon icon-left"></span> icon-left
                        <br /><span className="inline-icon icon-lock"></span> icon-lock
                        <br /><span className="inline-icon icon-menu"></span> icon-menu
                        <br /><span className="inline-icon icon-minus"></span> icon-minus
                        <br /><span className="inline-icon icon-minus-rounded"></span> icon-minus
                        <br /><span className="inline-icon icon-network"></span> icon-network
                        <br /><span className="inline-icon icon-next"></span> icon-next
                        <br /><span className="inline-icon icon-overview"></span> icon-overview
                        <br /><span className="inline-icon icon-pin"></span> icon-pin
                        <br /><span className="inline-icon icon-plus"></span> icon-plus
                    </Layout.Column>
                    <Layout.Column>
                        <span className="inline-icon icon-plus-rounded"></span> icon-plus-rounded
                        <br /><span className="inline-icon icon-puzzle"></span> icon-puzzle
                        <br /><span className="inline-icon icon-previous"></span> icon-previous
                        <br /><span className="inline-icon icon-resend"></span> icon-resend
                        <br /><span className="inline-icon icon-right"></span> icon-right
                        <br /><span className="inline-icon icon-search"></span> icon-search
                        <br /><span className="inline-icon icon-settings"></span> icon-settings
                        <br /><span className="inline-icon icon-slider"></span> icon-slider
                        <br /><span className="inline-icon icon-sort-asc"></span> icon-sort
                        <br /><span className="inline-icon icon-sort-desc"></span> icon-sort
                        <br /><span className="inline-icon icon-sort-none"></span> icon-sort
                        <br /><span className="inline-icon icon-spinner"></span> icon-spinner
                        <br /><span className="inline-icon icon-spin-down"></span> icon-spin
                        <br /><span className="inline-icon icon-spin-up"></span> icon-spin
                    </Layout.Column>
                    <Layout.Column>
                        <span className="inline-icon icon-success"></span> icon-success
                        <br /><span className="inline-icon icon-support"></span> icon-support
                        <br /><span className="inline-icon icon-thumb"></span> icon-thumb
                        <br /><span className="inline-icon icon-undo"></span> icon-undo
                        <br /><span className="inline-icon icon-user"></span> icon-user
                        <br /><span className="inline-icon icon-users"></span> icon-users
                        <br /><span className="inline-icon icon-view"></span> icon-view
                        <br /><span className="inline-icon icon-view-hidden"></span> icon-view-hidden
                        <br /><span className="inline-icon icon-walkthrough"></span> icon-walkthrough
                        <br /><span className="inline-icon icon-wand"></span> icon-wand
                        <br /><span className="inline-icon icon-welcome"></span> icon-welcome
                    </Layout.Column>
                </Layout.Row>
                <br />
                <p>
                    It's not always required, but when displaying an icon with text, it's good practice to
                    also add the "inline-icon" class so that the icon aligns properly with the text as shown
                    below.
                </p>
                <Markup custom={true} language="html"
                    content={
                        [
                            /* eslint-disable */
                            '<span className="inline-icon icon-thumb"></span> icon-thumb'
                            /* eslint-enable */
                        ].join("\n")
                    }
                />

                <br />
                <h2>Loader/Spinner</h2>
                <p>
                    There's a CSS-only spinner animation that you can use in your applications. There are
                    currently two sizes, the default and a "large" size (shown below). An inline html-element
                    , such as a span, is normally used but others elements will work if needed:
                </p>
                <p>
                    <span className="spinner"></span>
                </p>
                <p>
                    <span className="spinner large"></span>
                </p>
                <Markup custom={true} language="html"
                    content={
                        [
                            /* eslint-disable */
                            '<span className="spinner"></span>',
                            '<span className="spinner large"></span>'
                            /* eslint-enable */
                        ].join("\n")
                    }
                />

                <br />
                <h2>Fieldsets</h2>
                <p>
                    In some designs you may find a group of inputs shown when another control is
                    selected/toggled/etc. You can easily style this by using the "fieldset" tag with the
                    "focused" and "unfocused" class (see below).
                </p>
                <p>
                    Note that in the example below, the toggle lives inside of the "legend" tag. This insures
                    that the control(s) that toggle the visibility of the fieldset appears in the proper
                    location.
                </p>
                <p>
                    Also note that while the "focused" class adds the outline and padding required for such
                    designs, the "unfocused" class is used to preserve the legend placement when the border
                    isn't present.
                </p>
                <p>
                    <fieldset className={classnames(fieldsetCss)}>
                        <legend>
                            <Toggle onToggle={this._toggleFieldset} value={this.state.showFieldset} />
                            &nbsp; Click here to toggle fieldset content
                        </legend>

                        {this.state.showFieldset && (
                            <FormTextField labelText="Toggled Text Input" />
                        )}

                    </fieldset>
                </p>
                <Markup custom={true} language="html"
                    content={
                        [
                            /* eslint-disable */
                            '<fieldset className="{classNames({ focused: this.state.showFieldset, unfocused: !this.state.showFieldset })}">',
                            '    <legend>',
                            '        <Toggle onToggle={this._toggleFieldset} value={this.state.showFieldset} />',
                            '        &nbsp; Click here to toggle fieldset content',
                            '    </legend>',
                            '    {this.state.showFieldset && (',
                            '        <FormTextField labelText="Toggled Text Input" />',
                            '    )}',
                            '</fieldset>'
                            /* eslint-enable */
                        ].join("\n")
                    }
                />

                <p className="attention">
                    As a general rule, don't hard-code CSS in a style attribute. Always use classes if at all possible.
                    If you believe CSS classes are missing, or require new ones, let us know!
                </p>

                <h3>
                    Finally, this page is a work-in-progress.  If you have questions about the markup or CSS
                    that go beyond what's covered in this document, feel free to ping the UX front-end
                    developers as needed.
                </h3>
            </Tutorial>
        );
    }
});

module.exports = cssTips;
