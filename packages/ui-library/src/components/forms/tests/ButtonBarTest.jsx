
jest.dontMock("../ButtonBar.jsx");
jest.dontMock("../../general/EllipsisLoaderButton.jsx");


describe("ButtonBar", function () {

    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ButtonBar = require("../ButtonBar.jsx"),
        _ = require("underscore");

    var componentId = "buttonbar",
        saveText = "Save",
        cancelText = "Cancel",
        discardText = "Discard";


    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId,
            cancelText: cancelText,
            discardText: discardText,
            onSave: jest.genMockFunction(),
            saveText: saveText
        });
        return ReactTestUtils.renderIntoDocument(<ButtonBar {...opts} />);
    }

    function getSaveButton (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-save");
    }

    function getCancelButton (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-cancel");
    }

    function getDiscardButton (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-discard");
    }


    it("Renders all buttons when optional callbacks are provided", function () {
        var component = getComponent({
                onCancel: jest.genMockFunction(),
                onDiscard: jest.genMockFunction()
            }),
            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        expect(saveBtn).toBeTruthy();
        expect(cancelBtn).toBeTruthy();
        expect(discardBtn).toBeTruthy();

        expect(saveBtn.textContent).toEqual(saveText);
        expect(cancelBtn.textContent).toEqual(cancelText);
        expect(discardBtn.textContent).toEqual(discardText);
    });

    it("Renders only save button when the optional button texts and callbacks are not provided", function () {
        var component = getComponent({
                cancelText: null,
                discardText: null
            }),
            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        expect(saveBtn).toBeTruthy();
        expect(cancelBtn).toBeFalsy();
        expect(discardBtn).toBeFalsy();
    });

    it("Renders only save button when optional button texts are provided but the callbacks are not", function () {
        var component = getComponent(),
            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        expect(saveBtn).toBeTruthy();
        expect(cancelBtn).toBeFalsy();
        expect(discardBtn).toBeFalsy();
    });

    it("Renders only save button when optional callbacks are provided but the text is not", function () {
        var component = getComponent({
                onCancel: jest.genMockFunction(),
                onDiscard: jest.genMockFunction(),
                cancelText: null,
                discardText: null
            }),
            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        expect(saveBtn).toBeTruthy();
        expect(cancelBtn).toBeFalsy();
        expect(discardBtn).toBeFalsy();
    });

    it("Triggers callbacks when the buttons are clicked", function () {
        var component = getComponent({
                onCancel: jest.genMockFunction(),
                onDiscard: jest.genMockFunction()
            }),
            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        ReactTestUtils.Simulate.click(saveBtn);
        expect(component.props.onSave).toBeCalled();

        ReactTestUtils.Simulate.click(cancelBtn);
        expect(component.props.onCancel).toBeCalled();

        ReactTestUtils.Simulate.click(discardBtn);
        expect(component.props.onDiscard).toBeCalled();
    });

    it("Renders custom css classes when provided", function () {
        var className = "container-class",
            saveClassName = "save-class",
            cancelClassName = "cancel-class",
            discardClassName = "discard-class",

            component = getComponent({
                className: className,
                saveClassName: saveClassName,
                cancelClassName: cancelClassName,
                discardClassName: discardClassName,

                onCancel: jest.genMockFunction(),
                onDiscard: jest.genMockFunction()
            }),

            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        expect(saveBtn.getAttribute("class")).toContain(saveClassName);
        expect(cancelBtn.getAttribute("class")).toContain(cancelClassName);
        expect(discardBtn.getAttribute("class")).toContain(discardClassName);
    });

    it("Renders saving state properly", function () {
        var component = getComponent({
                onCancel: jest.genMockFunction(),
                onDiscard: jest.genMockFunction(),
                enableSavingAnimation: true
            }),
            saveBtn = getSaveButton(component),
            cancelBtn = getCancelButton(component),
            discardBtn = getDiscardButton(component);

        expect(saveBtn.getAttribute("class")).toContain("loading");

        expect(cancelBtn.getAttribute("class")).toContain("disabled");
        expect(cancelBtn.disabled).toBeTruthy();

        expect(discardBtn.getAttribute("class")).toContain("disabled");
        expect(discardBtn.disabled).toBeTruthy();
    });

    it("Hides and shows button bar properly", function () {
        var shownComponent = getComponent({ visible: true }),
            hiddenComponent = getComponent({ visible: false });

        expect(TestUtils.findRenderedDOMNodeWithDataId(shownComponent, componentId).getAttribute("class"))
            .not.toContain("hidden");
        expect(TestUtils.findRenderedDOMNodeWithDataId(hiddenComponent, componentId).getAttribute("class"))
            .toContain("hidden");
    });

    it("Renders child content properly", function () {
        var childId = "my-child-id",
            childText = "my child text",
            childContent = (<span data-id={childId}>{childText}</span>),
            component = getComponent({ children: childContent }),
            renderedChildContent = TestUtils.findRenderedDOMNodeWithDataId(component, childId);

        expect(renderedChildContent).toBeTruthy();
        expect(renderedChildContent.textContent).toEqual(childText);
    });

    it("Disables save button when specified", function () {
        var component = getComponent({ saveDisabled: true }),
            saveBtn = getSaveButton(component);

        expect(saveBtn).toBeTruthy();
        expect(saveBtn.getAttribute("class")).toContain("disabled");
        expect(saveBtn.disabled).toBeTruthy();
    });

});
