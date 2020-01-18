window.__DEV__ = true;

jest.dontMock("../EventUtils");

describe("EventUtils", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        Utils = require("../EventUtils");

    // This component mocks a body, modal and portal to test the click event
    class MockComponent extends React.Component {
        constructor(props) {
            super(props);
            this.component = React.createRef();
            this.outsideModal = React.createRef();
            this.modal = React.createRef();
            this.insideModal = React.createRef();
            this.portal = React.createRef();
            this.insidePortal = React.createRef();
        }
        //Mock globals to see if we clicked outside of modal
        mockGlobalClick = e => {
            Utils.callIfOutsideOfContainer(this.modal.current, this.props.callback, e);
            e.stopPropagation();
        };
        render() {
            return (
                <div ref={this.component}>
                    <div ref={this.outsideModal} onClick={this.mockGlobalClick}>
                        <div ref={this.modal} onClick={this.mockGlobalClick}>
                            <div ref={this.insideModal} onClick={this.mockGlobalClick} data-id="portal-trigger" />
                        </div>
                    </div>
                    <div ref={this.portal} data-parent="portal-trigger">
                        <div ref={this.insidePortal} onClick={this.mockGlobalClick}/>
                    </div>
                </div>
            );
        }
    }
    // neither test utils or enzyme acutally attach to document so use this to test because call if outside of container expects element to be in document.body
    const attachComponentToDocument = Component => {
        const div = document.createElement("div");
        document.body.appendChild(div);

        return ReactDOM.render(Component, div);
    };


    beforeEach(function() {
        global.getSelection = jest.fn();
        global.getSelection.mockReturnValue({
            toString: () => "",
        });
    });

    it("Forwards checked attribute", function () {
        var callback = jest.fn();
        var wrapper = Utils.forwardTargetChecked(callback);

        wrapper({ target: { checked: true } });
        expect(callback).toBeCalledWith(true);

        wrapper({ target: { checked: false } });
        expect(callback).toBeCalledWith(false);
    });

    it("Forwards target value", function () {
        var callback = jest.fn();
        var wrapper = Utils.forwardTargetValue(callback);

        wrapper({ target: { value: "blah" } });
        expect(callback).toBeCalledWith("blah");
    });

    it("Forwards target value as int", function () {
        var callback = jest.fn();
        var wrapper = Utils.forwardTargetValueAsInt(callback);

        wrapper({ target: { value: "105" } });
        expect(callback).toBeCalledWith(105);
    });

    it("Calls callback if outside", function () {
        const clickedOutside = jest.fn();

        const component = attachComponentToDocument(<MockComponent callback={clickedOutside} />);
        ReactTestUtils.Simulate.click(component.outsideModal.current);

        expect(clickedOutside).toBeCalled();
    });

    it("Doesn't call callback if inside", function () {
        const cco = jest.fn();

        const component = attachComponentToDocument(<MockComponent callback={cco} />);

        ReactTestUtils.Simulate.click(component.insideModal.current);

        expect(cco).not.toBeCalled();
    });

    it("Doesn't call callback if data-parent is present on element", function () {
        const clickedOutside = jest.fn();

        const component = attachComponentToDocument(<MockComponent callback={clickedOutside} />);

        ReactTestUtils.Simulate.click(component.insidePortal.current);

        expect(clickedOutside).not.toBeCalled();
    });

    it("does not call call back when text selected", function () {

        global.getSelection = jest.fn();
        global.getSelection.mockReturnValue({
            toString: () => "text",
        });
        class MockComp extends React.Component {
            _handleClick = (e) => {
                Utils.callIfOutsideOfContainer(
                    ReactDOM.findDOMNode(this.refs.inner),
                    this.props.onClick, e);
            };

            render() {
                return (
                    <div ref="outer" onClick={this._handleClick}>
                        <div ref="inner" onClick={this._handleClick}>
                            <div ref="innerMost" onClick={this._handleClick}>
                            </div>
                        </div>
                    </div>);
            }
        }

        var callback = jest.fn();
        var component = ReactTestUtils.renderIntoDocument(<MockComp onClick={callback} />);

        ReactTestUtils.Simulate.click(component.refs.outer);
        expect(callback).not.toBeCalled();
        callback.mockClear();
    });

    it("prevents default on specified keys and not on others", function() {

        const map = { 13: () => true };

        const event = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            keyCode: 12
        };

        const event2 = {
            preventDefault: jest.fn(),
            stopPropagation: jest.fn(),
            keyCode: 13
        };

        expect(event.preventDefault).not.toBeCalled();
        Utils.handleKeydowns(map, true)(event);
        expect(event.preventDefault).not.toBeCalled();

        expect(event2.preventDefault).not.toBeCalled();
        Utils.handleKeydowns(map, true)(event2);
        expect(event2.preventDefault).toBeCalled();
    });
});
