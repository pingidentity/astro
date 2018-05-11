jest.dontMock("../PolicySettingsList");

describe("PolicySettingsList", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore"),
        PolicySettingsList = require("../PolicySettingsList");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            label: "List",
            character: "?",
            settings: ["First", "Second"],
            fallbackText: "Nothing",
        });
        return ReactTestUtils.renderIntoDocument(<div><PolicySettingsList {...opts} />></div>);
    }
    
    it("renders with one setting", function () {
        const component = getComponent({ settings: ["Just me"] });

        const list = TestUtils.findRenderedDOMNodeWithDataId(component, "policy-node");
        expect(list).toBeTruthy();
    });
    
    it("renders with no settings", function () {
        const component = getComponent({ settings: [] });

        const fallbackText = TestUtils.findRenderedDOMNodeWithClass(component, "text-value");
        expect(fallbackText).toBeTruthy();
    });
    
    it("renders with multiple settings", function () {
        const component = getComponent();

        const list = TestUtils.findRenderedDOMNodeWithDataId(component, "policy-node");
        expect(list).toBeTruthy();

        const indent = TestUtils.findRenderedDOMNodeWithDataId(component, "indent");
        expect(indent).toBeTruthy();
    });
});
