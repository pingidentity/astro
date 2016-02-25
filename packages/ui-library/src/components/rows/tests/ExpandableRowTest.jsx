window.__DEV__ = true;

jest.dontMock("../ExpandableRow.jsx");

describe("ExpandableRow", function () {
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
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
        row = TestUtils.findRenderedDOMNodeWithDataId(component, "expandable-row");
        expandButton = TestUtils.findRenderedDOMNodeWithDataId(component, "expand-btn");
    });

    it("renders the component", function () {
        expect(ReactTestUtils.isDOMComponent(row)).toBeTruthy();
    });

    it("renders the component as collapsed (by default)", function () {
        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeFalsy();
    });

    it("renders stateless component as collapsed (by default)", function () {
        component = ReactTestUtils.renderIntoDocument(
            <ExpandableRow title={titleJsx} subtitle={subtitleJsx} content={contentJsx} contolled={true} />
        );
        row = TestUtils.findRenderedDOMNodeWithDataId(component, "expandable-row");
        expandButton = TestUtils.findRenderedDOMNodeWithDataId(component, "expand-btn");


        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeFalsy();
    });

    it("renders the expand button", function () {
        expect(ReactTestUtils.isDOMComponent(expandButton)).toBeTruthy();
    });

    it("renders the edit button by default", function () {
        ReactTestUtils.Simulate.click(expandButton);
        var editButton = TestUtils.findRenderedDOMNodeWithDataId(component, "edit-btn");
        expect(editButton.className).toEqual("edit-btn");
    });

    it("renders the delete button by default", function () {
        ReactTestUtils.Simulate.click(expandButton);
        var deleteButton = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn");
        expect(deleteButton.className).toEqual("delete-btn");
    });

    it("renders row without delete button when showDelete prop is set to false", function () {
        var expandedComponent = ReactTestUtils.renderIntoDocument(
            <ExpandableRow
                title={titleJsx}
                subtitle={subtitleJsx}
                content={contentJsx}
                defaultToExpanded={true}
                showDelete={false}
            />
        );

        // check css on row
        var expandableRow = TestUtils.findRenderedDOMNodeWithDataId(expandedComponent, "expandable-row");
        expect(expandableRow.className).toContain("no-delete");

        // make sure delete button not rendered
        var deleteButton = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn");
        expect(ReactTestUtils.isDOMComponent(deleteButton)).toBeFalsy();
    });

    it("renders the specified delete button", function () {
        var deleteButton = (<div data-id="my-delete-button">Delete Me</div>);
        var expandedComponent = ReactTestUtils.renderIntoDocument(
            <ExpandableRow
                title={titleJsx}
                subtitle={subtitleJsx}
                content={contentJsx}
                defaultToExpanded={true}
                deleteButton={deleteButton}
            />
        );

        var defaultDeleteButton = TestUtils.findRenderedDOMNodeWithDataId(expandedComponent, "delete-btn");
        expect(ReactTestUtils.isDOMComponent(defaultDeleteButton)).toBeFalsy();
        var customDeleteButton = TestUtils.findRenderedDOMNodeWithDataId(expandedComponent, "my-delete-button");
        expect(customDeleteButton.textContent).toEqual("Delete Me");
    });

    it("expands when clicking on the expand icon and collapses when clicked on again", function () {
        // expand
        ReactTestUtils.Simulate.click(expandButton);
        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();
        var content = TestUtils.findRenderedDOMNodeWithDataId(component, "content");
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
        expect(content.textContent).toEqual(contentText);
        // collapse
        ReactTestUtils.Simulate.click(expandButton);
        expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeFalsy();
    });

    it("renders the row as expanded if defaultToExpanded prop is set to true", function () {
        var expandedComponent = ReactTestUtils.renderIntoDocument(
            <ExpandableRow title={titleJsx} subtitle={subtitleJsx} content={contentJsx} defaultToExpanded={true} />
        );
        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(expandedComponent, "expandable-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();
    });

    it("renders expanded row", function () {
        var expandedComponent = ReactTestUtils.renderIntoDocument(
            <ExpandableRow title={titleJsx} subtitle={subtitleJsx} content={contentJsx} expanded={true}
                           controlled={true}/>
        );
        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(expandedComponent, "expandable-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();
    });

    it("calls onToggle callback", function () {

        var onToggle = jest.genMockFunction();

        component = ReactTestUtils.renderIntoDocument(
            <ExpandableRow title={titleJsx} subtitle={subtitleJsx} content={contentJsx}
                           controlled={true} onToggle={onToggle} />
        );
        row = TestUtils.findRenderedDOMNodeWithDataId(component, "expandable-row");
        expandButton = TestUtils.findRenderedDOMNodeWithDataId(component, "expand-btn");

        // expand
        ReactTestUtils.Simulate.click(expandButton);

        expect(onToggle).toBeCalledWith(false);
    });


    it("renders the view icon when isEditEnabled prop is set to false", function () {
        var readOnlyComponent = ReactTestUtils.renderIntoDocument(
            <ExpandableRow title={titleJsx} subtitle={subtitleJsx} content={contentJsx} isEditEnabled={false} />
        );
        expandButton = TestUtils.findRenderedDOMNodeWithDataId(readOnlyComponent, "expand-btn");
        ReactTestUtils.Simulate.click(expandButton);
        var viewButton = TestUtils.findRenderedDOMNodeWithDataId(readOnlyComponent, "edit-btn");
        expect(viewButton.className).toEqual("view-btn");
    });

    it("renders an empty disabled button when showEdit prop is set to false", function () {
        var readOnlyComponent = ReactTestUtils.renderIntoDocument(
            <ExpandableRow title={titleJsx} subtitle={subtitleJsx} content={contentJsx} showEdit={false} />
        );
        expandButton = TestUtils.findRenderedDOMNodeWithDataId(readOnlyComponent, "expand-btn");
        ReactTestUtils.Simulate.click(expandButton);
        var expandableRow = TestUtils.findRenderedDOMNodeWithDataId(readOnlyComponent, "expandable-row");
        expect(expandableRow.className).toContain("no-edit");
    });

    it("renders the content when passed in as a children instead of a prop", function () {
        component = ReactTestUtils.renderIntoDocument(
            <ExpandableRow title={titleJsx} subtitle={subtitleJsx}>
                {contentChildrenJsx}
            </ExpandableRow>
        );
        expandButton = TestUtils.findRenderedDOMNodeWithDataId(component, "expand-btn");
        ReactTestUtils.Simulate.click(expandButton);
        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();
        var content = TestUtils.findRenderedDOMNodeWithDataId(component, "content-children");
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
        expect(content.textContent).toEqual(contentChildrenText);
    });

    it("renders the right-side/row-accessories content", function () {
        var linkText = "Control Link",
            rowAccessoriesLink = (
                <a className="control-link">{linkText}</a>
            ),
            rowAccessories,
            rowAccessoriesContent;

        component = ReactTestUtils.renderIntoDocument(
            <ExpandableRow
                title={titleJsx}
                subtitle={subtitleJsx}
                rowAccessories={rowAccessoriesLink} />
        );

        rowAccessories = ReactTestUtils.findRenderedDOMComponentWithClass(component, "row-accessories");
        expect(rowAccessories).toBeTruthy();

        rowAccessoriesContent = ReactTestUtils.findRenderedDOMComponentWithClass(component, "control-link");
        expect(rowAccessoriesContent).toBeTruthy();

        expect(rowAccessoriesContent.textContent).toEqual(linkText);
    });

});
