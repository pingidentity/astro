var React = require('react/addons'),
    DemoItem = require('./core/DemoItem.jsx');

require('isomorphic-fetch');

var Demo = React.createClass({
    BASE_PATH_DEMO: 'src/demo/',
    BASE_PATH_COMP: 'src/',

    demos: [
        {
            name: 'Infinite Scroller',
            demo: require('./components/list/InfiniteScrollDemo.jsx'),
            pathToCode: 'components/list/InfiniteScroll.jsx'
        },
        {
            name: 'Details Tooltip',
            demo: require('./components/tooltips/DetailsTooltipDemo.jsx'),
            pathToCode: 'components/tooltips/DetailsTooltip.jsx'
        },
        {
            name: 'Forms - Toggle',
            demo: require('./components/forms/ToggleDemo.jsx'),
            pathToCode: 'components/forms/Toggle.jsx'
        },
        {
            name: 'Help Hint',
            demo: require('./components/tooltips/HelpHintDemo.jsx'),
            pathToCode: 'components/tooltips/HelpHint.jsx'
        },
        {
            name: 'Form - Radio Group',
            demo: require('./components/forms/FormRadioGroupDemo.jsx'),
            pathToCode: 'components/forms/FormRadioGroup.jsx'
        },
        {
            name: 'Form - Text Field',
            demo: require('./components/forms/FormTextFieldDemo.jsx'),
            pathToCode: 'src/demo/components/forms/FormTextFieldDemo.jsx',
            description: 'descriptions'
        },
        {
            name: 'Form - Text Area',
            demo: require('./components/forms/FormTextAreaDemo.jsx'),
            pathToCode: 'src/demo/components/forms/FormTextAreaDemo.jsx',
            description: 'descriptions'
        },
        {
            name: 'Form - Select Field',
            demo: require('./components/forms/FormSelectFieldDemo.jsx'),
            pathToCode: 'src/demo/components/forms/FormSelectFieldDemo.jsx',
            description: 'descriptions'
        },
        {
            name: 'Collapsible Section',
            demo: require('./components/general/CollapsibleSectionDemo.jsx'),
            pathToCode: 'components/general/CollapsibleSection.jsx'
        },
        {
            name: 'Context Close Button',
            demo: require('./components/general/ContextCloseButtonDemo.jsx'),
            pathToCode: 'components/general/ContextCloseButton.jsx'
        },
        {
            name: 'Ellipsis Loader',
            demo: require('./components/general/EllipsisLoaderDemo.jsx'),
            pathToCode: 'components/general/EllipsisLoader.jsx'
        },
        {
            name: 'If',
            demo: require('./components/general/IfDemo.jsx'),
            pathToCode: 'components/general/If.jsx'
        },
        {
            name: 'ModalButton',
            demo: require('./components/general/ModalButtonDemo.jsx'),
            pathToCode: 'components/general/ModalButton.jsx',
        },
        {
            name: 'Spinner',
            demo: require('./components/general/SpinnerDemo.jsx'),
            pathToCode: 'components/general/Spinner.jsx'
        },
        {
            name: 'BackgroundLoader',
            demo: require('./components/general/BackgroundLoaderDemo.jsx'),
            pathToCode: 'components/general/BackgroundLoader.jsx'
        },
        {
            name: 'SelectText',
            demo: require('./components/general/SelectTextDemo.jsx'),
            pathToCode: 'components/general/SelectText.jsx',
        },
        {
            name: 'File Upload',
            demo: require('./components/forms/FileUploadDemo.jsx'),
            pathToCode: 'components/forms/FileUpload.jsx',
        },
        {
            name: 'Expandable Row',
            demo: require('./components/rows/ExpandableRowDemo.jsx'),
            pathToCode: 'components/rows/ExpandableRow.jsx',
        }
    ],

    getInitialState: function () {
        return {
            demoIndex: -1,
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
            this.state.demo.description = (text.replace(/\n|\r/g, '!!!').match(/\@desc(.*?)(@|\*\/)/) || ['',''])[1]
                .replace(/!!! *\*/g, '')
                .replace(/!!!/g, '');

            this.setState({ demo: this.state.demo });
        }.bind(this));
    },

    loadDemoMarkup: function () {
        if (!this.state.demo || this.state.demo.markup) {
            return;
        }

        fetch(this.BASE_PATH_DEMO + this.state.demo.pathToCode.replace('.jsx', 'Demo.jsx')).then(function (resp) {
            return resp.text();
        }.bind(this)).then(function (text) {
            var renderCode = this.unindentCode(text.replace(/\n|\r/g, '!!!').match(/render: .*?!!!(.*?) {4}}/)[1]);
            this.state.demo.markup = hljs.highlight('xml', renderCode).value; //eslint-disable-line

            this.setState({ demo: this.state.demo });
        }.bind(this));
    },

    unindentCode: function (string) {
        var indents = string.match(/^( *?)[^ ]/)[1].length;

        return string.split('!!!').map(function (line) {
            return line.substring(indents);
        }).join('\n');
    },

    hashChange: function () {
        this.setState({
            demo: this.getDemo(document.location.hash.substring(1)),
            markup: null
        });
    },

    componentDidUpdate: function () {
        this.loadDemoMarkup();
        this.loadComponentDesc();
    },

    componentWillUnmount: function () {
        window.removeEventListener(this.hashchange);
    },

    componentDidMount: function () {
        this.demos = this.demos.sort(function (a, b) {
            return a.name < b.name ? -1 : 1;
        });

        window.addEventListener('hashchange', this.hashChange);

        this.hashChange();
    },

    render: function () {
        return (
            <div className="components-container">
                <div id="header">
                    <div className="logo" />
                    <div className="title">UI Component Library</div>
                </div>
                <div id="nav">
                    <ul className="menu">
                        {
                            this.demos.map(function (item) {
                                return <li key={item.name}><a href={'#' + item.name}>{item.name}</a></li>;
                            })
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

React.render(<Demo />, document.getElementById('demo'));
