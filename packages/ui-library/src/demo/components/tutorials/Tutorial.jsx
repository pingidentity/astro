var React = require("react"),
    ReactDOM = require("react-dom");

var Tutorial = React.createClass({
    _scrollIntoView: function (i) {
        var container = ReactDOM.findDOMNode(this.refs.container);

        //get the h3 specified by i and scroll it into view
        var h3 = Array.prototype.slice.call(container.getElementsByTagName("h3")).filter(function (el) {
            return el.parentNode === container;
        })[i];

        if (h3 && h3.scrollIntoView) {
            h3.scrollIntoView();
        }
    },

    _generateTOC: function () {
        var links = React.Children.toArray(this.props.children).filter(function (el) {
            return el.type === "h3";
        }).map(function (el, i) {
            return (
                <li key={i}>
                    <a onClick={this._scrollIntoView.bind(null, i)}>{el.props.children}</a>
                </li>
            );
        }.bind(this));

        return (
            <div className="table-of-contents">
                <h3>Table of contents:</h3>
                <ul>{links}</ul>
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
