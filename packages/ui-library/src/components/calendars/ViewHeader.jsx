var React = require("react");

module.exports = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        onNext: React.PropTypes.func,
        onPrev: React.PropTypes.func,
        onClick: React.PropTypes.func,
        data: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            "data-id": "view-header"
        };
    },

    render: function () {
        var prop = this.props;

        return (
            <div data-id={this.props["data-id"]} className="navigation-wrapper">
                <span onClick={prop.onPrev} className="icon" >
                    <i className="fa fa-angle-left icon-left"></i>
                </span>
                <span onClick={prop.onClick} className="navigation-title" >{prop.data}</span>
                <span onClick={prop.onNext} className="icon" >
                    <i className="fa fa-angle-right icon-right"></i>
                </span>
            </div>
        );
    }

});
