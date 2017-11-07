var PropTypes = require("prop-types");
var React = require("react");
var classnames = require("classnames");

module.exports = class extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        onNext: PropTypes.func,
        onPrev: PropTypes.func,
        onClick: PropTypes.func,
        data: PropTypes.string,
        prevDisabled: PropTypes.bool,
        nextDisabled: PropTypes.bool
    };

    static defaultProps = {
        "data-id": "view-header"
    };

    render() {
        var prop = this.props;
        var prevClassName = classnames("icon", { disabled: this.props.prevDisabled });
        var nextClassName = classnames("icon", { disabled: this.props.nextDisabled });

        return (
            <div data-id={this.props["data-id"]} className="navigation-wrapper">
                <span onClick={this.props.prevDisabled ? null : prop.onPrev} className={prevClassName} >
                    <i className="fa fa-angle-left icon-left" data-id="calendar-nav-icon-left"></i>
                </span>
                <span onClick={prop.onClick} className="navigation-title" >{prop.data}</span>
                <span onClick={this.props.nextDisabled ? null : prop.onNext} className={nextClassName} >
                    <i className="fa fa-angle-right icon-right" data-id="calendar-nav-icon-right"></i>
                </span>
            </div>
        );
    }
};
