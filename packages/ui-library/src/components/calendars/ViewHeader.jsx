var React = require("react");
var classnames = require("classnames");

module.exports = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        onNext: React.PropTypes.func,
        onPrev: React.PropTypes.func,
        onClick: React.PropTypes.func,
        data: React.PropTypes.string,
        prevDisabled: React.PropTypes.bool,
        nextDisabled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            "data-id": "view-header"
        };
    },

    render: function () {
        var prop = this.props;
        var prevClassName = classnames("icon", { disabled: this.props.prevDisabled });
        var nextClassName = classnames("icon", { disabled: this.props.nextDisabled });

        return (
            <div data-id={this.props["data-id"]} className="navigation-wrapper">
                <span onClick={this.props.prevDisabled ? null : prop.onPrev} className={prevClassName} >
                    <i className="fa fa-angle-left icon-left"></i>
                </span>
                <span onClick={prop.onClick} className="navigation-title" >{prop.data}</span>
                <span onClick={this.props.nextDisabled ? null : prop.onNext} className={nextClassName} >
                    <i className="fa fa-angle-right icon-right"></i>
                </span>
            </div>
        );
    }

});
