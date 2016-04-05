window.__DEV__ = true;

jest.dontMock("../HistoryWriter.jsx");
jest.dontMock("../../../util/ReduxTestUtils.js");
jest.dontMock("../../../util/ReduxUtils.js");

describe("HistoryWriter", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        ReduxTestUtils = require("../../../util/ReduxTestUtils.js"),
        HistoryWriter = require("../HistoryWriter.jsx"),
        _ = require("underscore");

    function getWrappedComponent (opts) {
        opts = _.defaults(opts || {}, {
            watch: ["a"],
            onReplaceUrl: jest.genMockFunction(),
            location: { pathname: "blah" }
        });

        return ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={HistoryWriter} opts={opts} />);
    }

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            watch: ["a", "c"],
            onReplaceUrl: jest.genMockFunction(),
            location: { pathname: "blah" }
        });

        return ReactTestUtils.renderIntoDocument(<HistoryWriter {...opts} />);
    }

    it("gets value at path", function () {
        var component = getComponent();
        var data = { a: 1, b: 2, c: { d: 3, e: false } };

        expect(component._get(data, "a")).toEqual(1);
        expect(component._get(data, "c")).toEqual(data.c);
        expect(component._get(data, "c.e")).toEqual(data.c.e);
    });

    it("ignores changed props that are not watched", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;
        var data = { a: 1, b: 2, c: { d: 3, e: false } };

        //callback get executed the first time
        wrapper.sendProps(data);
        expect(component.props.onReplaceUrl).toBeCalledWith("blah?a=1");

        //now change an unwatched prop
        component.props.onReplaceUrl.mockClear();
        wrapper.sendProps({ b: 3 });
        expect(component.props.onReplaceUrl).not.toBeCalled();
    });

    it("updates url when watched prop changes", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;
        var data = { a: 1, b: 2, c: { d: 3, e: false } };

        //callback get executed the first time
        wrapper.sendProps(data);
        expect(component.props.onReplaceUrl).toBeCalledWith("blah?a=1");

        //now change a to something else
        wrapper.sendProps({ a: 2 });
        expect(component.props.onReplaceUrl).toBeCalledWith("blah?a=2");
    });

    it("watches an object", function () {
        var wrapper = getWrappedComponent({ watch: ["c"] });
        var component = wrapper.refs.target;
        var data = { a: 1, b: 2, c: { d: 3, e: false } };

        //callback get executed the first time
        wrapper.sendProps(data);
        expect(component.props.onReplaceUrl).toBeCalledWith("blah?c.d=3&c.e=false");
    });

    it("watched keys change", function () {
        var wrapper = getWrappedComponent({ watch: ["c"] });
        var component = wrapper.refs.target;
        var data = { a: 1, b: 2, c: { d: 3, e: false } };

        //watch "c"
        wrapper.sendProps(data);
        expect(component.props.onReplaceUrl).toBeCalledWith("blah?c.d=3&c.e=false");

        //now switch and watch "a"
        wrapper.sendProps({ watch: ["a"] });
        expect(component.props.onReplaceUrl).lastCalledWith("blah?a=1");
    });

    it("skips null values", function () {
        var wrapper = getWrappedComponent({ a: 1, b: 2, c: { d: 3, e: false } });
        var component = wrapper.refs.target;

        wrapper.sendProps({ a: null });
        expect(component.props.onReplaceUrl).lastCalledWith("blah?");
    });

    it("pulls object from query string", function () {
        var location = { query: { "initialItem.batch": 1, "initialItem.index": 3, initialItem: 5 } };

        expect(HistoryWriter.getObjFromQuery(location, "initialItem")).toEqual({ batch: 1, index: 3 });
    });

    it("pulls number from query string", function () {
        var location = { query: { "initialItem.batch": 1, "initialItem.index": 3, initialItem: "5" } };

        expect(HistoryWriter.getNumFromQuery(location, "initialItem")).toBe(5);
    });
});
