window.__DEV__ = true;

jest.dontMock("../Step.jsx");
jest.dontMock("../Progress.jsx");
jest.dontMock("../../../util/format.js");
jest.dontMock("../../general/EllipsisLoaderButton.jsx");

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
            onDone: jest.genMockFunction(),
            labelNext: "xxxnext",
            labelCancel: "xxxcancel",
            labelEdit: "xxxedit",
            labelDone: "xxxdone",
            titleSelection: "title selection",
            hintText: "hint"
        };

        return ReactTestUtils.renderIntoDocument(
            <Step {...assign(defaults, opts)}>
                <div className="childNode"><span>Hello</span><span>World</span></div>
            </Step>
        );
    }

    it("Specifies button labels", function () {
        var component = getRenderedComponent({ isModal: false });

        expect(ReactDOM.findDOMNode(component.refs.nextButton).textContent).toBe("xxxnext");
        expect(ReactDOM.findDOMNode(component.refs.cancelButton).value).toBe("xxxcancel");

        component = getRenderedComponent({ active: false });
        expect(ReactDOM.findDOMNode(component.refs.editButton).textContent).toBe("xxxedit");

        component = getRenderedComponent({ active: true, number: 2 });
        expect(ReactDOM.findDOMNode(component.refs.doneButton).textContent).toBe("xxxdone");
    });

    it("Next button executes callback", function () {
        var component = getRenderedComponent({ canProceed: true });

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.nextButton));

        expect(component.props.onNext.mock.calls.length).toBe(1);
        expect(component.props.onEdit.mock.calls.length).toBe(0);
    });

    it("Edit button executes callback", function () {
        var component = getRenderedComponent({ active: false, canProceed: true });

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.editButton));

        expect(component.props.onNext.mock.calls.length).toBe(0);
        expect(component.props.onEdit.mock.calls.length).toBe(1);
    });

    it("Done button executes callback", function () {
        var component = getRenderedComponent({ active: true, number: 2, canProceed: true });

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.doneButton));

        expect(component.props.onDone.mock.calls.length).toBe(1);
        expect(component.props.onEdit.mock.calls.length).toBe(0);
    });

    it("Inactive step is collapsed", function () {
        var component = getRenderedComponent({ active: false , number: 2 });

        expect(component.refs.nextButton).toBeFalsy();
        expect(component.refs.cancelButton).toBeFalsy();
        expect(component.refs.doneButton).toBeFalsy();
        expect(component.refs.editButton).toBeTruthy();

        expect(TestUtils.scryRenderedDOMNodesWithClass(component, "childNode").length).toBe(0);
    });

    it("Active step is expanded", function () {
        var component = getRenderedComponent();

        expect(component.refs.nextButton).toBeTruthy();
        expect(component.refs.doneButton).toBeFalsy();
        expect(component.refs.cancelButton).toBeTruthy();
        expect(component.refs.editButton).toBeFalsy();

        expect(TestUtils.scryRenderedDOMNodesWithClass(component, "childNode").length).toBe(1);

        component = getRenderedComponent({ number: 2 });

        expect(component.refs.nextButton).toBeFalsy();
        expect(component.refs.doneButton).toBeTruthy();
        expect(component.refs.cancelButton).toBeTruthy();
        expect(component.refs.editButton).toBeFalsy();

        expect(TestUtils.scryRenderedDOMNodesWithClass(component, "childNode").length).toBe(1);
    });

    it("Hide cancel button", function () {
        var component = getRenderedComponent({ hideCancel: true });

        expect(component.refs.nextButton).toBeTruthy();
        expect(component.refs.cancelButton).toBeFalsy();
        expect(component.refs.doneButton).toBeFalsy();
        expect(component.refs.editButton).toBeFalsy();

        component = getRenderedComponent({ hideCancel: true, number: 2 });

        expect(component.refs.nextButton).toBeFalsy();
        expect(component.refs.cancelButton).toBeFalsy();
        expect(component.refs.doneButton).toBeTruthy();
        expect(component.refs.editButton).toBeFalsy();
    });

    it("Hide edit link", function () {
        var component = getRenderedComponent({ active: false, showEdit: false });

        expect(component.refs.nextButton).toBeFalsy();
        expect(component.refs.cancelButton).toBeFalsy();
        expect(component.refs.doneButton).toBeFalsy();
        expect(component.refs.editButton).toBeFalsy();
    });

    it("Show edit link", function () {
        var component = getRenderedComponent({ active: false, showEdit: true, renderHidden: true });

        expect(component.refs.editButton).toBeTruthy();
    });

    it("Next, cancel and done button are disabled and next button changes to loading", function () {
        var component = getRenderedComponent({ active: true, number: 2, showPulsing: true });

        expect(component.refs.doneButton.props.disabled).toBeTruthy();
        expect(component.refs.doneButton.props.loading).toBeTruthy();
        expect(component.refs.cancelButton.props.disabled).toBeTruthy();

        component = getRenderedComponent({ showPulsing: true });

        expect(component.refs.nextButton.props.disabled).toBeTruthy();
        expect(component.refs.nextButton.props.loading).toBeTruthy();
        expect(component.refs.cancelButton.props.disabled).toBeTruthy();
    });

});
