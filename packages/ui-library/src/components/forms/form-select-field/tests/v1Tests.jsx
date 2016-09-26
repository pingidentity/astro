
jest.dontMock("./common.jsx");
jest.dontMock("../index.js");
jest.dontMock("../v1.jsx");
jest.dontMock("../../FormLabel.jsx");
jest.dontMock("../../FormError.jsx");

describe("FormSelectField", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        FormSelectField = require("../v1.jsx"),
        CommonTests = require("./common.jsx"),
        _ = require("underscore");

    function getComponent (props) {
        props = _.defaults(props || {}, {
            options: { 1: "one", 2: "two" },
            value: "2",
            onChange: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<FormSelectField {...props} />);
    }

    CommonTests(getComponent);

    it("renders component with id", function () {
        var component = getComponent({
            id: "mySelect"
        });

        var select = TestUtils.findRenderedDOMNodeWithDataId(component, "mySelect_label");

        expect(select).toBeTruthy();
    });

    it("adds the none option when specified with a data array of objects", function () {
        var noneOptionText = "Select an option";
        var noneOptionValue = "0";

        var component = getComponent({
            options: [
                { value: 1, label: "one" },
                { value: 2, label: "two" }
            ],
            value: "0",
            noneOption: true,
            noneOptionText: noneOptionText,
            noneOptionValue: noneOptionValue
        });

        var options = TestUtils.scryRenderedDOMNodesWithTag(component, "option");
        expect(options[0].textContent).toBe(noneOptionText);
        expect(options[0].getAttribute("value")).toBe(noneOptionValue);
    });

    it("renders the component with a data object", function () {
        var component = getComponent();

        var label = TestUtils.findRenderedDOMNodeWithClass(component, "input-select");
        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
        var options = TestUtils.scryRenderedDOMNodesWithTag(component, "option");

        expect(ReactTestUtils.isDOMComponent(label)).toBeTruthy();

        expect(select.value).toBe("2");

        expect(options.length).toBe(2);
        expect(options[0].getAttribute("value")).toBe("1");
        expect(options[0].textContent).toBe("one");
        expect(options[1].getAttribute("value")).toBe("2");
        expect(options[1].textContent).toBe("two");
    });

    it("adds the none option when specified with a data object", function () {
        var noneOptionText = "Select an option";
        var noneOptionValue = "0";

        var component = getComponent({
            value: "0",
            noneOption: true,
            noneOptionText: noneOptionText,
            noneOptionValue: noneOptionValue
        });

        var options = TestUtils.scryRenderedDOMNodesWithTag(component, "option");
        expect(options[0].textContent).toBe(noneOptionText);
        expect(options[0].getAttribute("value")).toBe(noneOptionValue);
    });

    it("fires the onChange callback when selection changes", function () {
        var component = getComponent();

        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
        ReactTestUtils.Simulate.change(select, { target: { value: "1" } } );

        expect(component.props.onChange).toBeCalled();
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

    it("is disabled when it is specified", function () {
        var component = getComponent({
            isDisabled: true
        });

        var select = TestUtils.findRenderedDOMNodeWithTag(component, "select");
        expect(ReactTestUtils.isDOMComponent(select)).toBeTruthy();
        expect(select.disabled).toBeTruthy();
    });
});
