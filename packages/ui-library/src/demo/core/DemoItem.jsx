var React = require("react/addons");

var DemoItem = React.createClass({

    propTypes: {
        linkName: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        markupExample: React.PropTypes.string
    },

    render: function () {
        return (
            <div className="section">
                <a name={this.props.linkName}></a>
                <h2>
                    {this.props.title}
                </h2>
                <div className="section-content">
                    <div className="demo-description">
                        {this.props.description}
                    </div>
                    {this.props.children ? (
                        <div className="output clearfix">
                            {this.props.children}
                        </div>
                    ) : null}
                    {this.props.markupExample ? (
                        <pre className="language-markup">
                            <code className="language-markup"
                                dangerouslySetInnerHTML={{ __html: this.props.markupExample }}></code>
                        </pre>
                    ) : null}
                </div>
            </div>
        );
    }
});

module.exports = DemoItem;
