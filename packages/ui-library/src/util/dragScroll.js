"use strict";

var _ = require("underscore");

var SCROLL_AXIS = {
    X: "X",
    Y: "Y",
};

/**
 * @alias module:util/dragScroll.canScroll
 * @desc Method to determine if an element has the ability to scroll along a specific axis and has overflowing content on that axis
 *
 * @returns {boolean}
 *     Returns true if can scroll and overflowing content
 */

var canScroll = function (element, axis) {
    var style = getComputedStyle(element);
    var hasOverflow = false;
    var hasProperty = false;

    //see if style property is set
    if (style["overflow" + axis] === "auto" || style["overflow" + axis] === "scroll") {
        hasProperty = true;
    }
    //see if overflows container
    var overflowProp = axis === SCROLL_AXIS.X ? "Width" : "Height";
    hasOverflow = element["scroll" + overflowProp] > element["client" + overflowProp];

    return hasProperty && hasOverflow;
};

/**
 * @alias module:util/dragScroll.getScrollFunction
 * @desc Gets a repeating scroll function based on the element, axis and
 *
 * @returns {function}
 *     Returns function that changes element's scroll direction;
 */

var getScrollFunction = function (element, axis, direction, distance) {
    var elProp = axis === SCROLL_AXIS.X ? "scrollLeft" : "scrollTop";
    return function () {
        element[elProp] = element[elProp] + direction * distance;
    };
};

/**
 * @alias module:util/dragScroll.findScrollParent
 * @desc Finds the nearest parent that canScroll based on axis
 *
 * @returns {element}
 *     returns scrollable parent element or undefined if none available for axis
 */

var findScrollParent = function (element, axis) {
    if (element === document.documentElement || element === Window) {
        return null;
    }
    if ( element === document.body) {
        return canScroll(element, axis) ? element : undefined;
    }

    if (!canScroll(element.parentNode, axis)) {
        return findScrollParent(element.parentNode, axis);
    }
    return element.parentNode;
};

var getScrollParents = function (element, e, buffer) {
    var parent = {};
    var pX = findScrollParent(element, SCROLL_AXIS.X);
    var pY = findScrollParent(element, SCROLL_AXIS.Y);

    var dX;
    var dY;

    if (pX) {
        dX = getScrollDirection(pX, SCROLL_AXIS.X, e, buffer);
        parent.X = {
            element: pX,
            direction: dX,
        };
    }

    if (pY) {
        dY = getScrollDirection(pY, SCROLL_AXIS.Y, e, buffer);
        parent.Y = {
            element: pY,
            direction: dY,
        };
    }

    return parent;
};

var getScrollDirection = function (element, axis, e, buffer) {
    var edge1 = axis === SCROLL_AXIS.X ? "left" : "top";
    var edge2 = axis === SCROLL_AXIS.X ? "right" : "bottom";
    var rect = element.getBoundingClientRect();
    var client = e["client" + axis];

    if (client < rect[edge1] + buffer) {
        return -1;
    } else if (client > rect[edge2] - buffer) {
        return 1;
    } else {
        return null;
    }
};

var scrollParent = {};
var scrollInterval = {};

var opts = {
    BUFFER: 50,
    DRAGDELAY: 300,
    SCROLLDELAY: 10,
    SCROLLPIXELS: 5,
};

var onDragOver = function (e) {
    var newParent = getScrollParents(e.target, e, opts.BUFFER);

    for (var axis in newParent) {
        var element = newParent[axis].element;
        var direction = newParent[axis].direction;

        //if parent and direction are the same, do nothing
        if (scrollParent[axis]) {
            if (element === scrollParent[axis].element && direction === scrollParent[axis].direction) {
                return;
            }
        }
        //clear exisiting interval
        clearScroll(axis);
        //set the global parent and interval variables
        scrollParent[axis] = newParent[axis];
        //set new scroll interval if there is a direction

        scrollInterval[axis] = direction
            ? setInterval(getScrollFunction(scrollParent[axis].element, axis, direction, opts.SCROLLPIXELS),opts.SCROLLDELAY) //eslint-disable-line
            : undefined;
    }
};

var clearScroll = function (axis) {
    clearInterval(scrollInterval[axis]);
    scrollInterval[axis] = null;
};

var start = function () {
    window.addEventListener("dragover", _.throttle(onDragOver, opts.DRAGDELAY, { trailing: false }));
};

var end = function () {
    window.removeEventListener("dragover", _.throttle(onDragOver, opts.DRAGDELAY, { trailing: false }));
    clearScroll(SCROLL_AXIS.X);
    clearScroll(SCROLL_AXIS.Y);
};

module.exports = {
    start: start,
    end: end,
    onDragOver: onDragOver,
    clearScroll: clearScroll,
    canScroll: canScroll,
    opts: opts,
    getScrollDirection: getScrollDirection,
    findScrollParent: findScrollParent,
    getScrollFunction: getScrollFunction,
    getScrollParents: getScrollParents,
};
