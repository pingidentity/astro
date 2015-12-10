window.__DEV__ = true;

jest.dontMock("../FormSelectField.jsx");
jest.dontMock("classnames");
jest.dontMock("underscore");
jest.dontMock("../../../testutil/TestUtils");

describe("FormSelectField", function () {

    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        FormSelectField = require("../FormSelectField.jsx");

    it("renders the component with a data object", function () {

        var onChange = function () {};

        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField id="testId" label="test label"
                options={{ 1: "one", 2: "two" }}
                onChange={onChange} value={'2'} />
        );

        var label = ReactTestUtils.findRenderedDOMComponentWithClass(component, "input-select");
        var select = ReactTestUtils.findRenderedDOMComponentWithTag(component, "select");
        var options = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, "option");

        expect(ReactTestUtils.isDOMComponent(label)).toBeTruthy();

        expect(select.getDOMNode().value).toBe("2");
        expect(select.getDOMNode().name).toBe("testId");

        expect(options.length).toBe(2);
        expect(options[0].getDOMNode().getAttribute("value")).toBe("1");
        expect(options[0].getDOMNode().textContent).toBe("one");
        expect(options[1].getDOMNode().getAttribute("value")).toBe("2");
        expect(options[1].getDOMNode().textContent).toBe("two");
    });

    it("renders the component with a data array", function () {
        var onChange = function () {};

        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField id="testId" label="test label"
                options={[{ value: 1, label: "one" }, { value: 2, label: "two" }]}
                onChange={onChange} value={'2'} />
        );

        var options = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, "option");

        expect(options.length).toBe(2);
        expect(options[0].getDOMNode().getAttribute("value")).toBe("1");
        expect(options[0].getDOMNode().textContent).toBe("one");
        expect(options[1].getDOMNode().getAttribute("value")).toBe("2");
        expect(options[1].getDOMNode().textContent).toBe("two");
    });

    it("fires the onChange callback when selection changes", function () {
        var onChange = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField label="test label" options={{ 1: "one", 2: "two" }} onChange={onChange} value={'2'} />
        );

        var select = ReactTestUtils.findRenderedDOMComponentWithTag(component, "select");
        ReactTestUtils.Simulate.change(select, { target: { value: "1" } } );

        expect(onChange.mock.calls.length).toBe(1);
    });

    it("should update state when property value changes", function () {
        var onChange = jest.genMockFunction();

        var TestParent = React.createFactory(React.createClass({
            getInitialState: function () {
                return { testState: "2" };
            },

            render: function () {
                return (<FormSelectField ref="fsf" label="test label"
                          options={{ 1: "one", 2: "two" }}
                          onChange={onChange}
                          value={this.state.testState} />);
            }
        }));

        var parent = ReactTestUtils.renderIntoDocument(TestParent());

        expect(parent.refs.fsf.props.value).toBe("2");
        expect(parent.refs.fsf.state.selectedValue).toBe("2");

        parent.setState({
            testState: "1"
        });

        expect(parent.refs.fsf.props.value).toBe("1");
        expect(parent.refs.fsf.state.selectedValue).toBe("1");
    });

    it("adds the none option when specified with a data object", function () {
        var onChange = function () {};
        var noneOptionText = "Select an option";
        var noneOptionValue = "0";

        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField
                label="test label"
                options={{
                    1: "one",
                    2: "two"
                }}
                onChange={onChange}
                noneOption={true}
                noneOptionText={noneOptionText}
                noneOptionValue={noneOptionValue}
                value={'0'}
            />
        );

        var options = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, "option");
        expect(options[0].getDOMNode().textContent).toBe(noneOptionText);
        expect(options[0].getDOMNode().getAttribute("value")).toBe(noneOptionValue);
    });

    it("adds the none option when specified with a data array of objects", function () {
        var onChange = function () {};
        var noneOptionText = "Select an option";
        var noneOptionValue = "0";

        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField
                label="test label"
                options={[
                    { value: 1, label: "one" },
                    { value: 2, label: "two" }
                ]}
                onChange={onChange}
                noneOption={true}
                noneOptionText={noneOptionText}
                noneOptionValue={noneOptionValue}
                value={'0'}
            />
        );

        var options = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, "option");
        expect(options[0].getDOMNode().textContent).toBe(noneOptionText);
        expect(options[0].getDOMNode().getAttribute("value")).toBe(noneOptionValue);
    });

    it("shows the error message when it is specified", function () {
        var onChange = function () {};
        var errorMessage = "help!";

        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField label="test label" options={{ 1: "one", 2: "two" }} onChange={onChange}
                errorMessage={errorMessage} value={'2'} />
        );

        var errorDiv = ReactTestUtils.findRenderedDOMComponentWithClass(component, "tooltip-text");
        expect(errorDiv.getDOMNode().textContent).toBe(errorMessage);
    });

    it("is not disabled when not specified", function () {
        var onChange = function () {};
        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField label="test label" options={{ 1: "one", 2: "two" }} onChange={onChange}
                value={'2'} />
        );

        var select = ReactTestUtils.findRenderedDOMComponentWithTag(component, "select");
        expect(ReactTestUtils.isDOMComponent(select)).toBeTruthy();
        expect(select.props.disabled).toBeFalsy();
    });

    it("is disabled when it is specified", function () {
        var onChange = function () {};
        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField label="test label" options={{ 1: "one", 2: "two" }} onChange={onChange}
                isDisabled={true} value={'2'} />
        );

        var select = ReactTestUtils.findRenderedDOMComponentWithTag(component, "select");
        expect(ReactTestUtils.isDOMComponent(select)).toBeTruthy();
        expect(select.props.disabled).toBeTruthy();
    });
});
