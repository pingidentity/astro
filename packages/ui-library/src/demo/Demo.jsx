var React = require('react/addons'),
    DemoItem = require('./core/DemoItem.jsx');

require('isomorphic-fetch');

var Demo = React.createClass({
    demos: [
        {
            name: 'Infinite Scroller',
            demo: require('./components/list/InfiniteScrollDemo.jsx'),
            pathToCode: 'src/demo/components/list/InfiniteScrollDemo.jsx',
            description: 'descriptions'
        },
        {
            name: 'Details Tooltip',
            demo: require('./components/tooltips/DetailsTooltipDemo.jsx'),
            pathToCode: 'src/demo/components/tooltips/DetailsTooltipDemo.jsx',
            description: 'descriptions'
        },
        {
            name: 'Forms - Toggle',
            demo: require('./components/forms/ToggleDemo.jsx'),
            pathToCode: 'src/demo/components/forms/ToggleDemo.jsx',
            description: 'descriptions'
        },
        {
            name: 'Help Hint',
            demo: require('./components/tooltips/HelpHintDemo.jsx'),
            pathToCode: 'src/demo/components/tooltips/HelpHintDemo.jsx',
            description: 'descriptions'
        },
        {
            name: 'Form - Radio Group',
            demo: require('./components/forms/FormRadioGroupDemo.jsx'),
            pathToCode: 'src/demo/components/forms/FormRadioGroupDemo.jsx',
            description: 'descriptions'
        },
        {
            name: 'Collapsible Section',
            demo: require('./components/general/CollapsibleSectionDemo.jsx'),
            pathToCode: 'src/demo/components/general/CollapsibleSectionDemo.jsx',
            description: 'descriptions'
        },
        {
            name: 'Context Close Button',
            demo: require('./components/general/ContextCloseButtonDemo.jsx'),
            pathToCode: 'src/demo/components/general/ContextCloseButtonDemo.jsx',
            description: 'descriptions'
        },
        {
            name: 'Ellipsis Loader',
            demo: require('./components/general/EllipsisLoaderDemo.jsx'),
            pathToCode: 'src/demo/components/general/EllipsisLoaderDemo.jsx',
            description: 'descriptions'
        },
        {
            name: 'If',
            demo: require('./components/general/IfDemo.jsx'),
            pathToCode: 'src/demo/components/general/IfDemo.jsx',
            description: 'descriptions'
        },
        {
            name: 'Spinner',
            demo: require('./components/general/SpinnerDemo.jsx'),
            pathToCode: 'src/demo/components/general/SpinnerDemo.jsx',
            description: 'descriptions'
        },
        {
            name: 'SelectText',
            demo: require('./components/general/SelectTextDemo.jsx'),
            pathToCode: 'src/demo/components/general/SelectTextDemo.jsx',
            description: 'The SelectText component will select all of the text of its children when it is clicked'
        }
    ],


    getInitialState: function () {
        return {
            demoIndex: -1,
            markup: null
        };
    },

    getDemo: function (name) {
        for (var i = 0; i < this.demos.length; i += 1) {
            if (this.demos[i].name === name) {
                return this.demos[i];
            }
        }
    },

    loadCode: function () {
        if (!this.state.demo) {
            return;
        }

        fetch(this.state.demo.pathToCode)
            .then(function (resp) {
                return resp.text();
            }.bind(this)).then(function (text) {
                var renderCode = this.unindentCode(text.replace(/\n|\r/g,'!!!').match(/render: .*?!!!(.*?) {4}}/)[1]);

                this.setState({
                    markup: hljs.highlight('xml', renderCode).value //eslint-disable-line
                });
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

        this.loadCode();
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
                        {this.state.demo ? <DemoItem linkName={this.state.name} title={this.state.name}
                                        markupExample={this.state.markup}
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
