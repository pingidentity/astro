window.__DEV__ = true;

jest.dontMock("../Spinner.jsx");

describe("Spinner", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Spinner = require("../Spinner.jsx"),
        defaultText = "Loading...";


    it("is rendering spinning animation", function () {
        var component = ReactTestUtils.renderIntoDocument(
                <Spinner
                    show={true}
                    defaultText={defaultText}>
                    <div className="spinner-content">
                        whatever
                    </div>
                </Spinner>
            );

        var content = TestUtils.scryRenderedDOMNodesWithClass(component, "spinner-content");
        expect(content.length).toBe(0);

        var spinner = TestUtils.findRenderedDOMNodeWithClass(component, "spinner");
        expect(spinner.textContent).toBe(defaultText);
    });

    it("is rendering child content", function () {
        var component = ReactTestUtils.renderIntoDocument(
                <Spinner
                    show={false}
                    defaultText={defaultText}>
                    <div className="spinner-content">
                        whatever
                    </div>
                </Spinner>
            );

        var content = TestUtils.findRenderedDOMNodeWithClass(component, "spinner-content");
        expect(content.textContent).toBe("whatever");

        var spinner = TestUtils.scryRenderedDOMNodesWithClass(component, "spinner");
        expect(spinner.length).toBe(0);
    });
});
