var React = require("react/addons"),
    DemoItem = require("./core/DemoItem.jsx"),
    assign = require("object-assign"),
    packageJson = require("../../package.json");

require("isomorphic-fetch");

var Demo = React.createClass({
    BASE_PATH_DEMO: "src/demo/",
    BASE_PATH_COMP: "src/",

    demos: [
        {
            name: "Color Picker",
            demo: require("./components/general/ColorPickerDemo.jsx"),
            pathToCode: "components/general/ColorPicker.jsx"
        },
        {
            name: "Infinite Scroller",
            demo: require("./components/list/InfiniteScrollDemo.jsx"),
            pathToCode: "components/list/InfiniteScroll.jsx"
        },
        {
            name: "Wizard",
            demo: require("./components/wizard/WizardDemo.jsx"),
            pathToCode: "components/wizard/Wizard.jsx"
        },
        {
            name: "Details Tooltip",
            demo: require("./components/tooltips/DetailsTooltipDemo.jsx"),
            pathToCode: "components/tooltips/DetailsTooltip.jsx"
        },
        {
            name: "Form - Toggle",
            demo: require("./components/forms/ToggleDemo.jsx"),
            pathToCode: "components/forms/Toggle.jsx"
        },
        {
            name: "Help Hint",
            demo: require("./components/tooltips/HelpHintDemo.jsx"),
            pathToCode: "components/tooltips/HelpHint.jsx"
        },
        {

            name: "Form - Checkbox",
            demo: require("./components/forms/FormCheckboxDemo.jsx"),
            pathToCode: "components/forms/FormCheckbox.jsx"
        },
        {
            name: "Form - Checkbox List (stateless)",
            demo: require("./components/forms/FormCheckboxListStatelessDemo.jsx"),
            pathToCode: "components/forms/FormCheckboxListStateless.jsx"

        },
        {
            name: "Form - Radio Group",
            demo: require("./components/forms/FormRadioGroupDemo.jsx"),
            pathToCode: "components/forms/FormRadioGroup.jsx"
        },
        {
            name: "Form - Text Field",
            demo: require("./components/forms/FormTextFieldDemo.jsx"),
            pathToCode: "components/forms/FormTextField.jsx"
        },
        {
            name: "Form - Integer Field",
            demo: require("./components/forms/FormIntegerFieldDemo.jsx"),
            pathToCode: "components/forms/FormIntegerField.jsx"
        },
        {
            name: "Form - Text Area",
            demo: require("./components/forms/FormTextAreaDemo.jsx"),
            pathToCode: "components/forms/FormTextArea.jsx"
        },

        {
            name: "Form - Select Field",
            demo: require("./components/forms/FormSelectFieldDemo.jsx"),
            pathToCode: "components/forms/FormSelectField.jsx"
        },
        {
            name: "Form - Input Widths",
            demo: require("./components/forms/FormInputWidthsDemo.jsx"),
            pathToCode: "none"
        },
        {
            name: "Collapsible Section (stateless)",
            demo: require("./components/general/CollapsibleSectionDemo.jsx"),
            pathToCode: "components/general/CollapsibleSection.jsx"
        },
        {
            name: "Context Close Button",
            demo: require("./components/general/ContextCloseButtonDemo.jsx"),
            pathToCode: "components/general/ContextCloseButton.jsx"
        },
        {
            name: "Ellipsis Loader",
            demo: require("./components/general/EllipsisLoaderDemo.jsx"),
            pathToCode: "components/general/EllipsisLoader.jsx"
        },
        {
            name: "Ellipsis Loader Button",
            demo: require("./components/general/EllipsisLoaderButtonDemo.jsx"),
            pathToCode: "components/general/EllipsisLoaderButton.jsx"
        },
        {
            name: "If",
            demo: require("./components/general/IfDemo.jsx"),
            pathToCode: "components/general/If.jsx"
        },
        {
            name: "ModalButton",
            demo: require("./components/general/ModalButtonDemo.jsx"),
            pathToCode: "components/general/ModalButton.jsx"
        },
        {
            name: "Spinner",
            demo: require("./components/general/SpinnerDemo.jsx"),
            pathToCode: "components/general/Spinner.jsx"
        },
        {
            name: "BackgroundLoader",
            demo: require("./components/general/BackgroundLoaderDemo.jsx"),
            pathToCode: "components/general/BackgroundLoader.jsx"
        },
        {
            name: "SelectText",
            demo: require("./components/general/SelectTextDemo.jsx"),
            pathToCode: "components/general/SelectText.jsx"
        },
        {
            name: "Form - File Upload",
            demo: require("./components/forms/FileUploadDemo.jsx"),
            pathToCode: "components/forms/FileUpload.jsx"
        },
        {
            name: "Expandable Row",
            demo: require("./components/rows/ExpandableRowDemo.jsx"),
            pathToCode: "components/rows/ExpandableRow.jsx"
        },
        {
            name: "Messages",
            demo: require("./components/general/MessagesDemo.jsx"),
            pathToCode: "components/general/Messages.jsx"
        },
        {
            name: "Drag-N-Drop Row",
            demo: require("./components/rows/DragDropRowDemo.jsx"),
            pathToCode: "components/rows/DragDropRow.jsx"
        },
        {
            name: "Form - Rocker Button",
            demo: require("./components/forms/RockerButtonDemo.jsx"),
            pathToCode: "components/forms/RockerButton.jsx"
        },
        {
            name: "Form - Drop Down Button",
            demo: require("./components/forms/DropDownButtonDemo.jsx"),
            pathToCode: "components/forms/DropDownButton.jsx"
        },
        {
            name: "Form - I18n Phone Input",
            demo: require("./components/forms/i18nPhoneInput/I18nPhoneInputDemo.jsx"),
            pathToCode: "components/forms/i18nPhoneInput/I18nPhoneInput.jsx"
        },
        {
            name: "Calendar",
            demo: require("./components/calendars/CalendarDemo.jsx"),
            pathToCode: "components/calendars/Calendar.jsx"
        },
        {
            name: "Multiselect",
            demo: require("./components/forms/MultiselectDemo.jsx"),
            pathToCode: "components/forms/Multiselect.jsx"
        },
        {
            name: "Multivalues",
            demo: require("./components/forms/MultivaluesDemo.jsx"),
            pathToCode: "components/forms/Multivalues.jsx"
        },
        {
            name: "Cache",
            demo: require("./net/CacheDemo.jsx"),
            pathToCode: "components/net/Cache.js"
        },
        {
            name: "Tabbed Sections",
            demo: require("./components/general/TabbedSectionsDemo.jsx"),
            pathToCode: "components/general/TabbedSections.jsx"
        },
        {
            name: "Tutorial",
            demo: require("./components/help/intro-tutorial/IntroTutorialDemo.jsx"),
            pathToCode: "components/help/intro-tutorial/IntroTutorial.jsx"
        },
        {
            name: "Pagination",
            demo: require("./components/list/PaginationDemo.jsx"),
            pathToCode: "components/list/Pagination.jsx"
        },
        {
            name: "Time Picker",
            demo: require("./components/general/TimePickerDemo.jsx"),
            pathToCode: "components/general/TimePicker.jsx"
        }
    ],

    getInitialState: function () {
        return {
            demos: this.demos
        };
    },

    getDemo: function (name) {
        for (var i = 0; i < this.demos.length; i += 1) {
            if (this.demos[i].name === name) {
                return this.demos[i];
            }
        }
    },

    loadComponentDesc: function () {
        if (!this.state.demo || this.state.demo.description) {
            return;
        }

        fetch(this.BASE_PATH_COMP + this.state.demo.pathToCode).then(function (resp) {
            return resp.text();
        }).then(function (text) {
            var desc = (text.replace(/\n|\r/g, "!!!").match(/\@desc(.*?)(@|\*\/)/) || ["",""])[1]
                .replace(/!!! *\*/g, "")
                .replace(/!!!/g, "");

            if (desc) {
                this.setState({ demo: assign(this.state.demo, { description: desc }) });
            }
        }.bind(this));
    },

    loadDemoMarkup: function () {
        if (!this.state.demo || this.state.demo.markup) {
            return;
        }

        fetch(this.BASE_PATH_DEMO + this.state.demo.pathToCode.replace(".jsx", "Demo.jsx")).then(function (resp) {
            return resp.text();
        }.bind(this)).then(function (text) {
            var renderCode = this.unindentCode(text.replace(/\n|\r/g, "!!!").match(/render: .*?!!!(.*?)!!! {4}}/)[1]);
            // hljs below is provided by a script tag
            var markup = hljs.highlight('xml', renderCode).value; //eslint-disable-line

            this.setState({ demo: assign(this.state.demo, { markup: markup }) });
        }.bind(this));
    },

    unindentCode: function (string) {
        var indents = string.match(/^( *?)[^ ]/)[1].length;

        return string.split("!!!").map(function (line) {
            return line.substring(indents);
        }).join("\n");
    },

    handleKeyDown: function (e) {
        switch (e.keyCode) {
            case 38: //Arrow up
            case 40: //Arrow down
                var index = this.state.demos.indexOf(this.state.demo) || 0;
                index += e.keyCode === 38 ? -1 : 1;
                index = Math.max(0, index);
                document.location.hash = this.state.demos[index].name;
                break;
        }
    },

    handleHashChange: function () {
        this.setState({
            demo: this.getDemo(document.location.hash.substring(1).replace(/%20/g, " ")),
            markup: null
        });
    },

    getDocumentationUrl: function () {
        return "build/jsdoc/" + packageJson.name + "/" + packageJson.version + "/index.html";
    },

    componentDidUpdate: function () {
        this.loadDemoMarkup();
        this.loadComponentDesc();
    },

    componentWillUnmount: function () {
        window.removeEventListener("hashchange", this.handleHashChange);
        window.removeEventListener("keydown", this.handleKeyDown);
    },

    componentDidMount: function () {
        this.demos = this.demos.sort(function (a, b) {
            return a.name < b.name ? -1 : 1;
        });

        window.addEventListener("hashchange", this.handleHashChange);
        window.addEventListener("keydown", this.handleKeyDown);

        this.handleHashChange();
    },

    render: function () {
        var selectedDemoName = this.state.demo ? this.state.demo.name : null;

        return (
            <div className="components-container">
                <div id="header">
                    <div className="logo" />
                    <div className="title">UI Component Library</div>
                </div>
                <div id="nav">
                    <ul className="menu">
                        <li key="jsdoc">
                            <a target="_blank" href={this.getDocumentationUrl()}>
                                <strong>Documentation</strong>
                            </a>
                        </li>
                        {
                            this.demos.map(function (item) {
                                return (
                                    <li className={item.name === selectedDemoName ? "selected": ""} key={item.name}>
                                        <a href={"#" + item.name}>{item.name}</a>
                                    </li>);
                            }.bind(this))
                        }
                    </ul>
                </div>

                <div id="content">
                    <a name="introduction"></a>
                    <div className="introduction">
                        <div className="sub-section">
                            <h1>Ping Identity UI Component Libary</h1>
                            <p>A reusable component library for Ping Identity.</p>
                        </div>
                    </div>

                    <div className="components">
                        {this.state.demo ? <DemoItem linkName={this.state.demo.name} title={this.state.demo.name}
                                        markupExample={this.state.demo.markup}
                                        description={this.state.demo.description}>
                                        {React.createElement(this.state.demo.demo)}
                                 </DemoItem> : null
                        }
                    </div>
                </div>
            </div>
        );
    }
});

React.render(<Demo />, document.getElementById("demo"));
