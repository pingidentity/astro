import React from "react";
import { mount } from "enzyme";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import StateContainer, { toggleTransform, inStateContainer } from "../StateContainer";

const TestComponent = ({ value, onValueChange, turnedOn, onClick }) => {
    const onChange = e => onValueChange(e.target.value);

    return (
        <div>
            <a data-id="link" onClick={onClick}>Click</a>
            {turnedOn && <p data-id="turned-on">it's me</p>}
            <input data-id="input" type="text" value={value} onChange={onChange}/>
            <span data-id="content">{value}</span>
        </div>
    );
};

const HOCComponent = inStateContainer([
    {
        name: "value",
        initial: "just default",
    },
])(TestComponent);

describe("StateContainer", function () {

    function getComponent (props, initialState = {}) {
        return ReactTestUtils.renderIntoDocument(
            <StateContainer
                stateDefs={[
                    {
                        name: "value",
                        initial: "well hello",
                        setter: "onValueChange"
                    },
                    {
                        name: "turnedOn",
                        initial: false,
                        callbacks: [
                            {
                                name: "onClick",
                                transform: toggleTransform,
                            }
                        ]
                    }
                ]}
                initialState={initialState}
                passedProps={props}
            >
                {containerProps => <TestComponent {...containerProps} />}
            </StateContainer>
        );
    }

    it("renders with default value", function () {
        const component = getComponent({});
        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "content");

        expect(element.textContent).toBe("well hello");
    });

    it("renders with prop value", function () {
        const component = getComponent({ value: "so long" });
        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "content");

        expect(element.textContent).toBe("so long");
    });

    it("turns on message", function() {
        const component = getComponent({});
        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "link");

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "turned-on")).not.toBeTruthy();
        ReactTestUtils.Simulate.click(element);
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "turned-on")).toBeTruthy();
    });

    it("doesn't turn on message because it's stateless", function() {
        const component = getComponent({ turnedOn: false });
        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "link");

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "turned-on")).not.toBeTruthy();
        ReactTestUtils.Simulate.click(element);
        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "turned-on")).not.toBeTruthy();
    });

    it("changes value when stateful", function() {
        const component = getComponent({});
        const input = TestUtils.findRenderedDOMNodeWithDataId(component, "input");
        const content = TestUtils.findRenderedDOMNodeWithDataId(component, "content");

        expect(content.textContent).toBe("well hello");
        ReactTestUtils.Simulate.change(input, { target: { value: "abc" } });
        expect(content.textContent).toBe("abc");
    });

    it("fires setter callback even when stateful", function() {
        const callback = jest.fn();
        const onValueChange = value => callback(value); // eliminates e from the function call

        const component = getComponent({ onValueChange });
        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "input");

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.change(element, { target: { value: "abc" } });
        expect(callback).toBeCalledWith("abc");
    });

    it("fires custom callback", function() {
        const onClick = jest.fn();

        const component = getComponent({ onClick });
        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "link");

        expect(onClick).not.toBeCalled();
        ReactTestUtils.Simulate.click(element);
        expect(onClick).toBeCalled();
    });

    it("renders an HOC-based component with default value", function() {
        const component = ReactTestUtils.renderIntoDocument(<div><HOCComponent /></div>);
        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "content");

        expect(element.textContent).toBe("just default");
    });

    it("throws warning when you try to set a controlled prop", function() {
        console.warn = jest.fn();
        const Wrapper = TestUtils.UpdatePropsWrapper;
        const component = ReactTestUtils.renderIntoDocument(<Wrapper type={HOCComponent} />);

        expect(console.warn).not.toBeCalled();
        component._setProps({ value: "don't touch this" });
        expect(console.warn).toBeCalled();
    });

    it("throws warning when you try to set initial state for an uncontrolled prop", function() {
        console.warn = jest.fn();

        expect(console.warn).not.toBeCalled();
        getComponent({}, { nothing: "much" });
        expect(console.warn).toBeCalled();
    });

    it("Passes back transformed value if passedTransformedValue is true", () => {
        const onClick = jest.fn();
        const Component = props => <StateContainer
            stateDefs={[
                {
                    name: "turnedOn",
                    initial: false,
                    callbacks: [
                        {
                            name: "onClick",
                            passTransformedValue: true,
                            transform: () => "test val",
                        }
                    ]
                }
            ]}
            passedProps={props}
        >
            {passed => <TestComponent {...passed} />}
        </StateContainer>;

        const instance = mount(<Component onClick={onClick} />);

        instance.find("a").simulate("click");
        expect(onClick).toHaveBeenCalledWith("test val", undefined);
    });

    it("fires a warning when stateless is set to false and a prop is defined", () => {
        console.warn = jest.fn();
        const Component = props => <StateContainer
            stateDefs={[
                {
                    name: "aThing",
                }
            ]}
            passedProps={props}
        >
            {passed => <TestComponent {...passed} />}
        </StateContainer>;

        mount(<Component aThing="this thing" stateless={false} />);
        expect(console.warn).toBeCalled();
    });
});