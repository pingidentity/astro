window.__DEV__ = true;

import { mount } from "enzyme";
import StateContainer from "../../utils/StateContainer";
import Pagination from "../Pagination";

jest.dontMock("../Pagination");
jest.dontMock("../../rows/expandable-row/ExpandableRow");

describe("Pagination", function () {

    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ExpandableRow = require("../../rows/expandable-row/ExpandableRow"),
        callback,
        component,
        pageLinks,
        top,
        topLinks;

    beforeEach(function () {
        callback = jest.fn();

        component = TestUtils.renderInWrapper(
            <Pagination
                data-id="test-pagination"
                initialState={{
                    page: 0
                }}
                perPage = {5}
                total = {100}
                onValueChange={callback}>
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

        component = TestUtils.renderInWrapper(
            <Pagination
                perPage = {5}
                total = {30}
                onValueChange={callback}>
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

        component = TestUtils.renderInWrapper(
            <Pagination
                perPage = {5}
                total = {4}
                onValueChange={callback}>
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

        component = TestUtils.renderInWrapper(
            <Pagination
                totalPages={3}
                perPage={3}
                onValueChange={callback}>
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

    it ("renders navigation using using renderProps(renderPageLinks)", function () {

        component = TestUtils.renderInWrapper(
            <Pagination
                totalPages={3}
                perPage={3}
                onValueChange={callback}>
                renderPageLinks={(props, PageLinks)=> (
                    <div>
                        <PageLinks
                            currentPage={props.currentPage}
                            numPages={props.numPages}
                            onValueChange={props.onValueChange}
                            data-id="topPageLinks"
                        />
                        <ExpandableRow className="row" key={1} />
                        <ExpandableRow className="row" key={2} />
                        <ExpandableRow className="row" key={3} />
                    </div>
                )}
            </Pagination>
        );

        pageLinks = TestUtils.scryRenderedDOMNodesWithClass(component, "page-links");
        topLinks = pageLinks[0].childNodes;

        expect(topLinks[4].childNodes[0].className).toBe("icon-next");
    });

    it ("trigger page change callback", function () {
        ReactTestUtils.Simulate.click(topLinks[1]);
        expect(callback).toBeCalled();
        expect(callback.mock.calls[0][0]).toEqual({ first: 0, last: 5, page: 1 });
    });

    it ("is not triggering callback for same page", function () {
        ReactTestUtils.Simulate.click(topLinks[0]);
        expect(callback).not.toBeCalled();
    });

    it ("renders children content", function () {
        var children = TestUtils.scryRenderedDOMNodesWithClass(component, "row");
        expect(children.length).toEqual(5);
    });

    it ("verify default data-id", function () {
        var paging = TestUtils.renderInWrapper(
            <Pagination
                totalPages={3}
                perPage={3}
                onValueChange={callback}>
                <ExpandableRow className="row" key={1} />
            </Pagination>
        );
        var test = TestUtils.findRenderedDOMNodeWithDataId(paging, "pagination");
        expect(test).toBeTruthy();
    });

    it ("verify large number of pages", function () {
        component = TestUtils.renderInWrapper(
            <Pagination
                stateless={true}
                data-id="test-pagination"
                page={6}
                perPage = {5}
                total = {100}
                onValueChange={callback}>
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

        ReactTestUtils.Simulate.click(topLinks[9]);
        expect(callback).toBeCalledWith({ first: 95, last: 100, page: 20 });
    });

    it ("verify no pages", function () {
        component = TestUtils.renderInWrapper(
            <Pagination
                stateless={true}
                data-id="test-pagination"
                page={1}
                perPage = {5}
                total = {1}
                onValueChange={callback}>
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
        expect(topLinks.length).toEqual(0);
    });

    // Progressively stateful tests
    it("renders a component", () => {
        const pagination = mount(
            <Pagination
                totalPages={1}
            />
        );

        expect(pagination.find(StateContainer).exists()).toBeTruthy();
    });

    it("updates page", () => {
        const pagination = mount(
            <Pagination
                totalPages={10}
            />
        );

        expect(pagination.find("[data-id=\"bottomPageLinksfirst\"]").hasClass("active")).toBeTruthy();

        pagination.find("[data-id=\"bottomPageLinks2\"]").simulate("click");

        expect(pagination.find("[data-id=\"bottomPageLinksfirst\"]").hasClass("active")).toBeFalsy();
        expect(pagination.find("[data-id=\"bottomPageLinks2\"]").hasClass("active")).toBeTruthy();
    });

});
