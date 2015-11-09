window.__DEV__ = true;

jest.dontMock("../ExpandableRow.jsx");
jest.dontMock("../../../testutil/TestUtils");

describe("ExpandableRow", function () {
    var React = require("react/addons");
    var ReactTestUtils = React.addons.TestUtils;
    var TestUtils = require("../../../testutil/TestUtils");
    var ExpandableRow = require("../ExpandableRow.jsx");
    var titleText = "Test Title";
    var subtitleText = "Test Subtitle";
    var contentText = "Test Content";
    var contentChildrenText = "Test Children Content";
    var component, row, expandButton;
    var titleJsx = (<div>{titleText}</div>);
    var subtitleJsx = (<div>{subtitleText}</div>);
    var contentJsx = (<div data-id="content">{contentText}</div>);
    var contentChildrenJsx = (<div data-id="content-children">{contentChildrenText}</div>);

    beforeEach(function () {
        component = ReactTestUtils.renderIntoDocument(
            <ExpandableRow title={titleJsx} subtitle={subtitleJsx} content={contentJsx} />
        );
        row = TestUtils.findRenderedDOMComponentWithDataId(component, "expandable-row");
        expandButton = TestUtils.findRenderedDOMComponentWithDataId(component, "expand-btn");
    });

    it("renders the component", function () {
        expect(ReactTestUtils.isDOMComponent(row)).toBeTruthy();
    });

    it("renders the component as collapsed (by default)", function () {
        var expandedRow = TestUtils.findRenderedDOMComponentWithDataId(component, "expanded-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeFalsy();
    });

    it("renders the expand button", function () {
        expect(ReactTestUtils.isDOMComponent(expandButton)).toBeTruthy();
    });

    it("renders the edit button by default", function () {
        ReactTestUtils.Simulate.click(expandButton);
        var editButton = TestUtils.findRenderedDOMComponentWithDataId(component, "edit-btn");
        expect(editButton.getDOMNode().className).toEqual("edit-btn");
    });

    it("expands when clicking on the expand icon and collapses when clicked on again", function () {
        // expand
        ReactTestUtils.Simulate.click(expandButton);
        var expandedRow = TestUtils.findRenderedDOMComponentWithDataId(component, "expanded-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();
        var content = TestUtils.findRenderedDOMComponentWithDataId(component, "content");
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
        expect(content.props.children).toEqual(contentText);
        // collapse
        ReactTestUtils.Simulate.click(expandButton);
        expandedRow = TestUtils.findRenderedDOMComponentWithDataId(component, "expanded-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeFalsy();
    });

    it("renders the row as expanded if defaultToExpanded prop is set to true", function () {
        var expandedComponent = ReactTestUtils.renderIntoDocument(
            <ExpandableRow title={titleJsx} subtitle={subtitleJsx} content={contentJsx} defaultToExpanded={true} />
        );
        var expandedRow = TestUtils.findRenderedDOMComponentWithDataId(expandedComponent, "expandable-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();
    });

    it("renders the view icon when isEditEnabled prop is set to false", function () {
        var readOnlyComponent = ReactTestUtils.renderIntoDocument(
            <ExpandableRow title={titleJsx} subtitle={subtitleJsx} content={contentJsx} isEditEnabled={false} />
        );
        expandButton = TestUtils.findRenderedDOMComponentWithDataId(readOnlyComponent, "expand-btn");
        ReactTestUtils.Simulate.click(expandButton);
        var viewButton = TestUtils.findRenderedDOMComponentWithDataId(readOnlyComponent, "edit-btn");
        expect(viewButton.getDOMNode().className).toEqual("view-btn");
    });

    it("renders an empty disabled button when showEdit prop is set to false", function () {
        var readOnlyComponent = ReactTestUtils.renderIntoDocument(
            <ExpandableRow title={titleJsx} subtitle={subtitleJsx} content={contentJsx} showEdit={false} />
        );
        expandButton = TestUtils.findRenderedDOMComponentWithDataId(readOnlyComponent, "expand-btn");
        ReactTestUtils.Simulate.click(expandButton);
        var expandableRow = TestUtils.findRenderedDOMComponentWithDataId(readOnlyComponent, "expandable-row");
        expect(expandableRow.getDOMNode().className).toContain("no-edit");
    });

    it("renders the content when passed in as a children instead of a prop", function () {
        component = ReactTestUtils.renderIntoDocument(
            <ExpandableRow title={titleJsx} subtitle={subtitleJsx}>
                {contentChildrenJsx}
            </ExpandableRow>
        );
        expandButton = TestUtils.findRenderedDOMComponentWithDataId(component, "expand-btn");
        ReactTestUtils.Simulate.click(expandButton);
        var expandedRow = TestUtils.findRenderedDOMComponentWithDataId(component, "expanded-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();
        var content = TestUtils.findRenderedDOMComponentWithDataId(component, "content-children");
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
        expect(content.props.children).toEqual(contentChildrenText);
    });

});
