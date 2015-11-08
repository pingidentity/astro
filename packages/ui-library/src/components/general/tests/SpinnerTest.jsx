window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../Spinner.jsx");

describe("Spinner", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        Spinner = require("../Spinner.jsx"),
        defaultText = "Loading...";


    it("is rendering spinning animation", function () {
        var component = ReactTestUtils.renderIntoDocument(
                /* jshint ignore:start */
                <Spinner
                    show={true}
                    defaultText={defaultText}>
                    <div className="spinner-content">
                        whatever
                    </div>
                </Spinner>
                /* jshint ignore:end */
            );

        var content = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "spinner-content");
        expect(content.length).toBe(0);

        var spinner = ReactTestUtils.findRenderedDOMComponentWithClass(component, "spinner");
        expect(spinner.getDOMNode().textContent).toBe(defaultText);
    });

    it("is rendering child content", function () {
        var component = ReactTestUtils.renderIntoDocument(
                /* jshint ignore:start */
                <Spinner
                    show={false}
                    defaultText={defaultText}>
                    <div className="spinner-content">
                        whatever
                    </div>
                </Spinner>
                /* jshint ignore:end */
            );

        var content = ReactTestUtils.findRenderedDOMComponentWithClass(component, "spinner-content");
        expect(content.getDOMNode().textContent).toBe("whatever");

        var spinner = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "spinner");
        expect(spinner.length).toBe(0);
    });
});
