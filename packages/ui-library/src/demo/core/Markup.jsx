var React = require("react");

var Markup = React.createClass({
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

    _extractCustomCode: function () {
        // hljs below is provided by a script tag
        return hljs.highlight(this.props.language || 'xml', this.props.content).value; //eslint-disable-line
    },

    render: function () {
        if (!this.props.content) {
            return null;
        }

        return (
            <div className="markup-wrapper">
                <pre className="language-markup">
                    <div className="inner-markup-wrapper">
                        <code className="language-markup"
                              dangerouslySetInnerHTML={{ __html: this.props.custom
                                ? this._extractCustomCode() : this._extractRenderCode() }}>
                        </code>
                    </div>
                </pre>
            </div>);
    }
});

module.exports = Markup;
