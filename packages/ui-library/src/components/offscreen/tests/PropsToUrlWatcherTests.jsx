window.__DEV__ = true;

jest.dontMock("../PropsToUrlWatcher.jsx");
jest.dontMock("../../../util/ReduxTestUtils.js");

describe("HistoryWriter", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        ReduxTestUtils = require("../../../util/ReduxTestUtils.js"),
        PropsToUrlWatcher = require("../PropsToUrlWatcher.jsx"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore");

    function getWrappedComponent (opts) {
        opts = _.defaults(opts || {}, {
            watch: { prop1: "a" },
            onReplaceUrl: jest.genMockFunction(),
            location: { pathname: "blah" }
        });

        return ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={PropsToUrlWatcher} opts={opts} />);
    }

    it("updates url when watched prop changes", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;

        //callback get executed the first time
        wrapper.sendProps({ watch: { prop1: "c" } });
        expect(component.props.onReplaceUrl).toBeCalledWith("blah?prop1=c");

        //now change a to something else
        wrapper.sendProps({ watch: { prop1: 2 } });
        expect(component.props.onReplaceUrl).toBeCalledWith("blah?prop1=2");
    });

    it("watches an object", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;

        //callback get executed the first time
        wrapper.sendProps({ watch: { prop1: { d: 3, e: false } } });
        expect(component.props.onReplaceUrl).toBeCalledWith("blah?prop1.d=3&prop1.e=false");
    });

    it("skips null values", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;

        wrapper.sendProps({ watch: { prop1: null } });
        expect(component.props.onReplaceUrl).lastCalledWith("blah?");
    });

    it("do nothing if watched props are unchanged", function () {
        var wrapper = getWrappedComponent({ ignoreFalse: true });
        var component = wrapper.refs.target;

        component.props.onReplaceUrl.mockClear();

        wrapper.sendProps({ props1: "a" });

        expect(component.props.onReplaceUrl).not.toBeCalled();
    });

    it("watches an array", function () {
        var wrapper = getWrappedComponent({ ignoreFalse: true });
        var component = wrapper.refs.target;

        wrapper.sendProps({ watch: { prop1: ["a", "c"] } });
        expect(component.props.onReplaceUrl).lastCalledWith("blah?prop1=a,c");
    });

    it("throws an exception when prop is hash of hashes", function () {
        var wrapper = getWrappedComponent({ ignoreFalse: true });

        try {
            wrapper.sendProps({ watch: { prop1: { a: { b: 1 } } } });
            expect(false); //should have thrown an error!!
        } catch (e) {
            expect(e).toEqual("cannot watch a key which maps to an hash of hashes");
        }
    });

    it("skips false values", function () {
        var wrapper = getWrappedComponent({ ignoreFalse: true });
        var component = wrapper.refs.target;

        wrapper.sendProps({ watch: { prop1: true, prop2: false } });
        expect(component.props.onReplaceUrl).lastCalledWith("blah?prop1=true");

        wrapper.sendProps({ ignoreFalse: false });
        expect(component.props.onReplaceUrl).lastCalledWith("blah?prop1=true&prop2=false");
    });

    it("skips false of watched object", function () {
        var wrapper = getWrappedComponent({ ignoreFalse: true });
        var component = wrapper.refs.target;

        wrapper.sendProps({ watch: { prop1: { a: 1, b: false } } });
        expect(component.props.onReplaceUrl).lastCalledWith("blah?prop1.a=1");
    });

    it("pulls bool from query string", function () {
        var location = { query: { yes: "true", no: "false" } };

        expect(PropsToUrlWatcher.getBool(location, "yes")).toBe(true);
        expect(PropsToUrlWatcher.getBool(location, "no")).toBe(false);
    });

    it("pulls array from query string", function () {
        var location = { query: { myArray: "1,2,3,abc" } };

        expect(PropsToUrlWatcher.getArray(location, "myArray")).toEqual(["1", "2", "3", "abc"]);
    });

    it("pulls object from query string", function () {
        var location = { query: { "initialItem.batch": 1, "initialItem.index": 3, initialItem: 5 } };

        expect(PropsToUrlWatcher.getObj(location, "initialItem")).toEqual({ batch: 1, index: 3 });
    });

    it("pulls number from query string", function () {
        var location = { query: { "initialItem.batch": 1, "initialItem.index": 3, initialItem: "5" } };

        expect(PropsToUrlWatcher.getNum(location, "initialItem")).toBe(5);
    });

    it("verify default data-id", function () {
        var wrapper = getWrappedComponent();
        var test = TestUtils.findRenderedDOMNodeWithDataId(wrapper, "props-to-url-watcher");
        expect(test).toBeTruthy();
    });
});
