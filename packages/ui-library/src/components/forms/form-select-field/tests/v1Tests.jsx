window.__DEV__ = true;

jest.dontMock("../v1.jsx");

describe("FormSelectField", function () {

    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        FormSelectField = require("../v1.jsx"),
        HelpHint = require("../../../tooltips/HelpHint.jsx");

    it("renders the component with a data object", function () {

        var onChange = function () {};

        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField id="testId" label="test label"
                options={{ 1: "one", 2: "two" }}
                onChange={onChange} value={'2'} />
        );

        var label = TestUtils.findRenderedDOMNodeWithClass(component, "input-select");
        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
        var options = TestUtils.scryRenderedDOMNodesWithTag(component, "option");

        expect(ReactTestUtils.isDOMComponent(label)).toBeTruthy();

        expect(select.value).toBe("2");
        expect(select.name).toBe("testId");

        expect(options.length).toBe(2);
        expect(options[0].getAttribute("value")).toBe("1");
        expect(options[0].textContent).toBe("one");
        expect(options[1].getAttribute("value")).toBe("2");
        expect(options[1].textContent).toBe("two");
    });

    it("renders the component with a data array", function () {
        var onChange = function () {};

        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField id="testId" label="test label"
                options={[{ value: 1, label: "one" }, { value: 2, label: "two" }]}
                onChange={onChange} value={'2'} />
        );

        var options = TestUtils.scryRenderedDOMNodesWithTag(component, "option");

        expect(options.length).toBe(2);
        expect(options[0].getAttribute("value")).toBe("1");
        expect(options[0].textContent).toBe("one");
        expect(options[1].getAttribute("value")).toBe("2");
        expect(options[1].textContent).toBe("two");
    });

    it("fires the onChange callback when selection changes", function () {
        var onChange = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField label="test label" options={{ 1: "one", 2: "two" }} onChange={onChange} value={'2'} />
        );

        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
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

        var options = TestUtils.scryRenderedDOMNodesWithTag(component, "option");
        expect(options[0].textContent).toBe(noneOptionText);
        expect(options[0].getAttribute("value")).toBe(noneOptionValue);
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

        var options = TestUtils.scryRenderedDOMNodesWithTag(component, "option");
        expect(options[0].textContent).toBe(noneOptionText);
        expect(options[0].getAttribute("value")).toBe(noneOptionValue);
    });

    it("shows the error message when it is specified", function () {
        var onChange = function () {};
        var errorMessage = "help!";

        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField label="test label" options={{ 1: "one", 2: "two" }} onChange={onChange}
                errorMessage={errorMessage} value={'2'} />
        );

        var errorDiv = TestUtils.findRenderedDOMNodeWithDataId(component, "form-select-field_errormessage");
        expect(errorDiv.textContent).toBe(errorMessage);
    });

    it("renders component with additional CSS classes as specified in className prop", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField className="mySelect"
                    label="test label"
                    options={{ 1: "one", 2: "two" }}
                    value={'2'} />);

        var label = TestUtils.findRenderedDOMNodeWithClass(component, "mySelect");

        expect(label).toBeTruthy();
    });

    it("renders HelpHint when specified", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField label="test label" options={{ 1: "one", 2: "two" }} value={'2'} labelHelpText="helpMe" />);

        var help = TestUtils.findRenderedComponentWithType(component, HelpHint);

        expect(help).toBeTruthy();
    });

    it("does not trigger onChange callback if not given", function () {
        var onChange = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
                <FormSelectField label="test label" option={{ 1: "one", 2: "two" }} value={'2'} />);

        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");

        ReactTestUtils.Simulate.change(select, { target: { value: "1" } } );

        expect(onChange).not.toBeCalled();
    });

    it("is not disabled when not specified", function () {
        var onChange = function () {};
        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField label="test label" options={{ 1: "one", 2: "two" }} onChange={onChange}
                value={'2'} />
        );

        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
        expect(ReactTestUtils.isDOMComponent(select)).toBeTruthy();
        expect(select.disabled).toBeFalsy();
    });

    it("is disabled when it is specified", function () {
        var onChange = function () {};
        var component = ReactTestUtils.renderIntoDocument(
            <FormSelectField label="test label" options={{ 1: "one", 2: "two" }} onChange={onChange}
                isDisabled={true} value={'2'} />
        );

        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
        expect(ReactTestUtils.isDOMComponent(select)).toBeTruthy();
        expect(select.disabled).toBeTruthy();
    });
});
