var React = require("react"),
    Tutorial = require("./Tutorial.jsx"),
    Markup = require("../../core/Markup.jsx"),
    classnames = require("classnames"),
    FormTextField = require("./../../../components/forms/form-text-field").v2,
    Layout = require("../../../components/general/ColumnLayout.jsx"),
    Toggle = require("../../../components/forms/form-toggle").v2;

var ICONS = [
    "account",
    "admin-account",
    "alert",
    "approve",
    "apps",
    "badge",
    "cabinet",
    "calendar",
    "certificate",
    "check",
    "circle-o",
    "circle",
    "clear",
    "close",
    "close-arrow",
    "cog",
    "collapse",
    "delete",
    "details",
    "directory",
    "directory-hollow",
    "download",
    "dropdown-arrow",
    "edit",
    "expand",
    "expand-arrow",
    "file",
    "filter",
    "globe",
    "grip",
    "group",
    "help",
    "help-rounded",
    "image",
    "info",
    "key",
    "left",
    "link",
    "lock",
    "lock-large",
    "menu",
    "minus",
    "minus-rounded",
    "network",
    "next",
    "overview",
    "pin",
    "plus",
    "plus-rounded",
    "puzzle",
    "previous",
    "resend",
    "right",
    "search",
    "settings",
    "slider",
    "sort-asc",
    "sort-desc",
    "sort-none",
    "spinner",
    "spin-down",
    "spin-up",
    "success",
    "support",
    "thumb",
    "undo",
    "user",
    "users",
    "view",
    "view-hidden",
    "walkthrough",
    "wand",
    "welcome"
];

var ICON_COLUMNS = 5;

class cssTips extends React.Component {
    state = {
        showFieldset: false
    };

    _toggleFieldset = () => {
        this.setState ({
            showFieldset: !this.state.showFieldset
        });
    };

    _renderIconColumn = (col) => {
        var iconsPerCol = Math.ceil(ICONS.length / ICON_COLUMNS);

        return ICONS.slice(iconsPerCol*(col-1), iconsPerCol*col).map(function (item, i) {
            return <div key={i}><span className={"inline-icon icon-" + item}></span> icon-{item}</div>;
        }.bind(this));
    };

    _renderIconColumns = () => {
        var content = [];

        for (var i=1; i<=ICON_COLUMNS; i+=1) {
            content.push(<Layout.Column key={i}>{this._renderIconColumn(i)}</Layout.Column>);
        }

        return content;
    };

    render() {
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
                    Buttons should be declared by using the HTML "button" element.
                    If "href" support is needed (e.g. a download button), the "button"
                    className may be given to an "anchor" element. See below.
                </p>
                <p>
                    <button>button</button>
                    <a className="button">button</a>
                </p>
                <Markup custom={true} language="html"
                    content={
                        [
                            /* eslint-disable */
                            '<button>button</button>',
                            '<a className="button" href="#downloadFile">button</a>'
                            /* eslint-enable */
                        ].join("\n")
                    }
                />
                <p>
                    Although we have supported "input" tags in the past, we ask that
                    for the sake of consistency the "button" markup be used instead.
                    Both "button" and "input" will trigger a submit action if contained in a form.
                    Using an "a"/anchor-tag should be avoided unless an "href" property is needed.
                    In the future, styling support will be removed from the "input" element.
                </p>

                <br />
                <h3>Basic Types</h3>
                <p>
                    There are four main types of buttons: Primary, Secondary, Success, and inline.
                </p>
                <p>
                    <button className="primary">Primary</button>
                    <button className="secondary">Secondary</button>
                    <button className="success">Success</button>
                    <button className="cancel">Cancel</button>
                    <button className="danger">Danger</button>
                    <button className="inline">Inline</button>
                    <button className="inline">Inline<span className="badge">4</span></button>
                </p>
                <Markup custom={true} language="html"
                    content={
                        [
                            /* eslint-disable */
                            '<button className="primary">Primary</button>',
                            '<button>Secondary</button>',
                            '<button className="success">Success</button>',
                            '<button className="cancel">Cancel</button>',
                            '<button className="inline">Inline</button>'
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
                <Layout.Row className="icons">{this._renderIconColumns()}</Layout.Row>
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
                <div className="output">
                    <fieldset className={classnames(fieldsetCss)}>
                        <legend>
                            <Toggle stateless={true} onToggle={this._toggleFieldset} toggled={this.state.showFieldset}
                                    value={this.state.showFieldset} />
                            &nbsp; Click here to toggle fieldset content
                        </legend>

                        {this.state.showFieldset && (
                            <FormTextField labelText="Toggled Text Input" />
                        )}

                    </fieldset>
                </div>
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
}

module.exports = cssTips;
