var React = require("react"),
    Tutorial = require("./Tutorial"),
    Markup = require("../../core/Markup"),
    classnames = require("classnames"),
    FormTextField = require("./../../../components/forms/form-text-field").v2,
    FormRadioInput = require("ui-library/lib/components/forms/FormRadioInput"),
    FormCheckbox = require("ui-library/lib/components/forms/FormCheckbox"),
    FormLabel = require("ui-library/lib/components/forms/FormLabel"),
    Layout = require("../../../components/general/ColumnLayout"),
    _ = require("underscore"),
    Color = require("color"),
    Toggle = require("../../../components/forms/form-toggle").v2;

const COLORS = [
    {
        name: "black",
        value: "#000",
    },
    {
        name: "white",
        value: "#fff",
    },
    {
        name: "active-blue",
        value: "#2996cc",
    },
    {
        name: "active-blue-inactive",
        value: "#a9d5eb",
    },
    {
        name: "blue-grey",
        value: "#9ba9b8",
        deprecatedValue: "#9bacb4",
    },
    {
        name: "chilly",
        value: "#dae2e7",
        deprecatedValue: "#e3eaed",
    },
    {
        name: "cinder-block",
        value: "#e4e5e5",
    },
    {
        name: "critical-red",
        value: "#ed3a03",
    },
    {
        name: "dolphin",
        value: "#d8dbdc",
    },
    {
        name: "elephant",
        value: "#93999f",
        deprecatedValue: "#929aa1",
    },
    {
        name: "elderly",
        value: "#f4f7f9",
    },
    {
        name: "grass",
        value: "#3cb66e",
    },
    {
        name: "manatee",
        value: "#b1b5b8",
    },
    {
        name: "midnight",
        value: "#4b637c",
    },
    {
        name: "rabbit-fur",
        value: "#c5cfd7",
        deprecatedValue: "#d1d3d4",
    },
    {
        name: "required-yellow",
        value: "#f2bb1a",
    },
    {
        name: "rhino",
        value: "#9da2a8",
        deprecatedValue: "#9ea5a8",
    },
    {
        name: "slate",
        value: "#3d454d",
    },
    {
        name: "sonic",
        value: "#f0f6f7",
    },
    {
        name: "stone",
        value: "#c2c3c4",
    },
    {
        name: "stratus",
        value: "#afb4b8",
        deprecatedValue: "#bcbdbf",
    },
    {
        name: "success",
        value: "#4aba78",
    },
    {
        name: "success-green-inactive",
        value: "#b1e2c5",
    },
    {
        name: "timberwolf",
        value: "#e8ebed",
    },
    {
        name: "verde",
        value: "#76cc99",
    },
    {
        name: "walrus",
        value: "#575f67",
    },
    {
        name: "warning-text",
        value: "#96702c",
    },
    {
        name: "warning-yellow",
        value: "#ffd057",
    },
    {
        name: "warning-icon-yellow",
        value: "#eeb91c",
    },
];
const deprecatedIcons = ["stone", "cinder-block", "manatee", "dolphin"];
var ICONS = [
    "account",
    "admin-account",
    "alert",
    "approve",
    "apps",
    "as",
    "badge",
    "beaker",
    "books",
    "cabinet",
    "calendar",
    "certificate",
    "check",
    "circle-o",
    "circle",
    "clear",
    "clipboard",
    "close",
    "close-arrow",
    "cog",
    "collapse",
    "delete",
    "details",
    "device",
    "directory",
    "directory-hollow",
    "download",
    "dropdown-arrow",
    "earth",
    "edit",
    "expand",
    "expand-arrow",
    "file",
    "filter",
    "fingerprint",
    "globe",
    "grip",
    "group",
    "help",
    "help-rounded",
    "idp",
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
    "notepad",
    "overview",
    "pin",
    "plus",
    "plus-rounded",
    "puzzle",
    "previous",
    "radar",
    "resend",
    "right",
    "search",
    "server",
    "settings",
    "slider",
    "sort-asc",
    "sort-desc",
    "sort-none",
    "sp",
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
            return <div key={i}><span className={"inline-icon icon-" + item}></span> {item}</div>;
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
                <p>
                    The class name to show an icon is always "icon-" + the name of the icon.
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

                <h2>Colors</h2>
                <p>
                    Deprecated colors are crossed out. Some colors have been updated
                    with slightly different values. Their former values are shown
                    crossed out.
                </p>
                {
                    _.map(_.sortBy(COLORS, color => Color(color.value).luminosity()),
                        (sorted) => {
                            return (
                                <div style={{
                                    display: "inline-block",
                                    width: "80px",
                                    margin: "20px",
                                    textAlign: "center",
                                    verticalAlign: "top",
                                }}>
                                    <div style={{
                                        height: "80px",
                                        width: "80px",
                                        borderRadius: "50%",
                                        backgroundColor: sorted.value,
                                        marginBottom: "15px",
                                    }}
                                    />
                                <strong style={{
                                    textDecoration: deprecatedIcons.indexOf(sorted.name) !== -1
                                    ? "line-through" : "none",
                                    opacity: deprecatedIcons.indexOf(sorted.name) !== -1
                                    ? "0.5" : "1",
                                }}>
                                    {sorted.name}
                                </strong>
                                <div style={{
                                    textDecoration: deprecatedIcons.indexOf(sorted.name) !== -1
                                    ? "line-through" : "none",
                                    opacity: deprecatedIcons.indexOf(sorted.name) !== -1 ? "0.5" : "1",
                                }}>
                                    {sorted.value}
                                </div>

                                {sorted.deprecatedValue &&
                                    <div style={{
                                        textDecoration: "line-through",
                                        opacity: "0.5",
                                    }}>
                                        {sorted.deprecatedValue}
                                    </div>
                                }

                                </div>
                            );
                        })
                }

                <h2>Input Variations</h2>
                <p>
                    Our inputs are usually a light blue-gray color, but in some
                    contexts are better displayed with a white variant. This can
                    be triggered by surrounding the inputs in the 'modifier_light-inputs'
                    class.
                </p>

                <div>
                    <FormTextField labelText="Normal Text Input" value="Content of normal input" />
                    <div>
                        <FormLabel>Normal Radio Button and Checkbox</FormLabel><br />
                        <FormRadioInput name="nothing" value="nothing" checked={true} />
                        <FormCheckbox name="nothing" value="nothing" checked={true} />
                    </div>
                </div>
                <hr className="hr" />
                <div className="modifier_light-inputs" style={{ background: "#f8f8f8", padding: 15 }}>
                    <FormTextField labelText="White BG Text Input" value="Content of white input" />
                    <div>
                        <FormLabel>White BG Radio Button and Checkbox</FormLabel><br />
                        <FormRadioInput name="nothing" value="nothing" checked={true} />
                        <FormCheckbox name="nothing" value="nothing" checked={true} />
                    </div>
                </div>

                <Markup custom={true} language="html"
                    content={
                        [
                            /* eslint-disable */
                            '<div>',
                            '    <FormTextField labelText="Normal Text Input" value="Content of normal input" />',
                            '    <div>',
                            '        <FormLabel>Normal Radio Button and Checkbox</FormLabel><br />',
                            '        <FormRadioInput name="nothing" value="nothing" checked={true} />',
                            '        <FormCheckbox name="nothing" value="nothing" checked={true} />',
                            '    </div>',
                            '</div>',
                            '<hr className="hr" />',
                            '<div className="modifier_light-inputs" style={{background: "#f8f8f8", padding: 15}}>',
                            '    <FormTextField labelText="White BG Text Input" value="Content of white input" />',
                            '    <div>',
                            '        <FormLabel>White BG Radio Button and Checkbox</FormLabel><br />',
                            '        <FormRadioInput name="nothing" value="nothing" checked={true} />',
                            '        <FormCheckbox name="nothing" value="nothing" checked={true} />',
                            '    </div>',
                            '</div>',
                            /* eslint-enable */
                        ].join("\n")
                    }
                />

                <p className="attention">>
                    Finally, this page is a work-in-progress.  If you have questions about the markup or CSS
                    that go beyond what's covered in this document, feel free to ping the UX front-end
                    developers as needed.
                </p>
            </Tutorial>
        );
    }
}

module.exports = cssTips;
