var React = require("react/addons");
var marked = require("marked");

var DemoItem = React.createClass({

    propTypes: {
        linkName: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        markupExample: React.PropTypes.string
    },

    render: function () {

        var markdown = this.props.description && marked(this.props.description);

        return (
            <div className="section">
                <a name={this.props.linkName}></a>
                <h2>
                    {this.props.title}
                </h2>
                <div className="section-content">
                    <div className="demo-description"
                         dangerouslySetInnerHTML={{ __html: markdown }}></div>

                    {this.props.children ? (
                    <div className="output clearfix">
                        {this.props.children}
                    </div>
                        ) : null}
                    {this.props.markupExample ? (
                    <div className="markup-wrapper">
                            <pre className="language-markup">
                                <code className="language-markup"
                                      dangerouslySetInnerHTML={{ __html: this.props.markupExample }}></code>
                            </pre>
                    </div>
                        ) : null}
                </div>
            </div>
        );
    }
});

module.exports = DemoItem;
