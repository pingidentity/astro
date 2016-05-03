var React = require("react"),
    classnames = require("classnames"),
    marked = require("marked"),
    _ = require("underscore");

var DemoItem = React.createClass({
    propTypes: {
    },

    getInitialState: function () {
        return {
            open: false
        };
    },

    _toggle: function () {
        this.setState({ open: !this.state.open });
    },

    render: function () {
        // This is very important because Redux updates are not instant.  When replacing the demoItemReducer,
        // The new state will take some type to propagate.  We dont want to try and render without an initial
        // state being injected into the store.  Demo actions are computed inside the Demo.jsx so they are
        // available instantly after switching to a new demo.
        if (!this.props.type || (this.props.demoActions && !this.props.demoProps)) {
            return null;
        }

        var markdown = this.props.description && marked(this.props.description);
        var props = _.extend({ actions: this.props.demoActions }, this.props.demoProps);

        return (
            <div className="section">
                <div className="documentation">
                    <div className={classnames("doc", this.state)}>
                        <div className="clearfix">
                            <h2>{this.props.label}</h2>
                            <div className="toggle" onClick={this._toggle} />
                        </div>
                        <iframe src={this.props.jsdocUrl} />
                    </div>
                </div>
                <div className="section-content">
                    <div className="demo-description"
                         dangerouslySetInnerHTML={{ __html: markdown }}></div>

                    <div className="output clearfix">{React.createElement(this.props.type, { demoProps: props })}</div>

                    <Code content={this.props.code} />
                </div>
            </div>
        );
    }
});

var Code = React.createClass({
    _extractRenderCode: function () {
        //get all matches for 'render: function() {...}'
        var matches = this.props.content.replace(/\n|\r/g, "!!!").match(/\s*render: .*?!!!(.*?)!!!\s{4}}/g);

        //take latest one (we can have helper react components before demo class)
        var latestMatch = matches[matches.length - 1];

        //remove indentation
        var indents = latestMatch.match(/^(\s*?)[^\s]/)[1].length;
        var renderCode = latestMatch.split("!!!").map(function (line) {
            return line.substring(indents);
        }).join("\n");

        // hljs below is provided by a script tag
        return hljs.highlight('xml', renderCode).value; //eslint-disable-line
    },

    render: function () {
        if (!this.props.content) {
            return null;
        }

        return (
            <div className="markup-wrapper">
                <pre className="language-markup">
                    <code className="language-markup"
                          dangerouslySetInnerHTML={{ __html: this._extractRenderCode() }}></code>
                </pre>
            </div>);
    }
});

module.exports = DemoItem;
