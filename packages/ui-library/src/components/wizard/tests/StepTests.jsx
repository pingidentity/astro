window.__DEV__ = true;

jest.dontMock("../Step.jsx");
jest.dontMock("../../../util/format.js");

describe("Step", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Step = require("../Step.jsx"),
        assign = require("object-assign");

    beforeEach(function () {
    });

    function getRenderedComponent (opts) {
        var defaults = {
            active: true,
            number: 1,
            total: 2,
            onNext: jest.genMockFunction(),
            onEdit: jest.genMockFunction(),
            labelNext: "xxxnext",
            labelCancel: "xxxcancel",
            labelEdit: "xxxedit"
        };

        return ReactTestUtils.renderIntoDocument(
            <Step {...assign(defaults, opts)}>
                <div className="childNode"><span>Hello</span><span>World</span></div>
            </Step>
        );
    }

    it("Specifies button labels", function () {
        var component = getRenderedComponent({ isModal: false });

        expect(ReactDOM.findDOMNode(component.refs.nextButton).value).toBe("xxxnext");
        expect(ReactDOM.findDOMNode(component.refs.cancelButton).value).toBe("xxxcancel");

        component = getRenderedComponent({ active: false });
        expect(ReactDOM.findDOMNode(component.refs.editButton).textContent).toBe("xxxedit");
    });

    it("Next button executes callback", function () {
        var component = getRenderedComponent();

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.nextButton));

        expect(component.props.onNext.mock.calls.length).toBe(1);
        expect(component.props.onEdit.mock.calls.length).toBe(0);
    });

    it("Edit button executes callback", function () {
        var component = getRenderedComponent({ active: false });

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.editButton));

        expect(component.props.onNext.mock.calls.length).toBe(0);
        expect(component.props.onEdit.mock.calls.length).toBe(1);
    });

    it("Disabled navigation", function () {
        var component = getRenderedComponent({ disableNavigation: true });

        expect(component.refs.nextButton).toBeFalsy();
        expect(component.refs.cancelButton).toBeFalsy();
        expect(component.refs.editButton).toBeFalsy();
    });

    it("Inactive step is collapsed", function () {
        var component = getRenderedComponent({ active: false });

        expect(component.refs.nextButton).toBeFalsy();
        expect(component.refs.cancelButton).toBeFalsy();
        expect(component.refs.editButton).toBeTruthy();

        expect(TestUtils.scryRenderedDOMNodesWithClass(component, "childNode").length).toBe(0);
    });

    it("Active step is expanded", function () {
        var component = getRenderedComponent();

        expect(component.refs.nextButton).toBeTruthy();
        expect(component.refs.cancelButton).toBeTruthy();
        expect(component.refs.editButton).toBeFalsy();

        expect(TestUtils.scryRenderedDOMNodesWithClass(component, "childNode").length).toBe(1);
    });

    it("Hide cancel button", function () {
        var component = getRenderedComponent({ hideCancel: true });

        expect(component.refs.nextButton).toBeTruthy();
        expect(component.refs.cancelButton).toBeFalsy();
        expect(component.refs.editButton).toBeFalsy();
    });

    it("Hide edit link", function () {
        var component = getRenderedComponent({ active: false, showEdit: false });

        expect(component.refs.nextButton).toBeFalsy();
        expect(component.refs.cancelButton).toBeFalsy();
        expect(component.refs.editButton).toBeFalsy();
    });
});
