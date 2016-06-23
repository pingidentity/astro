window.__DEV__ = true;

jest.dontMock("../Step.jsx");
jest.dontMock("../Wizard.jsx");
jest.dontMock("../../../util/format.js");
jest.dontMock("../../general/EllipsisLoaderButton.jsx");

describe("Step", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        Wizard = require("../Wizard.jsx"),
        Step = Wizard.Step,
        assign = require("object-assign");

    beforeEach(function () {
    });

    function getRenderedComponent (opts) {
        var defaults = {
            title: "My Wizard",
            onNext: jest.genMockFunction(),
            onEdit: jest.genMockFunction(),
            onChange: jest.genMockFunction(),
            onDone: jest.genMockFunction(),
            labelNext: "next",
            labelCancel: "cancel",
            labelEdit: "edit",
            labelDone: "done"
        };

        return ReactTestUtils.renderIntoDocument(
            <Wizard {...assign(defaults, opts)}>
                <Step title="step 1">Step 1</Step>
                <Step title="step 2">Step 2</Step>
                <Step title="step 3">Step 3</Step>
                <Step title="step 4" when={false}>Step 4</Step>
            </Wizard>
        );
    }

    it("Is the root wizard", function () {
        var component = getRenderedComponent();
        var args = component.props.onChange.mock.calls[0];

        //when the root wizard mounts, it should broadcast how many steps it contains to the reducer
        expect(args).toEqual([0, 3]);
    });

    it("Calls onNext when next is clicked", function () {
        var component = getRenderedComponent();

        expect(component.props.onNext.mock.calls.length).toBe(0);

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.step1.refs.nextButton));

        expect(component.props.onNext.mock.calls.length).toBe(1);
    });

    it("Calls onDone when done is clicked", function () {
        var component = getRenderedComponent({ numSteps: 3 , activeStep: 3, showDoneButton: true });

        expect(component.props.onDone.mock.calls.length).toBe(0);

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.step3.refs.doneButton));

        expect(component.props.onDone.mock.calls.length).toBe(1);
    });

    it("Calls onEdit when edit is clicked", function () {
        var component = getRenderedComponent({ activeStep: 2 });

        expect(component.props.onNext.mock.calls.length).toBe(0);
        expect(component.props.onEdit.mock.calls.length).toBe(0);

        ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(component.refs.step1.refs.editButton));

        expect(component.props.onNext.mock.calls.length).toBe(0);
        expect(component.props.onEdit.mock.calls.length).toBe(1);
    });
});
