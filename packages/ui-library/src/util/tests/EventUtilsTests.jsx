window.__DEV__ = true;

jest.dontMock("../EventUtils");

describe("ReduxUtils", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        Utils = require("../EventUtils");

    it("Forwards checked attribute", function () {
        var callback = jest.genMockFunction();
        var wrapper = Utils.forwardTargetChecked(callback);

        wrapper({ target: { checked: true } });
        expect(callback).toBeCalledWith(true);

        wrapper({ target: { checked: false } });
        expect(callback).toBeCalledWith(false);
    });

    it("Forwards target value", function () {
        var callback = jest.genMockFunction();
        var wrapper = Utils.forwardTargetValue(callback);

        wrapper({ target: { value: "blah" } });
        expect(callback).toBeCalledWith("blah");
    });

    it("Forwards target value as int", function () {
        var callback = jest.genMockFunction();
        var wrapper = Utils.forwardTargetValueAsInt(callback);

        wrapper({ target: { value: "105" } });
        expect(callback).toBeCalledWith(105);
    });

    it("Calls callback only if outside", function () {
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
                            <div ref="innerMost" onClick={this._handleClick} />
                        </div>
                    </div>);
            }
        }

        var callback = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(<MockComp onClick={callback} />);

        ReactTestUtils.Simulate.click(component.refs.innerMost);
        expect(callback).not.toBeCalled();
        callback.mockClear();
    });
});
