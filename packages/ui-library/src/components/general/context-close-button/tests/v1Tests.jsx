window.__DEV__ = true;

jest.dontMock("./common.jsx");
jest.dontMock("../v1.jsx");


describe("ContextCloseButton", function () {
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
    var TestUtils = require("../../../../testutil/TestUtils");
    var ContextCloseButton = require("../v1.jsx"),
        CommonTests = require("./common.jsx"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
        });

        return ReactTestUtils.renderIntoDocument(<ContextCloseButton {...opts} />);
    }

    CommonTests(getComponent);

    var ContextComponent = React.createClass({
        propTypes: {
            clickCallback: React.PropTypes.func,
            closeCallback: React.PropTypes.func
        },

        childContextTypes: {
            close: React.PropTypes.func
        },

        getChildContext: function () {
            return {
                close: this._close
            };
        },
        
        _close: function () {
            if (this.props.closeCallback) {
                this.props.closeCallback();
            }
        },

        render: function () {
            return (
                <ContextCloseButton onClick={this.props.clickCallback} />
            );
        }
    });
    
    it("Render and click with no context", function () {
        var callback = jest.genMockFn();
        var component = ReactTestUtils.renderIntoDocument(
            <ContextCloseButton onClick={callback} />
        );

        // Expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithTag(component, "button");
        
        expect(callback.mock.calls.length).toBe(0);
        
        // Click the button
        ReactTestUtils.Simulate.click(button);
        
        expect(callback.mock.calls.length).toBe(1);
    });
    
    /*
     * Test to ensure that the close function in the context
     * is called when the button is clicked.
     *
     */
    it("Render and click with context", function () {
        var clickCallback = jest.genMockFn();
        var closeCallback = jest.genMockFn();
        var component = ReactTestUtils.renderIntoDocument(
            <ContextComponent clickCallback={clickCallback} closeCallback={closeCallback} />
        );

        // Expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithTag(component, "button");
        
        expect(clickCallback.mock.calls.length).toBe(0);
        expect(closeCallback.mock.calls.length).toBe(0);
        
        // Click the button
        ReactTestUtils.Simulate.click(button);
        
        expect(clickCallback.mock.calls.length).toBe(1);
        expect(closeCallback.mock.calls.length).toBe(1);
        
    });
    
    /*
     * Test to ensure that the close function in the context
     * can be prevented from being called if the onClick function
     * of the button returns false.
     *
     */
    it("onClick function can prevent context close call", function () {
        var clickCallback = jest.genMockFn();
        clickCallback.mockReturnValue(false);
        
        var closeCallback = jest.genMockFn();
        
        var component = ReactTestUtils.renderIntoDocument(
            <ContextComponent clickCallback={clickCallback} closeCallback={closeCallback} />
        );

        // Expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithTag(component, "button");
        
        expect(clickCallback.mock.calls.length).toBe(0);
        expect(closeCallback.mock.calls.length).toBe(0);
        
        // Click the button
        ReactTestUtils.Simulate.click(button);
        
        expect(clickCallback.mock.calls.length).toBe(1);
        expect(closeCallback.mock.calls.length).toBe(0);
        
    });

});
