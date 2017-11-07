window.__DEV__ = true;

jest.dontMock("./commonTests.jsx");
jest.dontMock("../v2.jsx");


describe("ContextCloseButton", function () {
    var PropTypes = require("prop-types");
    var React = require("react");
    var ReactTestUtils = require("react-dom/test-utils");
    var TestUtils = require("../../../../testutil/TestUtils");
    var ContextCloseButton = require("../v2.jsx"),
        CommonTests = require("./commonTests.jsx"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
        });

        return ReactTestUtils.renderIntoDocument(<ContextCloseButton {...opts} />);
    }

    CommonTests(getComponent);

    class ContextComponent extends React.Component {
        static propTypes = {
            closeCallback: PropTypes.func,
            clickCallback: PropTypes.func
        };

        static childContextTypes = {
            close: PropTypes.func
        };

        getChildContext() {
            return {
                close: this._close
            };
        }

        _close = () => {
            if (this.props.closeCallback) {
                this.props.closeCallback();
            }
        };

        render() {
            return (<ContextCloseButton onClick={this.props.clickCallback}/>);
        }
    }

    it("Render and click with callback only and no context", function () {
        var clickCallback = jest.genMockFn();
        var component = ReactTestUtils.renderIntoDocument(
            <ContextCloseButton onClick={clickCallback} />
        );

        // Expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithTag(component, "button");

        expect(clickCallback.mock.calls.length).toBe(0);

        // Click the button
        ReactTestUtils.Simulate.click(button);

        expect(clickCallback.mock.calls.length).toBe(1);
    });

    /*
     * Test to ensure that the close function in the context
     * is called when the button is clicked.
     */
    it("Render and click with context and no callback", function () {
        var closeCallback = jest.genMockFn();
        var component = ReactTestUtils.renderIntoDocument(
            <ContextComponent closeCallback={closeCallback} />
        );

        // Expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithTag(component, "button");

        expect(closeCallback.mock.calls.length).toBe(0);

        // Click the button
        ReactTestUtils.Simulate.click(button);

        expect(closeCallback.mock.calls.length).toBe(1);
    });

    /*
     * Test to ensure that the onClick callback and close function in the context
     * are both called when the button is clicked.
     */
    it("Render and click with callback and context", function () {
        var clickCallback = jest.genMockFn();
        var closeCallback = jest.genMockFn();
        var component = ReactTestUtils.renderIntoDocument(
            <ContextComponent closeCallback={closeCallback} clickCallback={clickCallback} />
        );

        // Expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithTag(component, "button");

        expect(clickCallback.mock.calls.length).toBe(0);
        expect(closeCallback.mock.calls.length).toBe(0);

        // Click the button
        ReactTestUtils.Simulate.click(button);

        expect(closeCallback.mock.calls.length).toBe(1);
        expect(clickCallback.mock.calls.length).toBe(1);
    });

    it("render component with data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <ContextCloseButton data-id="buttonWithDataId" value="ButtonWithDataId" />
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "buttonWithDataId");

        expect(element).toBeDefined();
    });

    it("render component with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <ContextCloseButton value="ButtonWithDataId" />
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "context-close-button");

        expect(element).toBeDefined();
    });
});
