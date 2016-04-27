window.__DEV__ = true;

jest.dontMock("../Pagination.jsx");
jest.dontMock("../../rows/ExpandableRow.jsx");

describe("Pagination", function () {

    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
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
                page={2}
                perPage = {5}
                total = {100}
                onChange={callback}>
                <ExpandableRow className="row" key={1} />
                <ExpandableRow className="row" key={2} />
                <ExpandableRow className="row" key={3} />
                <ExpandableRow className="row" key={4} />
                <ExpandableRow className="row" key={5} />
            </Pagination>
        );

        pageLinks = TestUtils.scryRenderedDOMNodesWithClass(component, "page-links");
        top = pageLinks[0];
        topLinks = top.childNodes;

    });

    it ("renders short pages navigation", function () {

        component = ReactTestUtils.renderIntoDocument(
            <Pagination
                perPage = {5}
                total = {30}
                onChange={callback}>
                <ExpandableRow className="row" key={1} />
                <ExpandableRow className="row" key={2} />
                <ExpandableRow className="row" key={3} />
                <ExpandableRow className="row" key={4} />
                <ExpandableRow className="row" key={5} />
            </Pagination>
        );

        pageLinks = TestUtils.scryRenderedDOMNodesWithClass(component, "page-links");
        top = pageLinks[0];
        topLinks = top.childNodes;

        // expect 2 lists of page links
        expect(pageLinks.length).toBe(2);

        // expect 8 child dom nodes in page links, no ellipsis
        expect(topLinks.length).toEqual(8);

        // expect the first child to be "<<"
        expect(topLinks[0].childNodes[0].className).toBe("icon-previous");

        // expect the highest page to be 6
        expect(topLinks[6].textContent).toBe("6");

    });

    it ("renders expanded pages navigation", function () {

        // expect 2 lists of page links
        expect(pageLinks.length).toBe(2);
        // expect 10 child dom nodes in page links, 2 for next and previous, 2 for first and last pages, one for ellipsis and 5 for pages
        expect(topLinks.length).toEqual(10);

        // expect the first child to be "<<"
        expect(topLinks[0].childNodes[0].className).toBe("icon-previous");

        // expect the highest page to be 20
        expect(topLinks[8].textContent).toBe("20");

    });

    it ("renders no pages navigation", function () {

        component = ReactTestUtils.renderIntoDocument(
            <Pagination
                perPage = {5}
                total = {4}
                onChange={callback}>
                <ExpandableRow className="row" key={1} />
                <ExpandableRow className="row" key={2} />
                <ExpandableRow className="row" key={3} />
                <ExpandableRow className="row" key={4} />
                <ExpandableRow className="row" key={5} />
            </Pagination>
        );

        pageLinks = TestUtils.scryRenderedDOMNodesWithClass(component, "page-links");

        topLinks = pageLinks[0].childNodes;
        var bottomLinks = pageLinks[1].childNodes;

        // expect 2 lists of page links
        expect(pageLinks.length).toBe(2);

        // expect no child DOM nodes
        expect(topLinks.length).toEqual(0);
        expect(bottomLinks.length).toEqual(0);

    });

    it ("renders navigation using totalPages instead of total and perPage", function () {

        component = ReactTestUtils.renderIntoDocument(
            <Pagination
                totalPages={3}
                perPage={3}
                onChange={callback}>
                <ExpandableRow className="row" key={1} />
                <ExpandableRow className="row" key={2} />
                <ExpandableRow className="row" key={3} />
            </Pagination>
        );

        pageLinks = TestUtils.scryRenderedDOMNodesWithClass(component, "page-links");
        topLinks = pageLinks[0].childNodes;

        // expect 2 lists of page links
        expect(pageLinks.length).toBe(2);

        // expect the first child to be "<<"
        expect(topLinks[0].childNodes[0].className).toBe("icon-previous");

        // expect numeric links to be the correct number
        expect(topLinks[1].textContent).toBe("1");
        expect(topLinks[2].textContent).toBe("2");
        expect(topLinks[3].textContent).toBe("3");

        // expect the last child to be ">>"
        expect(topLinks[4].childNodes[0].className).toBe("icon-next");

    });

    it ("trigger page change callback", function () {
        ReactTestUtils.Simulate.click(topLinks[1]);
        expect(callback).toBeCalledWith(0, 5, 1);

    });

    it ("is not triggering callback for same page", function () {
        ReactTestUtils.Simulate.click(topLinks[0]);
        expect(callback).not.toBeCalled();

    });

    it ("renders children content", function () {
        var children = TestUtils.scryRenderedDOMNodesWithClass(component, "row");
        expect(children.length).toEqual(5);

    });


});
