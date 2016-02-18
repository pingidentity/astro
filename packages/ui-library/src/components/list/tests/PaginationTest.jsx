window.__DEV__ = true;

jest.dontMock("../Pagination.jsx");
jest.dontMock("../../rows/ExpandableRow.jsx");
jest.dontMock("../../../testutil/TestUtils");

describe("Pagination", function () {

    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        //TestUtils = require("../../../testutil/TestUtils"),
        Pagination = require("../Pagination.jsx"),
        ExpandableRow = require("../../rows/ExpandableRow.jsx"),
        callback,
        component,
        pageLinks,
        top,
        topLinks;

    beforeEach(function () {
        callback = jest.genMockFunction();
        component = ReactTestUtils.renderIntoDocument(
            <Pagination
                perPage = {5}
                total = {100}
                onChange={callback}>
                <ExpandableRow className = "row" key = {1} />
                <ExpandableRow className = "row" key = {2} />
                <ExpandableRow className = "row" key = {3} />
                <ExpandableRow className = "row" key = {4} />
                <ExpandableRow className = "row" key = {5} />
            </Pagination>
        );

        pageLinks = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "page-links");
        top = pageLinks[0];
        topLinks = React.findDOMNode(top).childNodes;

    });

    it ("rendered with correct pages", function () {

        //expect 2 lists of page links
        expect(pageLinks.length).toBe(2);
        //expect 10 child dom nodes in page links, 2 for next and previous, 2 for first and last pages, one for ellipsis and 5 for pages
        expect(topLinks.length).toEqual(10);

        //expect the first child to be "<<"
        expect(topLinks[0].childNodes[0].className).toBe("icon-previous");

        //expect the highest page to be 20
        expect(topLinks[8].innerHTML).toBe("20");

    });

    it ("trigger basic change callback", function () {

        ReactTestUtils.Simulate.click(topLinks[1]);
        expect(callback.mock.calls.length).toBe(1);

    });

    it ("expect children are displayed", function () {

        var children = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "row");
        expect(children.length).toEqual(5);

    });



});
