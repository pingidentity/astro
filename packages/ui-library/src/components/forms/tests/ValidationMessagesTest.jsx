window.__DEV__ = true;

jest.dontMock("../ValidationMessages");

describe("ValidationMessages", function () {

    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ValidationMessages = require("../ValidationMessages"),
        _ = require("underscore"),
        messages = [
            { text: "At least 6 characters", status: ValidationMessages.Status.FAIL },
            { text: "1 number", status: ValidationMessages.Status.PASS },
            { text: "1 UPPERCASE letter", status: ValidationMessages.Status.PASS }
        ];

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            messages: messages
        });
        return ReactTestUtils.renderIntoDocument(<div><ValidationMessages {...opts} /></div>);
    }

    it("renders the component", function () {
        var component = getComponent({ className: "show", messages: messages });

        expect(ReactTestUtils.isDOMComponent(component)).toBeDefined();
    });

    it("renders messages with icons", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <div><ValidationMessages className="show"messages={ messages } /></div>
        );

        // Expect one validation tooltip to be rendered with one fail message.
        const fail = TestUtils.scryRenderedDOMNodesWithClass(component, "status-indicator--icon__empty");
        expect(fail.length).toEqual(1);

        // Expect a validation tooltip to be rendered with two pass messages.
        const success = TestUtils.scryRenderedDOMNodesWithClass(component, "status-indicator--icon__success");
        expect(success.length).toEqual(2);
    });
});
