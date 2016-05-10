var React = require("react"),
    Utils = require("./Utils.js"),
    deepClone = require("clone");

/*
 * Simple function which just wraps the passed in function in another function
 */
function wrap (fn) {
    return function () {
        return fn.apply(null, arguments);
    };
}

/*
 * Clone React
 */
var PingReact = deepClone(React);

/*
 * Decorate the complex validators that return a validator
 */
["oneOf", "oneOfType", "arrayOf"].forEach(function (type) {
    var validator = PingReact.PropTypes[type];

    PingReact.PropTypes[type] = function () {
        var innerValidator = validator.apply(null, arguments);

        //create a new type checker which will call the original React logic
        var fn = wrap(innerValidator);
        fn.affectsRendering = wrap(innerValidator);
        fn.affectsRendering.affectsRendering = true;

        if (typeof(innerValidator.isRequired) !== "undefined") {
            fn.isRequired = wrap(innerValidator.isRequired);
            fn.isRequired.affectsRendering = wrap(innerValidator.isRequired);
            fn.isRequired.affectsRendering.affectsRendering = true;
        }

        return fn;
    };
});

/*
 * Decorate all proptypes with a affectsRendering attribute that just returns the original function
 */
Object.keys(PingReact.PropTypes).forEach(function (type) {
    PingReact.PropTypes[type].affectsRendering = wrap(React.PropTypes[type]);
    PingReact.PropTypes[type].affectsRendering.affectsRendering = true;

    if (typeof(PingReact.PropTypes[type].isRequired) !== "undefined") {
        PingReact.PropTypes[type].isRequired.affectsRendering = wrap(PingReact.PropTypes[type].isRequired);
        PingReact.PropTypes[type].isRequired.affectsRendering.affectsRendering = true;
    }
});


/*
 * This might seem like a bad idea but between Alex and I (Okhtay), we couldnt really think of any compelling
 * reasons not to wrap the React's native logic.  We always call the original functions but conditionally also
 * insert common logic.  This will be really useful if we want to add default behavior for methods without using
 * mixins.
 */
PingReact.createClass = function (props) {
    /*
     * For each new class tally which properties affect rendering.  If there are none, then the shouldComponentUpdate
     * function will be left alone and not wrapped.
     */
    var renderProps = [];
    for (var k in props.propTypes) {
        if (props.propTypes[k].affectsRendering === true) {
            renderProps.push(k);
        }
    }

    /* If the new class includes a property with the name renderProps, inject a default shouldComponentUpdate function
     * so that every class doesnt have to implement boilerplate code
     */
    if (renderProps.length > 0) {
        //create a reference to the original function
        var shouldComponentUpdate = props.shouldComponentUpdate;

        //wrap the original function in some logic
        props.shouldComponentUpdate = function (newProps, newState) {
            var result = Utils.diffProps(this.props, newProps, renderProps);
            var childResult = shouldComponentUpdate && shouldComponentUpdate.call(this, newProps, newState);

            return !!(result || childResult || (this.state && newState && this.state !== newState));
        };
        props.shouldComponentUpdate.renderProps = renderProps;
    }

    return React.createClass(props);
};

module.exports = PingReact;
