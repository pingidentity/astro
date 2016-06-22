var React = require("react"),
    ReactDOM = require("react-dom");

var Tutorial = React.createClass({
    _scrollIntoView: function (i) {
        var container = ReactDOM.findDOMNode(this.refs.container);

        //get the h2 specified by i and scroll it into view
        var h2 = Array.prototype.slice.call(container.getElementsByTagName("h2")).filter(function (el) {
            return el.parentNode === container;
        })[i];

        if (h2 && h2.scrollIntoView) {
            h2.scrollIntoView();
        }
    },

    _generateTOC: function () {
        var links = React.Children.toArray(this.props.children).filter(function (el) {
            return el.type === "h2";
        }).map(function (el, i) {
            return (
                <li key={i}>
                    <a onClick={this._scrollIntoView.bind(null, i)}>{el.props.children}</a>
                </li>
            );
        }.bind(this));

        return (
            <div className="table-of-contents">
                <ul className="ul">{links}</ul>
            </div>
        );
    },

    render: function () {
        return (
            <div className="tutorial" ref="container">
                {this.props.generateTOC ? this._generateTOC() : ""}
                {this.props.children}
            </div>
        );
    }
});

module.exports = Tutorial;
