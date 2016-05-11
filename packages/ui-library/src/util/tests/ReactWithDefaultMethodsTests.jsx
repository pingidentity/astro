window.__DEV__ = true;

jest.dontMock("../ReactWithDefaultMethods");
jest.dontMock("../ReduxTestUtils");

describe("PropTypes", function () {
    var React = require("../ReactWithDefaultMethods"),
        ReactTestUtils = require("react-addons-test-utils"),
        ReduxTestUtils = require("../ReduxTestUtils"),
        _ = require("underscore");

    function getWrappedComponent (opts) {
        opts = _.defaults(opts || {}, {
            prop1: "1",
            prop2: "2",
            prop3: {},
            prop4: 4
        });

        var Klass = React.createClass({
            propTypes: {
                prop1: React.PropTypes.string.isRequired.affectsRendering,
                prop2: React.PropTypes.string.isRequired,
                prop3: React.PropTypes.object.affectsRendering,
                prop4: React.PropTypes.number
            },

            shouldComponentUpdate: opts.shouldComponentUpdate,

            render: function () {
                return <div />;
            }
        });

        return ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={Klass} opts={opts} />);
    }

    it("oneOfType validator", function () {
        var validator = React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]);

        //array should not match the condition
        expect(_.isError(validator({ someProp: [] }, "someProp", "my comp"))).toBe(true);

        //string or number do
        expect(validator({ someProp: 1 }, "someProp", "my comp")).toBeFalsy();
        expect(validator({ someProp: "one" }, "someProp", "my comp")).toBeFalsy();

        //null should be okay too
        expect(validator({}, "someProp", "my comp")).toBeFalsy();
    });

    it("isRequired", function () {
        var validator = React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired;

        //array should not match the condition
        expect(_.isError(validator({ someProp: [] }, "someProp", "my comp"))).toBe(true);

        //string or number do
        expect(validator({ someProp: 1 }, "someProp", "my comp")).toBeFalsy();
        expect(validator({ someProp: "one" }, "someProp", "my comp")).toBeFalsy();

        //null should NOT be okay
        expect(_.isError(validator({}, "someProp", "my comp"))).toBe(true);
    });

    it("affectsRendering", function () {
        var validator = React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).affectsRendering;

        //array should not match the condition
        expect(_.isError(validator({ someProp: [] }, "someProp", "my comp"))).toBe(true);

        //string or number do
        expect(validator({ someProp: 1 }, "someProp", "my comp")).toBeFalsy();
        expect(validator({ someProp: "one" }, "someProp", "my comp")).toBeFalsy();

        //null should be okay too
        expect(validator({}, "someProp", "my comp")).toBeFalsy();
    });

    it("isRequired.affectsRendering", function () {
        var validator = React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]).isRequired.affectsRendering;

        //array should not match the condition
        expect(_.isError(validator({ someProp: [] }, "someProp", "my comp"))).toBe(true);

        //string or number do
        expect(validator({ someProp: 1 }, "someProp", "my comp")).toBeFalsy();
        expect(validator({ someProp: "one" }, "someProp", "my comp")).toBeFalsy();

        //null should NOT be okay
        expect(_.isError(validator({}, "someProp", "my comp"))).toBe(true);
    });

    it("injects shouldComponentUpdate function", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;

        expect(typeof(component.shouldComponentUpdate)).toBe("function");
    });

    it("doesnt render if props dont change", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;

        expect(component.shouldComponentUpdate.renderProps).toEqual(["prop1", "prop3"]);

        expect(component.shouldComponentUpdate({ prop1: "1", prop2: "3" })).toBeFalsy();
        expect(component.shouldComponentUpdate({ prop1: "2", prop2: "3" })).toBeFalsy();
    });

    it("still calls shouldComponentUpdate if it exists", function () {
        var mock = jest.genMockFunction().mockReturnValue(false);
        var wrapper = getWrappedComponent({ shouldComponentUpdate: mock });

        wrapper.sendProps({ prop1: "1" });

        expect(mock).toBeCalled();
    });

    it("considers state", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;

        component.setState({ a: 1 });

        expect(component.shouldComponentUpdate({ prop1: "1" }, component.state)).toBeFalsy();
        expect(component.shouldComponentUpdate({ prop1: "1" }, { a: 2 })).toBeTruthy();
    });
});
