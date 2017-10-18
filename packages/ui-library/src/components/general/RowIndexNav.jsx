/* istanbul ignore next */

"use strict";

var React = require("react"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames");


/**
 * @callback RowIndexNav~onClick
 *
 * @param {string|number} selectedIndex
 *     The value of the index selected
 */

 /**
  * @class RowIndexNav
  *
  * @desc A menu used to navigate ExpanableRow results based on a specified index (usually letters).
  *
  * @param {array} [activeIndexes]
  *    An array of the active/clickable index navigation items.
  * @param {string|number} [height]
  *    An optional way to set the height of the index nav.
  * @param {string|number} [index]
  *    An optional way to set the height of the index nav.
  * @param {string} [className]
  *    An optional CSS classes to set on the top-level HTML container.
  * @param {array} [indexes=[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z]]
  *    An array of the all index navigation items.
  * @param {RowIndexNav~onClick} [onClick]
  *    The callback to be triggered when a nav item is selected
  * @param {string|number} [selectedIndex]
  *    The value of the menu item to render as selected
  */


var RowIndexNavItem = React.createClass({
    propTypes: {
        active: React.PropTypes.bool,
        index: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        onClick: React.PropTypes.func,
        selected: React.PropTypes.bool
    },

    _handleOnClick: function () {
        if (this.props.active) {
            this.props.onClick(this.props.index);
        }
    },

    render: function () {
        var classNames = classnames({
            selected: this.props.selected,
            disabled: !this.props.active
        });
        return (
            <li className={classNames}
                onClick={this._handleOnClick}>
                {this.props.index}
            </li>
        );
    }
});

var RowIndexNav = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        activeIndexes: React.PropTypes.array,
        className: React.PropTypes.string,
        height: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        indexes: React.PropTypes.array,
        onClick: React.PropTypes.func,
        selectedIndex: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
    },

    getDefaultProps: function () {
        return {
            activeIndexes: [],
            "data-id": "row-index-nav",
            indexes: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
        };
    },

    _renderIndexes: function () {
        return this.props.indexes.map(function (index) {
            return (
                <RowIndexNavItem
                    key={index}
                    active={Array.isArray(this.props.activeIndexes)
                        ? this.props.activeIndexes.indexOf(index) > -1 : false}
                    index={index}
                    onClick={this.props.onClick}
                    selected={this.props.selectedIndex === index}
                />
            );
        }.bind(this));
    },

    _itemInView: function (parent, child) {
        var parentHeight = parent.getBoundingClientRect().height,
            parentScrollTop = parent.scrollTop,
            childHeight = child.getBoundingClientRect().height,
            childTop = child.offsetTop;

        if (childTop < parentScrollTop || (childTop + childHeight) > (parentScrollTop + parentHeight)) {
            return false;
        } else {
            return true;
        }
    },

    _scrollIntoView: function (parent, child, iteration) {
        var parentScrollTop = parent.scrollTop,
            maxScroll = parent.scrollHeight - parent.getBoundingClientRect().height,
            childTop = child.offsetTop,
            incrementBase = maxScroll < childTop ? maxScroll : childTop,
            increment = (incrementBase - parentScrollTop) / 3;

        // scroll the parent 1/3 the remaining distance
        increment = increment < 0 ? Math.floor(increment) : Math.ceil(increment);
        parent.scrollTop = parentScrollTop + increment;

        // call the next scroll action if the target has not yet been reached
        if ((iteration === 1 || parentScrollTop < maxScroll) && parentScrollTop !== childTop && iteration < 15 ) {
            window.clearTimeout(this.scroller); // clear the timeout in case the previous has not finished

            this.scroller = window.setTimeout(function () {
                this._scrollIntoView(parent, child, iteration + 1);
            }.bind(this), 30);
        }
    },

    componentDidUpdate: function (prevProps) {
        var scroller = ReactDOM.findDOMNode(this.scroller),
            selected = document.getElementsByClassName("selected")[0];

        // if the selected index is out of view then initiate scroller
        if (prevProps.selectedIndex !== this.props.selectedIndex && !this._itemInView(scroller, selected)) {
            this._scrollIntoView(scroller, selected, 1);
        }
    },

    render: function () {
        var self = this,
            style = this.props.height ? { height: this.props.height } : null;

        return (
            <div
                ref={function (nav) { self.nav = nav; }}
                className={classnames("row-index-nav", this.props.className)}
                data-id={this.props["data-id"]}>
                <ul data-id={this.props["data-id"]}
                    className="row-index-nav-items"
                    ref={function (scroller) { self.scroller = scroller; }}
                    style={style}>
                    {this._renderIndexes()}
                </ul>
            </div>
        );
    }
});

module.exports = RowIndexNav;
